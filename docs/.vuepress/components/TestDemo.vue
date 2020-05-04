<template>
  <div>
    This is some content.
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' },
    viewportId: { type: String, required: true },
    icon: { type: String, default: 'polygon' },
    fitToContent: { type: Boolean, default: false },
    fitMargin: { type: Number, default: 1 },
    zoomable: { type: Boolean, default: false },
    pannable: { type: Boolean, default: false },
    reactiveProps: { type: Object, default: null },
  }
}
</script>