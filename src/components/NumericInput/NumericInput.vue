<template>
  <component :is="formElement ? CFormElement : CFragment" v-bind="{ id, label, size, color, labelFormatter, message, stacked }">
    <div class="flex w-full relative concrete__numeric-input">
      <slot name="prefix" class="z-10"/>
      <input
        ref="inputRef"

        :id="id"
        v-model="value"
        v-bind="$attrs" type="number"
        :class="[inputStaticClasses, mergedSizeClass, inputColorClass, disabledClass, cursorClass, bgColorClass]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        :step="step"
        :min="minimum"
        :max="maximum"

        @keydown.enter="onEnter"
        @blur="onBlur"
      >
      <div :class="['absolute inset-y-0 z-30 right-0 flex items-center pointer-events-none', paddingClass]">
        <!-- unit -->
        <div v-if="to || unit" class="unit">{{ to || unit }}</div>
      </div>
      <slot name="suffix" class="z-10">
      </slot>
    </div>
  </component>
</template>

<script setup>
import Big from 'big.js';
import { convert, convertFromSI, convertToSI, isNumber } from '../..//utils/units';
import { computed, inject, ref } from 'vue';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { formElementProps } from '../../composables/props.js';
import { useInputClasses, inputStaticClasses } from '../../composables/styles';
import {
  useSizeValue,
  useStackedValue,
  useFormElementValue,
  useInputValue,
  useRegisterInput
} from '../../composables/forms';
import { useEventHandler } from '../../composables/events';

const props = defineProps({
  ...formElementProps,
  modelValue: Number,
  readOnly: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  transparent: { type: Boolean, default: false },
  precision: { type: Number, default: null },
  unit: { type: String, default: null },
  maximum: { type: Number, default: null },
  minimum: { type: Number, default: null },
  step: { type: Number, default: null },
  to: { type: String, default: null },
  from: { type: String, default: null },
  onEnter: { type: Function, default: null },
  onBlur: { type: Function, default: null },
});

const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

const {
  mergedSizeClass,
  inputColorClass,
  bgColorClass,
  disabledClass,
} = useInputClasses(props);

const size = useSizeValue(props.size);
const stacked = useStackedValue(props.stacked);
const formElement = useFormElementValue(props.label);

const isDirty = ref(false);
const localValue = ref(null);
const inputRef = ref(null);

const value = computed({
  get() {
    const val = useInputValue(props);

    return convertToDisplayValue(val);
  },
  set(value) {
    const newValue = convertToDisplayValue(value);
    if (localValue.value === newValue) return;
    localValue.value = newValue;
    isDirty.value = true;
    emit('update:modelValue', convertFromDisplayValue(value))
  }
});

const onEnter = useEventHandler('enter', props, emit, localValue, isDirty);
const onBlur = useEventHandler('blur', props, emit, localValue, isDirty);
const focus = () => inputRef.value.focus();
const blur = () => inputRef.value.blur();
defineExpose({ focus, blur });

const convertToDisplayValue = (v) => {
  if (v === null || v === '') return null;
  let value = null;
  if (!isNumber(v)) value = v;
  if (props.unit) value = convertFromSI(v, props.unit);
  if (props.from && props.to) value = convert(v, props.from, props.to);
  if (value === null) value = Number(v);
  return (props.precision === null) ? value : parseFloat(value.toFixed(props.precision), 10);
};

const convertFromDisplayValue = (v) => {
  if (v === null || v === '') return null;
  let value = null;
  if (!isNumber(v)) return v;
  if (props.unit) value = convertToSI(Number(v), props.unit);
  if (props.from && props.to) value = convert(Number(v), props.to, props.from);
  if (value === null) value = Number(v);
  return value;
};

const cursorClass = (props.disabled) ? 'cursor-not-allowed' : 'cursor-text';
const paddingClass = (props.readOnly || props.disabled) ? 'pr-3' : 'pr-8';

useRegisterInput(props.id, inputRef);

useRegisterInput(props.id, inputRef);

</script>
