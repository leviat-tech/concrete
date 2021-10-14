<template>
  <div class="concrete-input-row concrete" @focus="$refs.input.focus()">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled, [size]: size }"
    >
      {{ label }}
    </div>
    <div
      class="concrete-input concrete"
      :class="{ focused, [size]: size, [theme]: theme }"
    >
      <div v-if="$slots.prefix" ref="prefix" class="prefix">
        <slot name="prefix"></slot>
      </div>
      <input
        v-model="valproxy"
        type="text"
        ref="input"
        :class="[
          size,
          theme,
        ]"
        :placeholder="placeholder"
        :disabled="disabled || readOnly"
        @keydown.enter="$emit('enter')"
        @focus="focused = true"
        @blur="handleBlur"
      >
      <div v-if="$slots.suffix" ref="suffix" class="suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import valproxy from '@/utils/valproxy';


export default {
  name: 'CTextInput',
  props: {
    placeholder: { type: String, default: 'Enter a value' },
    label: { type: String, default: null },
    size: { type: String, default: null },
    theme: { type: String, default: null },
    value: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
  },
  data() {
    return {
      focused: null,
    };
  },
  computed: {
    valproxy,
  },
  methods: {
    handleBlur() {
      this.focused = false;
      this.$emit('blur');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';
</style>
