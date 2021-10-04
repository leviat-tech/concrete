<template>
  <c-toolbar v-if="!minbreakpoint && options.length > 1" class="drawing-tools">
    <c-tool-group>
      <c-tool
        v-if="maximized"
        name="Minimize"
        tool-id="maximize"
        icon="compress"
        :stateful="false"
        @click="maximize"
      />
      <c-tool
        v-else
        name="Maximize"
        tool-id="maximize"
        icon="expand"
        :stateful="false"
        @click="minimize"
      />
    </c-tool-group>
  </c-toolbar>
  <div v-else class="concrete-viewport-label">
    {{ options[0].label }}
  </div>
</template>

<script>
export default {
  name: 'CDrawingTools',
  props: {
    options: { type: Array, default: () => [] },
    maximized: { type: Boolean, default: false }, // Is this viewport maximized?
    minbreakpoint: { type: Boolean, default: false }, // Is there only room for one viewport?
    current: { type: String, default: null }, // This viewport's Id
  },
  methods: {
    maximize() {
      this.$emit('maximize');
    },
    minimize() {
      this.$emit('minimize');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.concrete-viewport-label {
  font-size: 1rem;
  padding: 0.5rem;
  color: $color-gray-06
}
</style>
