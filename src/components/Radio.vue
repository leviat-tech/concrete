<template>
  <div class="concrete-select-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled }"
    >
      {{ label }}
    </div>
    <div class="concrete-radio concrete" :class="{ focused }">
      <div v-for="option in options" :key="option.value" class="option">
        <input
          :id="option.value"
          v-model="localValue"
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
    label: { type: String, default: '' },
    value: { type: [String, Number, Boolean], default: null },
    options: { type: Array, default: () => [] },
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
      this.$emit('update', this.localValue);
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

  .option {
    margin-right: 2rem;

    input {
      margin-right: 0.5rem;
      outline: none;
    }
  }
}

</style>
