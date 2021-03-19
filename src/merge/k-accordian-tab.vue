<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  .k-accordian-tab {
    padding: 5px 20px 5px 33px;
    cursor: pointer;
    &:hover {
      background: $primary;
      color: $color-white;
    }
  }
</style>


<template>
  <div class="k-accordian-tab h-box flex-limit items-center">
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'k-accordian-tab',
  props: [],
  methods: {
  },
};
</script>
