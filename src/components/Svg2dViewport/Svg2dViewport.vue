<template>
  <div
    class="
      flex
      h-full
      w-full
      overflow-hidden
      relative
      concrete__svg-2d-viewport
    "
  >
    <svg
      ref="svg"
      class="flex-1 -scale-y-100"
      :viewBox="vbString"
      @click="handleClick"
      @mousewheel.passive="handleMousewheel"
      @wheel.passive="handleMousewheel"
      @pointerdown="handleMousedown"
      @pointermove="handleMousemove"
      @pointerup="handleMouseup"
    >
      <g
        ref="contents"
        class="drawing-contents"
        :transform="`translate(${dragOffset.x} ${dragOffset.y})`"
      >
        <slot />
      </g>
    </svg>
    <div
      class="
        absolue
        left-2
        top-2
        bg-white
        opacity-95
        flex flex-col
        items-center
      "
    >
      <slot name="toolbar" />
    </div>
    <div class="absolute flex items-center bg-white opacity-95">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash-es';

function domToSVGCoords(el, pt) {
  const { x, y } = pt.matrixTransform(el.getScreenCTM().inverse());
  return { x, y };
}

function calculateNewOffset (oldLength, newLength, oldMinPoint, currentPoint) {
  const difference = newLength - oldLength;
  const percentOffset = (currentPoint - oldMinPoint) / oldLength;
  const svgOffset = difference * percentOffset;
  return oldMinPoint - svgOffset;
};

const ZOOM_LIMITS = {
  MIN: 1e-5,
  MAX: 0.1,
};

export default {
  props: {
    extents: {
      type: Object,
      default: () => ({
        xmin: -10,
        ymin: -10,
        xmax: 10,
        ymax: 10,
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
        viewBox: {
          minX: 0,
          minY: 0,
          width: 1,
          height: 1,
        },
        el: {
          width: 1,
          height: 1,
        },
        pxToSvg: 1,
      },
      currentPoint: this.value,
      hasZoomed: false,
      tempTool: null,
    };
  },
  provide() {
    return {
      viewport: this.viewport,
    };
  },
  inject: ['viewportContainer'],
  computed: {
    vbString() {
      const { minX, minY, width, height } = this.viewport.viewBox; // eslint-disable-line
      return `${minX} ${minY} ${width} ${height}`;
    },
    aspectRatio() {
      return this.viewport.el.width / this.viewport.el.height;
    },

    // A factor which, when multiplied to a dimension in screen px, will yield the size in SVG units
    pxToSvgUnits() {
      return this.viewport.viewBox.width / this.viewport.el.width;
    },

    maximized() {
      return this.viewportContainer?.maximized;
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
    maximized: {
      async handler() {
        await this.$nextTick;
        this.resizeHandler();
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
    this.zoomToExtents();
    window.addEventListener('resize', this.resizeHandler);
  },
  beforeUnmount() {
    document.removeEventListener('pointerleave', this.documentMouseleave);
    window.removeEventListener('resize', this.resizeHandler);
  },
  methods: {
    isEmpty,
    zoomToExtents() {
      this.zoomTo(this.extents);
    },
    zoomTo({ xmin, ymin, xmax, ymax }) {
      const width = xmax - xmin;
      const height = ymax - ymin;

      let newWidth, newHeight;

      // Ensure new height and width maintains the correct aspect ratio
      if (this.aspectRatio > width / height) {
        // Stretch horizontally
        newWidth = this.aspectRatio * height;
        newHeight = height;
      } else {
        // Stretch vertically
        newWidth = width;
        newHeight = width / this.aspectRatio;
      }

      const widthDifference = newWidth - width;
      const heightDifference = newHeight - height;

      this.viewport.viewBox = {
        minX: xmin - widthDifference / 2,
        minY: ymin - heightDifference / 2,
        width: newWidth,
        height: newHeight,
      };
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
    handleClick(e) {
      this.$emit('click', e);
    },
    handleMousedown(e) {
      this.$emit('mousedown', e);
      this.setMousePt(e);
      (e.target || this.$refs.svg).setPointerCapture(e.pointerId);
      if (e.button === 2 || this.currentTool === 'pan') {
        this.panstart();
      } else if (e.button === 1) {
        this.zoomToExtents();
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
        viewBox: this.viewport.viewBox,
      };
    },
    zoomAtPoint(point, zoomFactor) {
      if (
        (zoomFactor < 1 && this.pxToSvgUnits.value <= ZOOM_LIMITS.MIN) ||
        (zoomFactor > 1 && this.pxToSvgUnits.value > ZOOM_LIMITS.MAX)
      )
        return;

      const { x, y } = point;

      const oldMinX = this.viewport.viewBox.minX;
      const oldMinY = this.viewport.viewBox.minY;
      const oldWidth = this.viewport.viewBox.width;
      const oldHeight = this.viewport.viewBox.height;

      const newWidth = oldWidth * zoomFactor;
      const newHeight = oldHeight * zoomFactor;

      const newMinX = calculateNewOffset(oldWidth, newWidth, oldMinX, x);
      const newMinY = calculateNewOffset(oldHeight, newHeight, oldMinY, y);

      this.viewport.viewBox = {
        minX: newMinX,
        minY: newMinY,
        width: newWidth,
        height: newHeight,
      };
    },
    zoom() {
      const scaleAmount = 1.05;
      const zoomFactor = this.zoomProps < this.screenPt.y ? scaleAmount : 1 / scaleAmount;

      this.zoomProps.screenY = this.screenPt.y;

      this.zoomAtPoint(this.zoomProps.point, zoomFactor);
    },
    zoomend() {
      this.isZooming = false;
    },

    handleMousewheel(e) {
      const scaleAmount = 1.1;
      const zoomFactor = e.deltaY > 0 ? scaleAmount : 1 / scaleAmount;

      this.setMousePt(e);
      this.zoomAtPoint(this.currentPoint, zoomFactor);
    },

    resizeHandler() {
      this.viewport.el.width = this.$refs.svg.clientWidth;
      this.viewport.el.height = this.$refs.svg.clientHeight;

      const ratio = this.viewport.el.width / this.viewport.el.height;

      this.viewport.viewBox.height = this.viewport.viewBox.width / ratio;
    },
  },
  expose: ['viewport', 'zoomToExtents'],
};
</script>
