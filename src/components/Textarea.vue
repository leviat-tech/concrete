<template>
  <div class="concrete-select-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled }"
    >
      {{ label }}
    </div>
    <div class="concrete-input concrete" :class="{ focused }">
      <textarea
        v-model="localValue"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled || readOnly"
        @keydown.enter="handleUpdate"
        @focus="focused = true"
        @blur="handleBlur"
        @input="handleChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CTextarea',
  props: {
    placeholder: { type: String, default: 'Enter a value' },
    label: { type: String, default: null },
    value: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    rows: { type: Number, default: 10 },
  },
  data() {
    return {
      localValue: '',
      focused: null,
    };
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
    handleChange() {
      if (this.localValue !== this.value) {
        this.$emit('change-value', this.localValue);
      }
    },
    handleBlur() {
      this.focused = false;
      this.handleUpdate();
    },
    handleUpdate() {
      if (this.localValue !== this.value) {
        this.$emit('input', this.localValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';

.concrete-select-row {
  align-items: start;
}
</style>
