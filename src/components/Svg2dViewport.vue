<template>
  <div class="concrete-svg-viewport-container concrete">
    <svg
      ref="svg"
      class="concrete-svg concrete"
      :viewBox="fit.viewBox"
    >
      <slot />
    </svg>
  </div>
</template>

<script>
import { onMounted, ref, reactive, computed } from '@vue/composition-api';
import { TweenLite } from 'gsap';


const remToPx = (rem) => {
  if (typeof window === 'undefined') {
    return rem * 16;
  }
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

const svg2dViewportProps = {
  name: { type: String, default: '' },
  viewportId: { type: String, required: true },
  icon: { type: String, default: 'polygon' },
  fitToContent: { type: Boolean, default: false },
  fitMargin: { type: Number, default: 1 },
  zoomable: { type: Boolean, default: false },
  pannable: { type: Boolean, default: false },
  reactiveProps: { type: Object, default: null },
};

function useSvg2d(svg, props) {
  const dwg = reactive({
    extents: {
      min: { x: 0, y: 0 },
      max: { x: 100, y: 100 },
    },
    container: { width: 100, height: 100 },
    width: computed(() => dwg.extents.max.x - dwg.extents.min.x),
    height: computed(() => dwg.extents.max.y - dwg.extents.min.y),
    pxMargin: computed(() => remToPx(props.fitMargin)),
    aspectRatio: computed(() => dwg.width / dwg.height),
  });

  dwg.getExtents = function getExtents() {
    const nodes = svg.value
      ? svg.value.childNodes
      : [];

    if (nodes.length === 0) {
      return { min: { x: 0, y: 0 }, max: { x: 100, y: 100 } };
    }

    const e = Array.prototype.reduce.call(nodes, (c, child) => {
      if (!child.attributes || child.attributes['ignore-fit']) return c;

      const b = child.getBBox();
      return {
        min: {
          x: Math.min(b.x, c.min.x),
          y: Math.min(b.y, c.min.y),
        },
        max: {
          x: Math.max(b.x + b.width, c.max.x),
          y: Math.max(b.y + b.height, c.max.y),
        },
      };
    }, { min: { x: Infinity, y: Infinity }, max: { x: -Infinity, y: -Infinity } });

    dwg.extents.min = e.min;
    dwg.extents.max = e.max;

    return null;
  };

  dwg.getBoundingBox = function getBoundingBox() {
    const b = svg.value.parentElement.getBoundingClientRect();
    dwg.container = {
      width: b.width,
      height: b.height,
    };
  };

  return { dwg };
}

function useSvg2dFit(svg, dwg, context) {
  const fit = reactive({
    extents: {
      min: { x: 0, y: 0 },
      max: { x: 100, y: 100 },
    },
    width: computed(() => fit.extents.max.x - fit.extents.min.x),
    height: computed(() => fit.extents.max.y - fit.extents.min.y),
    region: computed(() => {
      const w = dwg.container.width - dwg.pxMargin * 2;
      const h = dwg.container.height - dwg.pxMargin * 2;
      return {
        w: w > 0 ? w : 1,
        h: h > 0 ? h : 1,
      };
    }),
    aspectRatio: computed(() => fit.region.w / fit.region.h),
    scale: computed(() => (dwg.aspectRatio > fit.aspectRatio
      ? dwg.width / fit.region.w
      : dwg.height / fit.region.h)),
    regionSvg: computed(() => ({
      w: fit.region.w * fit.scale,
      h: fit.region.h * fit.scale,
    })),
    margin: computed(() => {
      if (dwg.aspectRatio > fit.aspectRatio) {
        return {
          x: dwg.pxMargin * fit.scale,
          y: dwg.pxMargin * fit.scale + (fit.regionSvg.h - fit.height) / 2,
        };
      }

      return {
        x: dwg.pxMargin * fit.scale + (fit.regionSvg.w - fit.width) / 2,
        y: dwg.pxMargin * fit.scale,
      };
    }),
    viewBox: computed(() => {
      const x = fit.extents.min.x - fit.margin.x;
      const y = fit.extents.min.y - fit.margin.y;
      const width = fit.width + fit.margin.x * 2;
      const height = fit.height + fit.margin.y * 2;
      return `${x} ${y} ${width} ${height}`;
    }),
  });

  fit.setFit = function setFit() {
    dwg.getExtents();

    fit.extents.min = { ...dwg.extents.min };
    fit.extents.max = { ...dwg.extents.max };
  };

  fit.animateFit = function animateFit() {
    dwg.getExtents();

    TweenLite.to(fit.extents.min, 0.5, dwg.extents.min);
    TweenLite.to(fit.extents.max, 0.5, dwg.extents.max);
  };

  onMounted(() => {
    dwg.getBoundingBox();

    context.root.$nextTick(() => {
      dwg.getExtents();
      fit.setFit();
    });
  });

  return { fit };
}

const CSvg2dViewport = {
  name: 'CSvg2dViewport',
  props: {
    ...svg2dViewportProps,
  },
  setup(props, context) {
    const svg = ref(null);
    const { dwg } = useSvg2d(svg, props, context);
    const { fit } = useSvg2dFit(svg, dwg, context);

    // TODO:
    // responsive (adapts on window resize)
    // pannable
    // zoomsToFeatures
    // zoomable

    return { svg, fit };
  },
};

export default CSvg2dViewport;

export {
  CSvg2dViewport,
  svg2dViewportProps,
  useSvg2d,
  useSvg2dFit,
};

</script>

<style lang="scss" scoped>
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
