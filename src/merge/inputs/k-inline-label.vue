<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';
  .k-inline-label {
    text-transform: capitalize;
    padding-left: 7px;
    padding-right: 1px;
    &:first-child {
      padding: 0px;
    }
  }
</style>


<template>
  <div class="k-inline-label">
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'k-inline-label',
};
</script>
