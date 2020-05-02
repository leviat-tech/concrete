<template>
  <div class="concrete-svg-viewport-container concrete">
    <svg
      ref="svg"
      class="concrete-svg concrete"
      :viewBox="viewBox"
    >
      <slot />
    </svg>
  </div>
</template>

<script>

const remToPx = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export default {
  name: 'CSvg2dViewport',
  props: {
    name: { type: String, default: '' },
    viewportId: { type: String, required: true },
    icon: { type: String, default: 'polygon' },
    fitToContent: { type: Boolean, default: false },
    fitMargin: { type: Number, default: 2 },
    zoomable: { type: Boolean, default: false },
    pannable: { type: Boolean, default: false },
    reactiveProps: { type: Object, default: null },
  },
  data() {
    return {
      scale: 1,
      extents: {
        min: { x: 0, y: 0 },
        max: { x: 100, y: 100 },
      },
      bbox: { width: 100, height: 100 },
    };
  },
  computed: {
    width() {
      return this.extents.max.x - this.extents.min.x;
    },
    height() {
      return this.extents.max.y - this.extents.min.y;
    },
    aspectRatio() {
      return this.width / this.height;
    },
    pxMargin() {
      return remToPx(this.fitMargin);
    },
    fitRegion() {
      const w = this.bbox.width - this.pxMargin * 2;
      const h = this.bbox.height - this.pxMargin * 2;
      return {
        w: w > 0 ? w : 0,
        h: h > 0 ? h : 0,
      };
    },
    fitAspectRatio() {
      return this.fitRegion.w / this.fitRegion.h;
    },
    svgScale() {
      return this.aspectRatio > this.fitAspectRatio
        ? this.width / this.fitRegion.w
        : this.height / this.fitRegion.h;
    },
    margin() {
      return this.pxMargin * this.svgScale;
    },
    viewBox() {
      const x = this.extents.min.x - this.margin;
      const y = this.extents.min.y - this.margin;
      const width = this.width + this.margin * 2;
      const height = this.height + this.margin * 2;
      return `${x} ${y} ${width} ${height}`;
    },
  },
  mounted() {
    this.bbox = this.$refs.svg.getBoundingClientRect();
    this.extents = this.getExtents();
  },
  methods: {
    getFitScale() {
      return this.aspectRatio > this.fitAspectRatio
        ? this.bbox.width / this.width
        : this.bbox.height / this.height;
    },
    getExtents() {
      const nodes = this.$refs.svg
        ? this.$refs.svg.childNodes
        : [];

      if (nodes.length === 0) {
        return { min: { x: 0, y: 0 }, max: { x: 100, y: 100 } };
      }

      return Array.prototype.reduce.call(nodes, (c, child) => {
        if (child.attributes['ignore-fit']) return c;

        const bbox = child.getBBox();
        return {
          min: {
            x: Math.min(bbox.x, c.min.x),
            y: Math.min(bbox.y, c.min.y),
          },
          max: {
            x: Math.max(bbox.x + bbox.width, c.max.x),
            y: Math.max(bbox.y + bbox.height, c.max.y),
          },
        };
      }, { min: { x: Infinity, y: Infinity }, max: { x: -Infinity, y: -Infinity } });
    },
  },
};
</script>

<style lang="scss" scoped>
.concrete-svg-viewport-container {
  width: 100%;
  height: 100%;
}

.concrete-svg {
  width: 100%;
  height: 100%;
}

.concrete-svg /deep/ path,
.concrete-svg /deep/ polygon,
.concrete-svg /deep/ circle,
.concrete-svg /deep/ rect {
  vector-effect: non-scaling-stroke !important;
  fill-rule: evenodd;
  stroke-width: 1px;
  stroke: black;
  fill: transparent;
}

</style>
