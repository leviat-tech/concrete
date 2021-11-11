<template>
  <div class="concrete-viewport">
    <svg
      ref="svg"
      class="concrete-drawing"
      :viewBox="vbString"
      @mousewheel="handleMousewheel"
      @wheel="handleMousewheel"
      @pointerdown="handleMousedown"
      @pointermove="handleMousemove"
      @pointerup="handleMouseup"
    >
      <g
        ref="contents"
        class="drawing-contents"
        :transform="`translate(${dragOffset.x} ${dragOffset.y})
                     scale(${viewport.zoomScale} -${viewport.zoomScale})`"
      >
        <slot />
      </g>
    </svg>
    <div class="concrete-toolbar">
      <slot name="toolbar" />
    </div>
    <div class="concrete-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import isEmpty from 'lodash/isEmpty';


function domToSVGCoords(el, pt) {
  const { x, y } = pt.matrixTransform(el.getScreenCTM().inverse());
  return { x, y };
}

export default {
  name: 'CSvg2dViewport',
  props: {
    name: { type: String, required: true },
    extents: {
      type: Object,
      default: () => ({
        xmin: -10, ymin: -10, xmax: 10, ymax: 10,
      }),
    },
    currentTool: { type: String, default: 'select' },
    value: { type: Object, default: () => ({ x: 0, y: 0 }) },
  },
  data() {
    return {
      hoverPt: null,
      svgP: { x: 0, y: 0 },
      dragFrom: null,
      dragOffset: { x: 0, y: 0 },
      isPanning: false,
      isZooming: false,
      zoomProps: null,
      screenPt: { x: 0, y: 0 },
      viewport: {
        zoomScale: 1,
        viewBox: {
          minX: 0, minY: 0, width: 1, height: 1,
        },
        el: {
          width: 1, height: 1,
        },
        pxToSvg: 1,
      },
      currentPoint: this.value,
      hasZoomed: false,
      tempTool: null,
      resizeObserver: null,
    };
  },
  provide() {
    return {
      viewport: this.viewport,
    };
  },
  computed: {
    vbString() {
      const { minX, minY, width, height } = this.viewport.viewBox; // eslint-disable-line
      return `${minX} ${minY} ${width} ${height}`;
    },

    // A factor which, when multiplied to a dimension in screen px, will yield the size in SVG units
    pxToSvgUnits() {
      const viewAspectRatio = this.viewport.viewBox.width / this.viewport.viewBox.height;
      const elAspectRatio = this.viewport.el.width / this.viewport.el.height;

      return viewAspectRatio > elAspectRatio
        ? (this.viewport.viewBox.width / this.viewport.el.width) / this.viewport.zoomScale
        : (this.viewport.viewBox.height / this.viewport.el.height) / this.viewport.zoomScale;
    },
  },
  watch: {
    extents: {
      immediate: true,
      handler(extents) {
        if (!this.hasZoomed && extents) {
          this.zoomToExtents();
          this.hasZoomed = true;
        }
      },
    },
    pxToSvgUnits: {
      handler() {
        this.viewport.pxToSvg = this.pxToSvgUnits;
      },
    },
  },
  async mounted() {
    await this.$nextTick();
    // Disable right-click context menu
    this.$refs.svg.addEventListener('contextmenu', (e) => e.preventDefault());
    this.hoverPt = this.$refs.svg.createSVGPoint();
    document.addEventListener('pointerleave', this.documentMouseleave);
    // monitor svg screen size
    this.resizeHandler();
    this.resizeObserver = new ResizeObserver(async (entries) => {
      const svg = entries[0].target;
      console.log('width', svg.clientWidth);
      console.log('heigiht', svg.clientHeight);
    }).observe(this.$refs.svg);
  },
  destroyed() {
    document.removeEventListener('pointerleave', this.documentMouseleave);
  },
  methods: {
    isEmpty,
    zoomToExtents() {
      this.zoomTo(this.extents);
    },
    zoomTo({ xmin, ymin, xmax, ymax }) { // eslint-disable-line
      const size = {
        width: xmax - xmin,
        height: ymax - ymin,
      };

      const contentAspectRatio = size.width / size.height;
      const viewAspectRatio = this.viewport.viewBox.width / this.viewport.viewBox.height;

      const zoomScale = contentAspectRatio > viewAspectRatio
        ? this.viewport.viewBox.width / size.width
        : this.viewport.viewBox.height / size.height;

      const center = {
        x: (xmin + (xmax - xmin) / 2) * zoomScale,
        y: -(ymin + (ymax - ymin) / 2) * zoomScale,
      };

      const viewBox = {
        minX: center.x - this.viewport.viewBox.width / 2,
        minY: center.y - this.viewport.viewBox.height / 2,
        width: this.viewport.viewBox.width,
        height: this.viewport.viewBox.height,
      };

      this.viewport.viewBox = viewBox;
      this.viewport.zoomScale = zoomScale;
    },
    setMousePt(e) {
      this.hoverPt.x = e.clientX; // current point in screen units
      this.hoverPt.y = e.clientY;
      const rect = this.$refs.svg.getBoundingClientRect();
      this.screenPt = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      this.svgP = domToSVGCoords(this.$refs.svg, this.hoverPt); // point in svg units
      this.currentPoint = domToSVGCoords(this.$refs.contents, this.hoverPt); // point in flipped y
      this.$emit('input', this.currentPoint);
    },
    handleMousedown(e) {
      this.$emit('mousedown', e);
      this.setMousePt(e);
      (e.target || this.$refs.svg).setPointerCapture(e.pointerId);
      if (e.which === 3 || this.currentTool === 'pan') {
        this.panstart();
      } else if (this.currentTool === 'zoom') {
        this.zoomstart();
      }
    },
    handleMousemove(e) {
      this.$emit('mousemove', e);
      this.setMousePt(e);
      if (this.isPanning) {
        this.pan();
      } else if (this.isZooming) {
        this.zoom();
      }
    },
    handleMouseup(e) {
      this.$emit('mouseup', e);
      this.setMousePt(e);
      this.$refs.svg.releasePointerCapture(e.pointerId);
      if (this.isPanning) {
        this.panend();
      } else if (this.isZooming) {
        this.zoomend();
      }
    },
    documentMouseleave() {
      if (this.isPanning) this.panend();
      if (this.isZooming) this.zoomend();
    },


    panstart() {
      this.isPanning = true;
      this.tempTool = this.currentTool;
      this.$emit('change-tool', 'pan');
      const { x, y } = this.svgP;
      this.dragFrom = { x, y };
    },
    pan() {
      const { x, y } = this.svgP;
      this.dragOffset = {
        x: x - this.dragFrom.x,
        y: y - this.dragFrom.y,
      };
    },
    panend() {
      const { x, y } = this.svgP;
      this.dragOffset = {
        x: x - this.dragFrom.x,
        y: y - this.dragFrom.y,
      };
      this.viewport.viewBox.minX -= this.dragOffset.x;
      this.viewport.viewBox.minY -= this.dragOffset.y;
      this.dragOffset = { x: 0, y: 0 };
      this.isPanning = false;
      this.$emit('change-tool', this.tempTool);
    },


    zoomstart() {
      this.isZooming = true;

      this.zoomProps = {
        screenPt: this.screenPt,
        point: this.currentPoint,
        scale: this.viewport.zoomScale,
        viewBox: this.viewport.viewBox,
      };
    },
    zoom() {
      const { y: screenY } = this.screenPt;
      const rect = this.$refs.svg.getBoundingClientRect();

      const zoomPct = (this.zoomProps.screenPt.y - screenY) / rect.height;

      // Don't zoom to less than zero scale!
      const zoomScale = zoomPct > 1
        ? (1 + zoomPct * 2) * this.zoomProps.scale
        : (1 + zoomPct) * this.zoomProps.scale;

      // get current mouse x,y coordinates in SVG-space units from dragStart
      const { x, y } = this.zoomProps.point;

      const viewOffset = {
        x: (this.zoomProps.viewBox.minX) / this.zoomProps.scale,
        y: -(this.zoomProps.viewBox.minY) / this.zoomProps.scale,
      };

      const mouseOffset = {
        x: x - viewOffset.x,
        y: y - viewOffset.y,
      };

      const newMouseOffset = {
        x: mouseOffset.x / (zoomScale / this.zoomProps.scale),
        y: mouseOffset.y / (zoomScale / this.zoomProps.scale),
      };
      const newViewOffset = {
        x: x - newMouseOffset.x,
        y: y - newMouseOffset.y,
      };
      const viewBox = {
        minX: newViewOffset.x * zoomScale,
        minY: -newViewOffset.y * zoomScale,
        width: this.zoomProps.viewBox.width,
        height: this.zoomProps.viewBox.height,
      };
      this.viewport.zoomScale = zoomScale;
      this.viewport.viewBox = viewBox;
    },
    zoomend() {
      this.isZooming = false;
    },


    handleMousewheel(e) {
      const zoomScale = e.deltaY > 0
        ? this.viewport.zoomScale * 1.1
        : this.viewport.zoomScale * (1 / 1.1);

      const viewOffset = {
        x: (this.viewport.viewBox.minX) / this.viewport.zoomScale,
        y: -(this.viewport.viewBox.minY) / this.viewport.zoomScale,
      };

      const mouseOffset = {
        x: this.currentPoint.x - viewOffset.x,
        y: this.currentPoint.y - viewOffset.y,
      };

      const newMouseOffset = {
        x: mouseOffset.x / (zoomScale / this.viewport.zoomScale),
        y: mouseOffset.y / (zoomScale / this.viewport.zoomScale),
      };
      const newViewOffset = {
        x: this.currentPoint.x - newMouseOffset.x,
        y: this.currentPoint.y - newMouseOffset.y,
      };
      const viewBox = {
        minX: newViewOffset.x * zoomScale,
        minY: -newViewOffset.y * zoomScale,
        width: this.viewport.viewBox.width,
        height: this.viewport.viewBox.height,
      };
      this.viewport.zoomScale = zoomScale;
      this.viewport.viewBox = viewBox;
    },


    resizeHandler() {
      this.viewport.el.width = this.$refs.svg.clientWidth;
      this.viewport.el.height = this.$refs.svg.clientHeight;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
.concrete-viewport {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.concrete-drawing {
  flex: 1;
}

.concrete-toolbar {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  background-color: white;
  opacity: 0.95;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.concrete-header, .concrete-footer {
  position: absolute;
  display: flex;
  align-items: center;
  background-color: white;
  opacity: 0.98;
}

.concrete-header > *, .concrete-footer > * {
  margin-left: 0.5rem;
}
</style>
