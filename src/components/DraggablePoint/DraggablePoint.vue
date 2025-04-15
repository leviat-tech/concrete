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
        base: 'hover:stroke-black/20 hover:fill-gray-900',
        brand: 'hover:stroke-entity-active/20 hover:fill-entity-active',
        success: 'hover:stroke-status-success/20 hover:fill-status-success',
        warning: 'hover:stroke-status-warning/20 hover:fill-status-warning',
        danger: 'hover:stroke-status-danger/20 hover:fill-status-danger',
        magic: 'hover:stroke-status-magic/20 hover:fill-status-magic',
        info: 'hover:stroke-status-info/20 hover:fill-status-info',
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
  beforeUnmount() {
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