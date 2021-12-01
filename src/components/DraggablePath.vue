<template>
  <g>
    <path
      v-show="!disabled"
      ref="path"
      class="concrete-draggable-path-hover"
      :class="{ hovered, draggable }"
      :d="path"
      :stroke-width="hitboxWidth"
      :stroke="hovered ? hitboxStroke : 'transparent'"
      :stroke-opacity="hovered ? hitboxOpacity : hitboxStroke"
      @click="$emit('click', $event)"
      @mouseover="hoverPath"
      @mouseout="unhoverPath"
    />
    <path
      class="concrete-draggable-path"
      :class="{ disabled, hovered }"
      :stroke="hovered ? hoverStroke : stroke"
      :stroke-opacity="hovered ? hoverStrokeOpacity : strokeOpacity"
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
    draggable: { type: Boolean, default: true },
    strokeWidth: { type: Number, default: 3 },
    hitboxWidth: { type: Number, default: 14 },
    stroke: { type: String, default: 'black' },
    strokeOpacity: { type: Number, default: 0.6 },
    hoverStroke: { type: String, default: '#3D95F0' },
    hoverStrokeOpacity: { type: Number, default: 1 },
    hitboxStroke: { type: String, default: 'black' },
    hitboxOpacity: { type: Number, default: 0.1 },
  },
  data() {
    return {
      selection: null,
      hovered: false,
    };
  },
  mounted() {
    if (this.draggable) {
      this.selection = selectAll([this.$refs.path]);
      this.selection.call(d3Drag()
        .on('start', this.dragstart)
        .on('drag', this.dragged)
        .on('end', this.dragend));
    }
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
  fill: none;
  pointer-events: none;
}

.concrete-draggable-path-hover {
  vector-effect: non-scaling-stroke !important;
  fill: none;

  &.draggable {
    cursor: move;
  }
}
</style>
