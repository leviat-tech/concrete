<template>
  <div class="concrete-input-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled, [size]: size }"
    >
      {{ label }}
    </div>
    <div class="concrete-checkbox concrete" :class="{ focused, [size]: size, [theme]: theme }">
      <input
        v-model="localValue"
        type="checkbox"
        :class="[size, theme]"
        :disabled="disabled"
        @focus="focused = true"
        @blur="focused = false"
        @change="handleChange"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CCheckbox',
  props: {
    label: { type: String, default: '' },
    value: { type: Boolean },
    size: { type: String, default: 'base' },
    theme: { type: String, default: 'light' },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      localValue: false,
      focused: false,
    };
  },
  watch: {
    value: {
      handler() {
        this.localValue = this.value;
      },
    },
  },
  created() {
    this.localValue = !!this.value;
  },
  methods: {
    handleChange() {
      this.$emit('change-value', this.localValue);
      this.$emit('input', this.localValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';

.concrete-checkbox {
  text-align: left;
  max-width: 28rem;
  width: 100%;

  &.xs {
    font-size: $text-xs;
  }

  &.sm {
    font-size: $text-sm;
  }

  &.lg {
    font-size: $text-lg;
  }
}

</style>
