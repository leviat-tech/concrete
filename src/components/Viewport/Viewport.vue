<template>
  <div v-if="visible" class="flex h-full w-full overflow-hidden relative bg-white">
    <slot />
    <c-drawing-tools
      class="absolute flex items-center bg-white opacity-95"
      :viewport-id="viewportId"
      :options="options"
      :current-option="currentOption"
      :maximized="maximized === viewportId"
    />
  </div>
</template>

<script>
import CDrawingTools from './DrawingTools.vue';


export default {
  components: {
    CDrawingTools,
  },
  props: {
    viewportId: { type: [String, Number], required: true },
    value: { type: [String, Number], required: true },
    options: { type: Array, default: () => [] },
  },
  inject: ['viewportContainer'],
  data() {
    return {
      currentOption: this.value,
    };
  },
  computed: {
    current() {
      return this.options.find((v) => v.value === this.currentOption);
    },
    visible() {
      return !this.maximized || this.maximized === this.viewportId;
    },
    maximized() {
      return this.viewportContainer.maximized;
    },
  },
  watch: {
    value: {
      handler(nv) {
        this.currentOption = nv;
      },
    },
  },
};
</script>
