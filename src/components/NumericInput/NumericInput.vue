<template>
  <component :is="formElement ? CFormElement : CFragment" v-bind="{ label, size, color, labelFormatter, message }">
    <div class="flex w-full relative">
      <slot name="prefix" class="z-10"/>
      <input
        ref="inputRef"
        
        :id="id"
        v-model="value"
        type="number"
        :class="[
          'block truncate z-20 w-full border text-left px-3 focus:outline-none focus:ring-1 focus:border-indigo-light focus:ring-indigo-light',
          sizeClass, colorClass, disabledClass, cursorClass, bgColor
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        :step="step"
        :min="minimum"
        :max="maximum"
        
        @keydown.enter="$emit('enter')"
        @blur="$emit('blur')"
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
  import { computed, ref, provide } from 'vue';
  import CFormElement from '../FormElement/FormElement.vue';
  import CFragment from '../Fragment/Fragment.vue';

  const props = defineProps({
    id: { type: String, default: null },
    modelValue: Number,
    color: {
      type: String,
      default: 'default',
      validator: (prop) => ['default', 'indigo', 'sky', 'steel', 'success', 'warning', 'danger'].includes(prop),
    },
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['xs', 'sm', 'md', 'lg'].includes(value)
      }
    },
    disabled: { type: Boolean, default: false },
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

    isFormElement: { type: Boolean, default: false },
    label: String,
    labelFormatter: Function,
    message: String,


  });

  const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

  let localValue = ref(null);

  const value = computed({
    get() {
      return convertToDisplayValue(props.modelValue);
    },
    set(value) {
      localValue.value = convertToDisplayValue(value);
      emit('update:modelValue', convertFromDisplayValue(value))
    }
  });

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

  const formElement = computed(() => props.isFormElement || (props.label != null && props.label != ''));


  const sizeClass = {
    xs: 'h-6 text-xs py-0.5',
    sm: 'h-8 text-sm py-1',
    md: 'h-10 text-base py-2',
    lg: 'h-12 text-lg py-2',
  }[props.size];

  const cursorClass = (props.disabled) ? 'cursor-not-allowed' : 'cursor-text';
  
  const bgColor =  (props.transparent) ? 'bg-transparent' : 'bg-white';

  const paddingClass = (props.readOnly || props.disabled) ? 'pr-3' : 'pr-8';

  const colorClass = computed(() => {
    return {
      default: 'border-gray-300 text-black',
      indigo: 'border-indigo-light text-indigo-darkest',
      sky: 'border-sky-light text-sky-darkest',
      steel: 'border-steel-light text-steel-darkest',
      success: 'border-success-light text-success-darkest',
      warning: 'border-warning-light text-warning-darkest',
      danger: 'border-danger-light text-danger-darkest',
    }[props.color];
  });

  const disabledClass = computed(() => {
    return (props.disabled) && 'opacity-60';
  });

  const inputRef = ref(null);

  const focus = () => {
    inputRef.value.focus();
  }

  const blur = () => {
    inputRef.value.blur();
  }

  defineExpose({
    focus,
    blur,
  });

  
  provide('form-element',  {
    elementSize: computed(() => props.size),
    elementColor: computed(() => props.color),
  })

</script>