<template>
  <div class="container">
    <c-toolbar default-tool="select">
      <c-tool-group>
        <c-tool name="Undo" tool-id="undo" icon="undo" />
        <c-tool name="Redo" tool-id="redo" icon="redo" />
      </c-tool-group>
      <c-tool-group>
        <c-tool name="Select" tool-id="select" icon="pointer-outline" />
        <c-tool name="Pan" tool-id="pan" icon="hand" />
        <c-tool name="Pen" tool-id="pen" icon="pen" />
      </c-tool-group>
      <c-tool-group>
        <c-tool name="Run" tool-id="play" icon="play" />
        <c-tool name="Pause" tool-id="pause" icon="pause" />
      </c-tool-group>
    </c-toolbar>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../src/assets/styles/variables.scss';

.container {
  border: $border-sm solid $color-gray-04;
}
</style>