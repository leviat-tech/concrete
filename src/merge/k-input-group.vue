<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  $color: red;
  .error /deep/ {
    & input {
      border: 1px solid $color !important;
    }
    & .k-label {
      color: $color;
    }
    & .subtitle {
      font-size: 11px;
      color: $color;
    }
  }
  .subtitle {

  }
</style>


<template>
  <div :class="{error:errors.length > 0}">
    <slot></slot>
    <div class="subtitle" v-for="error in errors" :key="error">
      {{error}}
    </div>
  </div>
</template>


<script>
export default {
  name: 'k-input-group',
  props: ['errors'],
};
</script>
