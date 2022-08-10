<template>
  <div v-if="visible" class="concrete__viewport relative flex items-center justify-center w-full h-full overflow-hidden bg-white">
    <slot />
    <CViewportTools
      :viewport-id="viewportId"
      :options="options"
      :current-option="currentOption"
      :maximized="maximized === viewportId"
    />
  </div>
</template>

<script>
import CViewportTools from './ViewportTools.vue';

export default {
  name: 'CViewport',
  components: {
    CViewportTools,
  },
  props: {
    viewportId: { type: [String, Number], required: true },
    modelValue: { type: [String, Number], required: true },
    options: { type: Array, default: () => [] },
  },
  inject: ['viewportContainer'],
  data() {
    return {
      currentOption: this.modelValue,
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
    modelValue: {
      handler(nv) {
        this.currentOption = nv;
      },
    },
  },
};
</script>
