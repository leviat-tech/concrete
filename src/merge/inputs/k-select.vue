<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';
  @import '@/assets/styles/inputs.scss';

  .k-select {
    position: relative;
    @include input;
    select {
      padding-right: 24px;
    }
    .arrow {
      position: absolute;
      top: 0px;
      bottom: 0px;
      right: 8px;
      height: $height;
      width: 10px;
      pointer-events: none;
    }
  }
</style>


<template>
  <div class="k-select">
    <select v-model="valproxy" v-bind="this.$attrs">
      <slot></slot>
    </select>
    <k-icon class="arrow" icon="fal-angle-down"/>
  </div>
</template>


<script>
import valproxy from '@/extensions/valproxy';

export default {
  name: 'k-select',
  props: ['value'],
  computed: {
    valproxy,
  },
};
</script>
