<template>
  <div class="concrete__viewport-tools absolute top-1 left-0 flex items-center">
    <c-toolbar v-if="!minbreakpoint && maximizable" class="drawing-tools">
      <c-tool-group>
        
        <c-tool
          v-if="maximized"
          name="Minimize"
          tool-id="minimize"
          icon="compress"
          @click="minimizeViewport"
        />
        <c-tool
          v-else
          name="Maximize"
          tool-id="maximize"
          icon="expand"
          @click="maximizeViewport"
        />
        <slot />
      </c-tool-group>
    </c-toolbar>
    <div v-if="options.length === 1" class="concrete-viewport-label text-base-600 px-2">
      {{ options[0].label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CViewportTools',
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
