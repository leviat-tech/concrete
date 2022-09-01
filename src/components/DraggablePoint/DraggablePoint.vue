<template>
  <circle
    ref="pointref"
    class="cursor-move stroke-transparent fill-black/60 stroke-[10px]  concrete__draggable-point"
    style="vector-effect: non-scaling-stroke !important; paint-order: stroke fill markers;"
    :class="styleClass"
    :cx="point.x"
    :cy="point.y"
    :r="radius * scale"
  />
</template>

<script>
import { drag as d3Drag } from 'd3-drag';
import { selectAll } from 'd3-selection';
import { colorProp } from '../../composables/props';

export default {
  props: {
    point: { type: Object, default: () => ({ x: 0, y: 0 }) },
    color: colorProp,
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
      return this.viewport?.pxToSvg || 1;
    },
    styleClass() {
      if(this.disabled) {
        return 'cursor-auto';
      }

      return {
        default: 'hover:stroke-black/20 hover:fill-gray-900',
        indigo: 'hover:stroke-indigo/20 hover:fill-indigo',
        sky: 'hover:stroke-sky/20 hover:fill-sky',
        steel: 'hover:stroke-steel/20 hover:fill-steel',
        success: 'hover:stroke-success/20 hover:fill-success',
        warning: 'hover:stroke-warning/20 hover:fill-warning',
        danger: 'hover:stroke-danger/20 hover:fill-danger',
      }[this.color];
    }

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
  },
};
</script>