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
      class="concrete-input concrete numeric-input"
      :class="{ focused, [size]: size, [theme]: theme, disabled, readOnly }"
    >
      <div v-if="$slots.prefix" ref="prefix" class="prefix">
        <slot name="prefix" />
      </div>
      <input
        ref="input"
        v-model="valproxy"
        :class="[ size, theme ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        @keydown.enter="$emit('enter')"
        @focus="focused = true"
        @blur="handleBlur"
      >
      <div ref="suffix" class="suffix">
        <slot name="suffix">
          <!-- unit -->
          <div v-if="to || unit" class="unit">{{ to || unit }}</div>

          <!-- stepper -->
          <div v-if="step && !disabled && !readOnly" class="stepper v-box" :class="{ disabled }">
            <div class="up-icon" @click="up">
              <c-icon class="icon" type="chevron-up" />
            </div>
            <div class="down-icon" @click="down">
              <c-icon class="icon" type="chevron-down" />
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Big from 'big.js';
import { convert, convertFromSI, convertToSI } from '@/utils/units';


export default {
  name: 'CQuantityInput',
  props: {
    placeholder: { type: String, default: 'Enter a value' },
    precision: { type: Number, default: null },
    label: { type: String, default: null },
    value: { type: Number, default: null },
    unit: { type: String, default: null },
    maximum: { type: Number, default: null },
    minimum: { type: Number, default: null },
    size: { type: String, default: null },
    theme: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    step: { type: Number, default: null },
    to: { type: String, default: null },
    from: { type: String, default: null },
  },
  data() {
    return {
      localValue: this.convertToDisplayValue(this.value),
      focused: false,
    };
  },
  computed: {
    valproxy: {
      get() {
        return this.disabled ? this.convertToDisplayValue(this.value) : this.localValue;
      },
      set(v) {
        this.localValue = v;
        this.$emit('input', this.convertFromDisplayValue(v));
      },
    },
  },
  watch: {
    value() {
      this. localValue= this.convertToDisplayValue(this.value);
    },
  },
  methods: {
    convertToDisplayValue(v) {
      let value = null;
      if (!this.isNumber(v)) value = v;
      if (this.unit) value = convertFromSI(v, this.unit);
      if (this.from && this.to) value = convert(v, this.from, this.to);
      if (value === null) value = Number(v);
      return (this.precision === null) ? value : parseFloat(value.toFixed(this.precision), 10);
    },
    convertFromDisplayValue(v) {
      let value = null;
      if (!this.isNumber(v)) return v;
      if (this.unit) value = convertToSI(Number(v), this.unit);
      if (this.from && this.to) value = convert(Number(v), this.to, this.from);
      if (value === null) value = Number(v);
      return value;
    },
    isNumber(v) {
      if (v === undefined) return false;
      try {
        Big(v);
        return true;
      } catch (e) {
        return false;
      }
    },
    handleBlur() {
      this.localValue = this.isNumber(this.localValue)
        ? Number(this.localValue)
        : this.localValue;
      this.focused = false;
      this.$emit('blur');
    },
    up() {
      if (this.disabled) return;
      try {
        this.valproxy = Big(this.valproxy).plus(Big(this.step));
      } catch {
        this.valproxy = 0;
      }
    },
    down() {
      if (this.disabled) return;
      try {
        this.valproxy = Big(this.valproxy).minus(Big(this.step));
      } catch {
        this.valproxy = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';

.numeric-input {
  ::v-deep input {
    text-align: right;
    &::placeholder {
      text-align: left;
    }
  }
  .unit {
    + .stepper {
      margin-left: 8px;
    }
  }
  .stepper {
    &.disabled .up-icon, &.disabled .down-icon {
      cursor: not-allowed;
      background: $color-gray-05;
      &:hover {
        background: $color-gray-05;
      }
    }
    .up-icon, .down-icon {
      .icon {
        height: 0.5rem;
        width: 11px;
      }
      color: $color-black;
      border: 1px solid $color-gray-04;
      background: $color-white;
      font-family: $font-monospace;
      user-select: none;
      line-height: 0.5rem;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: $color-gray-04;
      }
    }
    .up-icon {
      margin-top: 3px;
      border-radius: 5px 5px 0px 0px;
      border-bottom: none;
    }
    .down-icon {
      border-radius: 0px 0px 5px 5px;
      border-top: none;
      margin-bottom: 3px;
    }
  }
}


</style>
