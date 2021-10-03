<template>
  <div class="concrete-viewport">
    <c-drawing-tools
      class="concrete-header"
      :maximized="true"
      :options="options"
    />
    <svg
      ref="svg"
      class="concrete-drawing"
      :viewBox="vbString"
      @mousewheel="handleZoom"
      @wheel="handleZoom"
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
import CDrawingTools from './DrawingTools.vue';


function domToSVGCoords(el, pt) {
  const { x, y } = pt.matrixTransform(el.getScreenCTM().inverse());
  return { x, y };
}

export default {
  name: 'CSvg2dViewport',
  components: {
    CDrawingTools,
  },
  props: {
    name: { type: String, required: true },
    viewportId: { type: String, required: true },
    extents: {
      type: Object,
      default: () => ({
        xmin: -10, ymin: -10, xmax: 10, ymax: 10,
      }),
    },
    options: { type: Array, default: () => [] },
    currentTool: { type: String, default: 'select' },
  },
  data() {
    return {
      hoverPt: null,
      svgP: { x: 0, y: 0 },
      dragFrom: null,
      dragOffset: { x: 0, y: 0 },
      isPanning: false,
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
      currentPoint: { x: 0, y: 0 },
      hasZoomed: false,
      tempTool: null,
    };
  },
  provide() {
    return {
      viewport: this.viewport,
      pxToSvgUnits: this.pxToSvgUnits,
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
    window.addEventListener('resize', this.resizeHandler);
  },
  unmounted() {
    document.removeEventListener('pointerleave', this.documentMouseleave);
    window.removeEventListener('resize', this.resizeHandler);
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
      this.hoverPt.x = e.clientX;
      this.hoverPt.y = e.clientY;
      this.svgP = domToSVGCoords(this.$refs.svg, this.hoverPt);
      this.currentPoint = domToSVGCoords(this.$refs.contents, this.hoverPt);
    },
    handleMousedown(e) {
      this.setMousePt(e);
      (e.target || this.$refs.svg).setPointerCapture(e.pointerId);
      if (e.which === 3 || this.currentTool === 'pan') {
        this.panstart();
      }
    },
    handleMousemove(e) {
      this.setMousePt(e);
      if (this.isPanning) {
        this.pan();
      }
    },
    handleMouseup(e) {
      this.setMousePt(e);
      this.$refs.svg.releasePointerCapture(e.pointerId);
      if (this.isPanning) {
        this.panend();
      }
    },
    documentMouseleave() {
      if (this.isPanning) this.panend();
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
      this.$emit('change-tool', 'pan');
    },
    handleZoom(e) {
      const viewOffset = {
        x: (this.viewport.viewBox.minX) / this.viewport.zoomScale,
        y: -(this.viewport.viewBox.minY) / this.viewport.zoomScale,
      };
      const mouseOffset = {
        x: this.currentPoint.x - viewOffset.x,
        y: this.currentPoint.y - viewOffset.y,
      };
      const zoomScale = e.deltaY > 0
        ? this.viewport.zoomScale * 1.1
        : this.viewport.zoomScale * (1 / 1.1);
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
  right: 0.5rem;
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
