<template>
  <c-svg-2d-viewport
    v-model="hoverPt"
    name="Elevation"
    viewport-id="elevation"
    :extents="{ xmin: -10, ymin: -10, xmax: 10, ymax: 10 }"
  >
    <c-draggable-point
      :point="point"
      @dragging="setPoint"
      @dragend="setPoint"
    />
    <c-draggable-point
      :point="{ x: 0, y: 0 }"
      @dragging="setPoint"
      @dragend="setPoint"
    />
    <c-draggable-point
      :point="{ x: -5, y: -5 }"
      @dragging="setPoint"
      @dragend="setPoint"
    />
    <c-draggable-path
      :path="path"
      @drag-start="startPathDrag"
      @dragging="dragPath"
      @drag-end="dragPath"
    />
  </c-svg-2d-viewport>
</template>

<script>
export default {
  name: 'ElevationDrawing',
  data() {
    return {
      point: { x: 5, y: 5 },
      hoverPt: { x: 0, y: 0 },
      dragPt: { x: 0, y: 0 },
      startDrag: null,
    };
  },
  computed: {
    path() {
      const d = this.dragPt;
      return `M${0 + d.x},${0 + d.y} L${2 + d.x},${0 + d.y} L${8 + d.x},${8 + d.y} L${5 + d.x},${8 + d.y}`;
    },
  },
  methods: {
    setPoint(pt) {
      this.point = pt;
    },
    startPathDrag(pt) {
      this.startDrag = pt;
    },
    dragPath(pt) {
      const diff = {
        x: pt.x - this.startDrag.x,
        y: pt.y - this.startDrag.y,
      };
      this.dragPt = {
        x: this.dragPt.x + diff.x,
        y: this.dragPt.y + diff.y,
      };
      this.startDrag = pt;
    },
    endPathDrag(pt) {
      const diff = {
        x: pt.x - this.startDrag.x,
        y: pt.y - this.startDrag.y,
      };
      this.dragPt = {
        x: this.dragPt.x + diff.x,
        y: this.dragPt.y + diff.y,
      };
      this.startDrag = null;
    },
  },
};
</script>
