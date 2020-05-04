<template>
  <circle
    ref="pointref"
    class="concrete-draggable-point"
    :cx="point.x"
    :cy="point.y"
    :r="5 * scale"
  />
</template>

<script>
import { onMounted, onUnmounted, ref, reactive } from '@vue/composition-api';
import { drag as d3Drag } from 'd3-drag';
import { selectAll, mouse } from 'd3-selection';


export default {
  name: 'CDraggablePoint',
  props: {
    point: { type: Object, default: () => ({ x: 0, y: 0 }) },
    scale: { type: Number, default: 1 },
  },
  setup(props, context) {
    const pointref = ref(null);

    const drag = reactive({
      svg: null,
      selection: null,
    });

    function dragstart() {
      const [x, y] = mouse(drag.svg);
      context.emit('drag-start', { x, y });
    }

    function dragged() {
      const [x, y] = mouse(drag.svg);
      context.emit('dragging', { x, y });
    }

    function dragend() {
      const [x, y] = mouse(drag.svg);
      context.emit('drag-end', { x, y });
    }

    onMounted(() => {
      drag.svg = pointref.value.ownerSVGElement;

      drag.selection = selectAll([pointref.value]);
      drag.selection.call(d3Drag()
        .on('start', dragstart)
        .on('drag', dragged)
        .on('end', dragend));
    });

    onUnmounted(() => {
      drag.selection.on('.drag', null);
    });

    return { pointref, drag };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.concrete-draggable-point {
  vector-effect: non-scaling-stroke !important;
  cursor: move;
  fill: lighten(black, 40%);
  stroke: transparent;
  stroke-width: 10;

  &:hover {
    stroke: rgba(0, 0, 0, 0.1);
    fill: $color-blue;
  }
}
</style>
