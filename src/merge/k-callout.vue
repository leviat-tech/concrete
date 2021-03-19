<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  .k-callout {
    position: relative;
    border: solid 2px $primary;
    color: $color-gray-08;

    .flag {
      background: $primary;
      width: 22px;
      border-right: solid 2px $primary;
      color: $color-white;
    }
    .message {
      padding: 10px;
    }
  }
</style>


<template>
  <div class="k-callout h-box">
    <div class="flag flex-limit c-box">
      <k-icon icon="far-exclamation-circle"/>
    </div>
    <div class="message">
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  name: 'k-callout',
};
</script>
