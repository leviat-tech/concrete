<template>
  <div class="concrete-select-row row">
    <div
      v-if="label !== null"
      class="concrete-input-label label"
      :class="{ disabled }"
    >
      {{ label }}
    </div>
    <div class="concrete-input input" :class="{ focused }">
      <input
        v-model="localValue"
        type="number"
        :placeholder="placeholder"
        :step="precision"
        :disabled="disabled"
        @keydown.enter="handleUpdate"
        @input="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <div
        v-if="units"
        :class="{ focused }"
        class="concrete-units"
      >
        {{ units }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuantityInput',
  props: {
    placeholder: { type: String, default: '' },
    precision: { type: Number, default: 1 },
    label: { type: String, default: '' },
    value: { type: Number, default: null },
    units: { type: String, default: null },
    maximum: { type: Number, default: null },
    minimum: { type: Number, default: null },
    disabled: { type: Boolean },
  },
  data() {
    return {
      localValue: null,
      focused: false,
    };
  },
  computed: {
    coercedValue() {
      if (parseFloat(this.localValue) !== parseFloat(this.value)) {
        const value = this.localValue * 1;
        if (this.maximum && this.maximum < value) return this.maximum;
        if (this.minimum && this.minimum > value) return this.minimum;

        return value;
      }
      return undefined;
    },
  },
  watch: {
    // In the event that "value" is changed outside the context of this
    // component, the localValue here will be set to match.
    value: {
      handler() {
        this.localValue = this.value;
      },
    },
  },
  created() {
    if (this.value != null) {
      this.localValue = this.value;
    }
  },
  methods: {
    handleFocus() {
      this.focused = true;
    },
    handleBlur() {
      this.focused = false;
      this.handleUpdate();
    },
    handleChange() {
      if (typeof this.coercedValue === 'number') {
        this.$emit('change-value', this.coercedValue);
      }
    },
    handleUpdate() {
      if (typeof this.coercedValue === 'number') {
        this.localValue = this.coercedValue;
        this.$emit('update', this.coercedValue);
        this.$emit('input', this.coercedValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';
</style>
