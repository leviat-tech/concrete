<template>
  <circle
    ref="pointref"
    class="concrete-draggable-point"
    :class="{ disabled }"
    :cx="point.x"
    :cy="point.y"
    :r="radius * scale"
  />
</template>

<script>
import { drag as d3Drag } from 'd3-drag';
import { selectAll, mouse } from 'd3-selection';


export default {
  name: 'CDraggablePoint',
  props: {
    point: { type: Object, default: () => ({ x: 0, y: 0 }) },
    radius: { type: Number, default: 5 },
    disabled: { type: Boolean, default: false },
  },
  inject: ['viewport'],
  data() {
    return {
      selection: null,
    };
  },
  computed: {
    scale() {
      return this.viewport.pxToSvg;
    },
  },
  mounted() {
    this.selection = selectAll([this.$refs.pointref]);
    this.selection.call(d3Drag()
      .on('start', this.dragstart)
      .on('drag', this.dragged)
      .on('end', this.dragend));
  },
  destroyed() {
    this.selection.on('.drag', null);
  },
  methods: {
    dragstart() {
      if (this.disabled) return;
      const [x, y] = mouse(this.$refs.pointref);
      this.$emit('drag-start', { x, y });
    },
    dragged() {
      if (this.disabled) return;
      const [x, y] = mouse(this.$refs.pointref);
      this.$emit('dragging', { x, y });
    },
    dragend() {
      if (this.disabled) return;
      const [x, y] = mouse(this.$refs.pointref);
      this.$emit('drag-end', { x, y });
    },
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

  &:hover:not(.disabled) {
    stroke: rgba(0, 0, 0, 0.1);
    fill: $color-blue;
  }

  &.disabled {
    cursor: auto;
  }
}
</style>
