<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';
  @import '@/assets/styles/inputs.scss';

  .k-textarea {
    @include input;
    textarea {
      font-family: $font-monospace;
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      height: 100px;
    }
  }
</style>


<template>
  <div class="k-textarea">
    <textarea v-model="valproxy" v-bind="this.$attrs"></textarea>
  </div>
</template>


<script>
import valproxy from '@/extensions/valproxy';

export default {
  name: 'k-textarea',
  props: ['value'],
  computed: {
    valproxy,
  },
};
</script>
