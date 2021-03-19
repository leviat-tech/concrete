<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  .k-label {
    text-transform: capitalize;
  }
</style>


<template>
  <div class="k-label">
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'k-label',
};
</script>
