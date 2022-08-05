<template>
  <g>
    <path
      style="fill:none; vector-effect: non-scaling-stroke !important; paint-order: stroke fill markers;"
      v-show="!disabled"
      ref="path"
      :class="[cursorClass, strokeColor]"
      :d="path"
      :stroke-width="hitboxWidth"
      :stroke-opacity="hovered ? hitboxOpacity : 0"      
      @click="$emit('click', $event)"
      @mouseover="hoverPath"
      @mouseout="unhoverPath"
    />
    <path
      style="fill:none; vector-effect: non-scaling-stroke !important; paint-order: stroke fill markers;"
      class="pointer-events-none"
      :class="hoveredStrokeColor"
      :stroke-opacity="computedStrokeOpacity"
      :stroke-width="strokeWidth"
      :d="path"
    />
  </g>
</template>

<script>
import { drag as d3Drag } from 'd3-drag';
import { selectAll } from 'd3-selection';
import { colorProp } from '../../composables/props';

export default {
  name: 'CDraggablePath',
  props: {
    path: { type: String, required: true },
    color: colorProp,
    disabled: { type: Boolean, default: false },
    draggable: { type: Boolean, default: true },
    active: { type: Boolean, default: false },
    strokeWidth: { type: Number, default: 3 },
    hitboxWidth: { type: Number, default: 14 },
    strokeOpacity: { type: Number, default: 0.6 },
    hoverStrokeOpacity: { type: Number, default: 1 },
    hitboxOpacity: { type: Number, default: 0.1 },
    activeStrokeOpacity: { type: Number, default: 1 },
  },
  data() {
    return {
      selection: null,
      hovered: false,
    };
  },
  computed: {
    strokeColor() {
      return {
        default: 'stroke-black',
        indigo: 'stroke-indigo',
        sky: 'stroke-sky',
        steel: 'stroke-steel',
        success: 'stroke-success',
        warning: 'stroke-warning',
        danger: 'stroke-danger',
      }[this.color];
    },
    hoveredStrokeColor() {
      if(!this.hovered && !this.active) return 'stroke-black'
      return {
        default: 'stroke-black',
        indigo: 'stroke-indigo',
        sky: 'stroke-sky',
        steel: 'stroke-steel',
        success: 'stroke-success',
        warning: 'stroke-warning',
        danger: 'stroke-danger',
      }[this.color];
    },
    computedStrokeOpacity() {
      if (this.active) return this.activeStrokeOpacity;
      if (this.hovered) return this.hoverStrokeOpacity;
      return this.strokeOpacity;
    },
    cursorClass() {
      if(this.disabled) {
        return 'cursor-auto';
      }
      return 'cursor-move';
    }
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
    dragstart(e) {
      if (this.disabled) return;
      this.$emit('drag-start', { x: e.x, y: e.y });
    },
    dragged(e) {
      if (this.disabled) return;
      this.$emit('dragging', { x: e.x, y: e.y });
    },
    dragend(e) {
      if (this.disabled) return;
      this.$emit('drag-end', { x: e.x, y: e.y });
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