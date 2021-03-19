<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';
  .k-checkbox {
    font-size: 10px;
    line-height: 16px;
    width: 16px;
    height: 16px;
    background: $color-white;
    border: 1px solid $color-gray-05;
    border-radius: 4px;
    box-shadow: inset 1px 1px 3px $color-gray-05,
                inset -1px -1px 3px $color-white;
    .k-icon {
      display: none;
    }
    &.checked {
      color: $color-white;
      background: $color-blue;
      box-shadow: none;
      border: none;
      .k-icon {
        display: block;
      }
      &:hover {
        border: 1px solid lighten($color-blue, 15);
      }
    }
    &.disabled {
      color: $color-gray-07;
      background: $color-gray-04;
      box-shadow: none;
      border: none;
      cursor: not-allowed;
      &:hover {
        box-shadow: none;
        border: none;
      }
    }
    &:hover {
      border: 1px solid $color-gray-07;
    }
    &:focus {
      outline: none;
      border: 1px solid $color-blue;
    }
  }
</style>


<template>
  <div class="k-checkbox c-box" :class="{checked, disabled}" @click="toggle">
    <k-icon icon="far-check"/>
  </div>
</template>


<script>
export default {
  name: 'k-checkbox',
  props: {
    value: {
      Boolean,
    },
    disabled: null,
  },
  data() {
    return {
      checked: this.value || false,
    };
  },
  watch: {
    value() {
      this.checked = this.value;
    },
    checked() {
      this.$emit('input', this.checked);
    },
  },
  methods: {
    toggle() {
      if (!this.disabled) {
        this.checked = !this.checked;
      }
    },
  },
};
</script>
