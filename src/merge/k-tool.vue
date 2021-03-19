<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  .k-tool {
    height: 45px;
    min-width: 45px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background: $color-gray-04;
    }
  }
</style>


<template>
  <div class="k-tool flex items-center justify-center">
    <slot><k-icon :icon="icon"/></slot>
  </div>
</template>


<script>
export default {
  name: 'k-tool',
  props: {
    icon: {
      type: String,
    },
  },
};
</script>
