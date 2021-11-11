<template>
  <c-svg-2d-viewport
    name="Section"
    viewport-id="section"
    :extents="{ xmin: -10, ymin: -10, xmax: 10, ymax: 10 }"
    @resize="$emit('resize')"
  >
    <c-draggable-point
      :point="{ x: 5, y: 5 }"
    />
    <c-draggable-point
      :point="{ x: 0, y: 0 }"
    />
    <c-draggable-point
      :point="{ x: -5, y: -5 }"
    />
  </c-svg-2d-viewport>
</template>

<script>
export default {
  name: 'SectionDrawing',
};
</script>
