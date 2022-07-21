<template>
  <div class="flex w-full relative">
    <slot name="prefix" class="z-10"/>
    <input
      ref="inputRef"

      :id="id"
      v-model="value"
      v-bind="$attrs"
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
</template>

<script setup>
  import Big from 'big.js';
  import { convert, convertFromSI, convertToSI, isNumber } from '../..//utils/units';
  import { computed, inject, ref } from 'vue';
  import { colorProp, useSizeProp } from '../../composables/props';
  import { useSizeValue, useInputColorClassValue } from '../../composables/styles';

  const concrete = inject('concrete');
  const globalHandler = concrete.inputHandler;

  const props = defineProps({
    id: { type: String, default: null },
    modelValue: Number,
    color: colorProp,
    size: useSizeProp(),
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

    onEnter: { type: Function, default: null },
    onBlur: { type: Function, default: null },
  });

  const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

  const localValue = ref(null);

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

  const size = useSizeValue(props.size);
  const sizeClass = {
    xs: 'h-6 text-xs py-0.5',
    sm: 'h-8 text-sm py-1',
    md: 'h-10 text-base py-2',
    lg: 'h-12 text-lg py-2',
  }[size];

  const cursorClass = (props.disabled) ? 'cursor-not-allowed' : 'cursor-text';
  const bgColor =  (props.transparent) ? 'bg-transparent' : 'bg-white';
  const paddingClass = (props.readOnly || props.disabled) ? 'pr-3' : 'pr-8';
  const colorClass = useInputColorClassValue(props.color);
  const disabledClass = computed(() => {
    return (props.disabled) && 'opacity-60';
  });

  const inputRef = ref(null);

  const onEnter = () => {
    if (props.onEnter || !globalHandler) {
      return emit('enter', localValue.value)
    }

    globalHandler(props.id, localValue.value);
  }

  const onBlur = () => {
    if (props.onBlur || !globalHandler) {
      return emit('blur', localValue.value)
    }

    globalHandler(props.id, localValue.value);
  }

  const focus = () => inputRef.value.focus();

  const blur = () => inputRef.value.blur();

  defineExpose({
    focus,
    blur,
  });

</script>
