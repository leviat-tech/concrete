<template>
  <component
    :is="wrap ? CFormElement : CFragment"
    v-bind="{ id, label, size, color, labelFormatter, message, stacked, noLabel }"
    :class="inputColorClass"
  >
    <div class="flex w-full concrete__text-input">
      <slot name="prefix" class="z-10"/>
      <input
        ref="inputRef"
        :id="id"
        v-model="value"
        type="text"
        :class="[inputStaticClasses, mergedSizeClass, inputColorClass, disabledClass, cursorClass, bgColorClass ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"

        @keydown.enter="onEnter"
        @blur="onBlur"
      >
      <slot name="suffix" class="z-10"/>
    </div>
  </component>
</template>

<script setup>
import { computed, ref, inject } from 'vue';
import { formElementProps } from '../../composables/props.js';
import { inputStaticClasses, useInputClasses } from '../../composables/styles';
import {
  useSizeValue,
  useStackedValue,
  useNoWrapValue,
  useInputValue,
  useRegisterInput,
} from '../../composables/forms';
import { useEventHandler } from '../../composables/events.js';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';


const props = defineProps({
  ...formElementProps,
  modelValue: String,
  readOnly: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  transparent: { type: Boolean, default: false },
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
const wrap = !useNoWrapValue(props);

const isDirty = ref(false);
const inputRef = ref(null);

const value = computed({
  get() {
    return useInputValue(props);
  },
  set(value) {
    isDirty.value = true;
    emit('update:modelValue', value)
  }
});

const onEnter = useEventHandler('enter', props, emit, value, isDirty);
const onBlur = useEventHandler('blur', props, emit, value, isDirty);
const focus = () => inputRef.value.focus();
const blur = () => inputRef.value.blur();
defineExpose({ focus, blur });

const cursorClass = (props.disabled) ? 'cursor-not-allowed' : 'cursor-text';

useRegisterInput(props, inputRef);

</script>
