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
  </c-svg-2d-viewport>
</template>

<script>
export default {
  name: 'ElevationDrawing',
  data() {
    return {
      point: { x: 5, y: 5 },
      hoverPt: { x: 0, y: 0 },
    };
  },
  methods: {
    setPoint(pt) {
      this.point = pt;
    },
  },
};
</script>
