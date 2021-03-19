<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  .k-button {
    height: 20px;
    width: 20px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
</style>


<template>
  <div class="k-button c-box flex-limit">
    <k-icon :icon="icon"/>
  </div>
</template>


<script>
export default {
  name: 'k-button',
  props: ['icon'],
};
</script>
