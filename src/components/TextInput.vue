<template>
  <div class="concrete-input-row concrete" tabindex="-1" @focus="$refs.input.focus()">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled, [size]: size }"
    >
      {{ label }}
    </div>
    <div
      class="concrete-input concrete"
      :class="{ focused, [size]: size, [theme]: theme, disabled, readOnly }"
    >
      <div v-if="$slots.prefix" ref="prefix" class="prefix">
        <slot name="prefix" />
      </div>
      <input
        ref="input"
        v-model="valproxy"
        type="text"
        :class="[ size, theme ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        @keydown.enter="$emit('enter')"
        @focus="focused = true"
        @blur="handleBlur"
      >
      <div v-if="$slots.suffix" ref="suffix" class="suffix">
        <slot name="suffix" />
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
