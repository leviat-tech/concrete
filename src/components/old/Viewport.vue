<template>
  <div v-if="visible" class="concrete-viewport">
    <slot />
    <c-drawing-tools
      class="concrete-header"
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
  name: 'CViewport',
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.concrete-viewport {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: white;
}

.concrete-header, .concrete-footer {
  position: absolute;
  display: flex;
  align-items: center;
  background-color: white;
  opacity: 0.98;
}

.concrete-header > *, .concrete-footer > * {
  margin-left: 0.5rem;
}
</style>
