<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';
  @import '@/assets/styles/inputs.scss';

  .k-input {
    height: $height;
    @include input;
    input:disabled ~ .prefix {
      // border-color: $color-gray-05;
    }
    .suffix, .prefix {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      position: absolute;
      bottom: 1px; // so we don't cover the border
      top: 1px;
      padding: $padding;
    }
    .suffix {
      border-radius: 0px $border-radius $border-radius 0px;
      border-left: 1px solid $color-gray-03;
      right: 1px;
    }
    .prefix {
      border-radius: $border-radius 0px 0px $border-radius;
      border-right: 1px solid $color-gray-03;
      left: 1px
    }
  }
</style>


<template>
  <div class="k-input h-box">
    <input ref="input" type="text" v-model="valproxy" v-bind="this.$attrs" :style="style">
    <div v-if="$slots.prefix" ref="prefix" class="prefix">
      <slot name="prefix"></slot>
    </div>
    <div v-if="$slots.suffix" ref="suffix" class="suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>


<script>
import valproxy from '@/extensions/valproxy';

export default {
  name: 'k-input',
  props: ['value'],
  data() {
    return {
      style: {},
    };
  },
  computed: {
    valproxy,
  },
  mounted() {
    if (this.$refs.suffix) {
      this.$set(this.style, 'paddingRight', `${this.$refs.suffix.offsetWidth + 8}px`);
    }
    if (this.$refs.prefix) {
      this.$set(this.style, 'paddingLeft', `${this.$refs.prefix.offsetWidth + 8}px`);
    }
  },
};
</script>
