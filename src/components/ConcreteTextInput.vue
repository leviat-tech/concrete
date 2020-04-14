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
        type="text"
        :placeholder="placeholder"
        :disabled="disabled || readOnly"
        @keydown.enter="handleUpdate"
        @focus="focused = true"
        @blur="handleBlur"
        @input="handleChange"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    placeholder: { type: String, default: '' },
    label: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
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
        this.$emit('update', this.localValue);
        this.$emit('input', this.localValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';
</style>
