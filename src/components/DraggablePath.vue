<template>
  <g>
    <path
      ref="path"
      class="concrete-draggable-path-hover"
      :class="{ disabled, hovered }"
      :d="path"
      :stroke-width="hoverStrokeWidth"
      @mouseover="hoverPath"
      @mouseout="unhoverPath"
    />
    <path
      class="concrete-draggable-path"
      :class="{ disabled, hovered }"
      :stroke-width="strokeWidth"
      :d="path"
    />
  </g>
</template>

<script>
import { drag as d3Drag } from 'd3-drag';
import { selectAll, mouse } from 'd3-selection';


export default {
  name: 'CDraggablePath',
  props: {
    path: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    strokeWidth: { type: Number, default: 3 },
    hoverStrokeWidth: { type: Number, default: 14 },
  },
  data() {
    return {
      selection: null,
      hovered: false,
    };
  },
  mounted() {
    this.selection = selectAll([this.$refs.path]);
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
      const [x, y] = mouse(this.$refs.path);
      this.$emit('drag-start', { x, y });
    },
    dragged() {
      if (this.disabled) return;
      const [x, y] = mouse(this.$refs.path);
      this.$emit('dragging', { x, y });
    },
    dragend() {
      if (this.disabled) return;
      const [x, y] = mouse(this.$refs.path);
      this.$emit('drag-end', { x, y });
    },
    hoverPath() {
      this.hovered = true;
    },
    unhoverPath() {
      this.hovered = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.concrete-draggable-path {
  vector-effect: non-scaling-stroke !important;
  stroke: lighten(black, 40%);
  fill: none;
  pointer-events: none;

  &:hover:not(.disabled), &.hovered:not(.disabled) {
    stroke: $color-blue-highlight;
  }
}

.concrete-draggable-path-hover {
  vector-effect: non-scaling-stroke !important;
  fill: none;
  stroke: transparent;

  &:not(.disabled) {
    cursor: move;
  }

  &.hover:not(.disabled), &.hovered:not(.disabled) {
    stroke: rgba(0, 0, 0, 0.1);
  }
}
</style>
