<template>
  <div class="concrete-svg-viewport-container concrete">
    <svg
      ref="svg"
      class="concrete-svg concrete"
      :viewBox="fit.viewBox"
    >
      <polygon :points="state.polygon" />
      <c-draggable-point
        v-for="(point, index) in state.points"
        :key="index"
        :point="point"
        :scale="fit.scale"
        @dragging="setPoint(index, $event)"
        @drag-end="dragEnd(index, $event)"
      />
    </svg>
  </div>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api';
import {
  svg2dViewportProps,
  useSvg2d,
  useSvg2dFit,
} from '@/components/Svg2dViewport';


export default {
  name: 'PlanDemo',
  props: {
    ...svg2dViewportProps,
    initialPoints: { type: Array, default: () => [] },
  },
  setup(props, context) {
    const svg = ref(null);
    const { dwg } = useSvg2d(svg, props, context);
    const { fit } = useSvg2dFit(svg, dwg, context);

    const state = reactive({
      points: props.initialPoints,
      polygon: computed(() => state.points.map(({ x, y }) => `${x},${y}`).join(' ')),
    });

    function setPoint(index, pt) {
      state.points.splice(index, 1, pt);
    }

    function dragEnd(index, pt) {
      state.points.splice(index, 1, pt);
      fit.animateFit();
    }

    return {
      svg, dwg, fit, state, setPoint, dragEnd,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../src/assets/styles/variables.scss';

.concrete-svg-viewport-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.concrete-svg {
  width: 100%;
  height: 100%;
}

polygon {
  vector-effect: non-scaling-stroke !important;
  fill-rule: evenodd;
  stroke-width: 1px;
  stroke: black;
  fill: $color-gray-01;
}
</style>
