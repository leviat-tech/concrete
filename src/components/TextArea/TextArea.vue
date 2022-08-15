<template>
  <component
    :is="formElement ? CFormElement : CFragment"
    v-bind="{ id, label, size, color, labelFormatter, message }"
  >
    <div class="flex w-full">
      <slot name="prefix" class="z-10" />
      <textarea
        ref="inputRef"
        :id="id"
        :rows="rows"
        v-model="value"
        type="text"
        class="
          relative
          truncate
          z-20
          w-full
          h-auto
          border
          text-left
          pl-3
          pr-3
          focus:outline-none
          focus:ring-1
          focus:border-indigo-light
          focus:ring-indigo-light
        "
        :class="[sizeClass, colorClass, disabledClass, cursorClass, bgColor]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        @keydown.enter="onEnter"
        @blur="onBlur"
      />
      <slot name="suffix" class="z-10" />
    </div>
  </component>
</template>

<script setup>
import { computed, ref } from 'vue';
import {
  colorProp,
  formElementProps,
  useSizeProp,
} from '../../composables/props.js';
import { useInputColorClassValue } from '../../composables/styles.js';
import { useSizeValue } from '../../composables/forms';
import { useEventHandler } from '../../composables/events.js';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';

const props = defineProps({
  ...formElementProps,

  id: { type: String, default: null },
  modelValue: String,
  color: colorProp,
  size: useSizeProp(),
  disabled: { type: Boolean, default: false },
  readOnly: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  transparent: { type: Boolean, default: false },

  onEnter: { type: Function, default: null },
  onBlur: { type: Function, default: null },
  rows: { type: Number, default: 10 },
});

const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

const formElement = props.isFormElement || !!props.label;
const isDirty = ref(false);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    isDirty.value = true;
    emit('update:modelValue', value);
  },
});

const size = useSizeValue(props.size);
const sizeClass = {
  xs: 'h-6 text-xs py-0.5',
  sm: 'h-8 text-sm py-1',
  md: 'h-10 text-base py-2',
  lg: 'h-12 text-lg py-2',
}[size];

const cursorClass = props.disabled ? 'cursor-not-allowed' : 'cursor-text';
const bgColor = props.transparent ? 'bg-transparent' : 'bg-white';
const colorClass = useInputColorClassValue(props.color);
const disabledClass = computed(() => {
  return props.disabled && 'opacity-60';
});

const onEnter = useEventHandler('enter', props, emit, value, isDirty);
const onBlur = useEventHandler('blur', props, emit, value, isDirty);

const inputRef = ref(null);
const focus = () => inputRef.value.focus();
const blur = () => inputRef.value.blur();

defineExpose({
  focus,
  blur,
});
</script>
