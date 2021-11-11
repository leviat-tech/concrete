<template>
  <div class="concrete-drawing-tools">
    <c-toolbar v-if="!minbreakpoint && maximizable" class="drawing-tools">
      <c-tool-group>
        <c-tool
          v-if="maximized"
          name="Minimize"
          tool-id="minimize"
          icon="compress"
          :stateful="false"
          @click="minimizeViewport"
        />
        <c-tool
          v-else
          name="Maximize"
          tool-id="maximize"
          icon="expand"
          :stateful="false"
          @click="maximizeViewport"
        />
      </c-tool-group>
    </c-toolbar>
    <div v-if="options.length === 1" class="concrete-viewport-label">
      {{ options[0].label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CDrawingTools',
  props: {
    options: { type: Array, default: () => [] },
    currentOption: { type: [String, Number], default: null },
    viewportId: { type: String, required: true },

    // Is this viewport maximized?
    maximized: { type: Boolean, default: false },

    // Is there only room for one viewport?
    minbreakpoint: { type: Boolean, default: false },
  },
  inject: ['maximize', 'minimize', 'containerOptions'],
  computed: {
    maximizable() {
      return this.containerOptions.length > 1;
    },
  },
  methods: {
    maximizeViewport() {
      this.maximize(this.viewportId);
    },
    minimizeViewport() {
      this.minimize();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.concrete-drawing-tools {
  display: flex;
}

.concrete-viewport-label {
  font-size: 1rem;
  padding: 0.5rem;
  color: $color-gray-06
}
</style>
