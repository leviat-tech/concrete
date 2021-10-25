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
      <textarea
        ref="input"
        v-model="valproxy"
        :rows="rows"
        :class="[size, theme]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        @keydown.enter="$emit('enter')"
        @focus="focused = true"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>

<script>
import valproxy from '@/utils/valproxy';


export default {
  name: 'CTextarea',
  props: {
    placeholder: { type: String, default: 'Enter a value' },
    label: { type: String, default: null },
    value: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    size: { type: String, default: 'base' },
    theme: { type: String, default: 'light' },
    rows: { type: Number, default: 10 },
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

.concrete-input {
  height: 100%;

  &.xs {
    font-size: $text-xs;
    height: 100%;
  }

  &.sm {
    font-size: $text-sm;
    height: 100%;
  }

  &.lg {
    font-size: $text-lg;
    height: 100%;
  }

  &.xl {
    font-size: $text-xl;
    height: 100%;
  }

}

.concrete-input-row {
  align-items: start;
}
</style>
