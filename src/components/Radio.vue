<template>
  <div class="concrete-input-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled, [size]: size, [theme]: theme }"
    >
      {{ label }}
    </div>
    <div
      class="concrete-radio concrete"
      :class="{ focused, [size]: size, [theme]: theme }"
    >
      <div v-for="option in options" :key="option.value" class="option">
        <input
          :id="option.value"
          v-model="localValue"
          :class="[theme, size]"
          :value="option.value"
          type="radio"
          :disabled="disabled"
          @focus="focused = true"
          @blur="focused = false"
          @change="handleChange"
        >
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CRadio',
  props: {
    label: { type: String, default: null },
    value: { type: [String, Number, Boolean], default: null },
    options: { type: Array, default: () => [] },
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

.concrete-radio {
  width: 100%;
  display: flex;

  &.xs {
    font-size: $text-xs;
  }

  &.sm {
    font-size: $text-sm;
  }

  &.lg {
    font-size: $text-lg;
  }

  .option {
    margin-right: 2rem;

    input {
      margin-right: 0.5rem;
      outline: none;
    }
  }
}

</style>
