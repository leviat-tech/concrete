<template>
  <component
    :is="wrap ? CFormElement : CFragment"
    v-bind="{
      id,
      label,
      size,
      color,
      disabled,
      labelFormatter,
      message,
      stacked,
      noLabel,
      tooltip,
      overrideCssStyles,
    }"
    :class="inputColorClass"
  >
    <div
      class="flex w-full relative concrete__numeric-input"
      :class="[inputColorClass, disabledClass]"
    >
      <CInputAffix v-if="prefix" type="prefix" v-html="prefix" />
      <slot name="prefix" class="z-10" />
      <input
        ref="inputRef"
        :id="id"
        v-model="value"
        v-bind="$attrs"
        type="number"
        class="border-inherit"
        :class="[
          inputStaticClasses,
          mergedSizeClass,
          disabledClass,
          cursorClass,
          bgColorClass,
          inputSpinnerClass,
          roundedClass,
          overrideCssStyles,
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        :step="step"
        :min="minimum"
        :max="maximum"
        @keydown.enter="onEnter"
        @blur="onBlur"
        @change.prevent="onChange($event)"
      />
      <div
        v-if="!noUnits"
        :class="[
          'absolute inset-y-0 z-20 right-0 flex items-center pointer-events-none font-normal opacity-70',
          paddingClass,
        ]"
      >
        <!-- unit -->
        <div v-if="to || unit" class="unit" :class="[textSizeClass, hPaddingClass]">
          {{ to || unit }}
        </div>
      </div>
      <CInputAffix v-if="suffix" type="suffix" v-html="suffix" />
      <slot name="suffix" class="z-10" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { AvailableUnits, convert, convertFromSI, convertToSI, isNumber } from '../../utils/units.ts';
import { computed, inject, ref } from 'vue';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import CInputAffix from '../InputAffix/InputAffix.vue';
import { formElementProps } from '../../composables/props.js';
import {
  useInputClasses,
  inputStaticClasses,
  useCursorClass,
  useRoundedClass,
} from '../../composables/styles';
import { useConcreteForms } from '../../composables/forms';
import { useEventHandler } from '../../composables/events';
import FormElementProps from '../../types/FormElementProps';

const { decimalPrecision } = inject('concrete');

interface Props extends FormElementProps {
  to?: string;
  unit?: AvailableUnits;
  step?: number;
  from?: string;
  maximum?: number;
  minimum?: number;
  spinner?: boolean;
  noUnits?: boolean;
  precision?: number;
  readOnly?: boolean;
  nullable?: boolean;
  unitSystem?: string;
  modelValue?: number | null;
  placeholder?: string;
  transparent?: boolean;
  overrideCssStyles?: string;
  onBlur?: (val: number) => void;
  onEnter?: (val: number) => void;
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  unitSystem: 'metric',
});

const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

const {
  getSizeValue,
  getStackedValue,
  getNoWrapValue,
  getInputValue,
  registerInput,
  getDefaultSpinner,
} = useConcreteForms();

let unitPrecision;
if (decimalPrecision) unitPrecision = decimalPrecision[props.unitSystem].inputPrecision;

const {
  mergedSizeClass,
  hPaddingClass,
  inputColorClass,
  bgColorClass,
  disabledClass,
  textSizeClass,
} = useInputClasses(props);

const roundedClass = useRoundedClass(props);

const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);
const wrap = !getNoWrapValue(props);

const isDirty = ref(false);
const inputRef = ref(null);

const sanitizeInput = (val) => {
  if (val === '') {
    let sanitized = 0;
    if (props.minimum) sanitized = props.minimum;
    if (props.nullable) sanitized = null;
    return sanitized;
  }
  return val;
};

const value = computed({
  get() {
    const val = getInputValue(props);
    const converted = convertToDisplayValue(val);
    return converted;
  },
  set(value) {
    let newValue = sanitizeInput(value);
    newValue = convertFromDisplayValue(newValue);

    if (localValue.value === newValue) return;
    localValue.value = newValue;
    isDirty.value = true;
    emit('update:modelValue', newValue);
  },
});

const localValue = ref(value.value);

const onChange = (event) => {
  const sanitized = sanitizeInput(event.target.value);
  event.target.value = sanitized;
  return sanitized;
};

const onEnter = useEventHandler('enter', props, emit, localValue, isDirty);
const onBlur = useEventHandler('blur', props, emit, localValue, isDirty);

const blur = () => inputRef.value.blur();
const focus = () => inputRef.value.focus();
const select = () => inputRef.value.select();
defineExpose({ focus, blur, select });

function convertToDisplayValue(v) {
  if (v === undefined || v === null || v === '') return null;

  let value = null;
  if (!isNumber(v)) value = v;
  if (props.unit) value = convertFromSI(v, props.unit);
  if (props.from && props.to) value = convert(v, props.from, props.to);
  if (value === null) value = Number(v);

  const precision = props.precision ?? unitPrecision;
  return typeof precision === 'number' ? parseFloat(value.toFixed(precision), 10) : value;
}

function convertFromDisplayValue(v) {
  if (v === undefined || v === null || v === '') return null;

  let value = null;
  if (!isNumber(v)) return v;
  if (props.unit) value = convertToSI(Number(v), props.unit);
  if (props.from && props.to) value = convert(Number(v), props.to, props.from);
  if (value === null) value = Number(v);
  return value;
}

const enableSpinner = typeof props.spinner === 'boolean' ? props.spinner : getDefaultSpinner(props);

const inputSpinnerClass = computed(() => {
  return enableSpinner
    ? ''
    : '[-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none';
});

const cursorClass = useCursorClass(props);
const paddingClass = computed(() => {
  return props.readOnly || props.disabled || !enableSpinner ? '' : 'mr-5';
});

registerInput(props, inputRef);
</script>
