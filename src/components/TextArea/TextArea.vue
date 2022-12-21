<template>
  <component
    :is="wrap ? CFormElement : CFragment"
    v-bind="{ id, label, size, color, labelFormatter, message, stacked, noLabel }"
  >
    <div class="flex w-full" :class="colorClass">
      <CInputAffix v-if="prefix" type="prefix">{{ prefix }}</CInputAffix>
      <slot name="prefix" class="z-10"/>
      <textarea
        ref="inputRef"
        :id="id"
        :rows="rows"
        v-model="value"
        type="text"
        class="h-auto"
        :class="[inputStaticClasses, mergedSizeClass, paddingYClass, inputColorClass, disabledClass, cursorClass, bgColorClass]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        @keydown.enter="onEnter"
        @blur="onBlur"
      />
      <CInputAffix v-if="suffix" type="suffix">{{ suffix }}</CInputAffix>
      <slot name="suffix" class="z-10"/>
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
import {
  useStackedValue,
  useNoWrapValue,
  useRegisterInput,
  useInputValue, useSizeValue
} from '../../composables/forms';

import {
  useInputColorClassValue,
  inputStaticClasses,
  useInputClasses,
  useCursorClass
} from '../../composables/styles.js';
import { useEventHandler } from '../../composables/events.js';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import CInputAffix from '../InputAffix/InputAffix.vue';

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

const stacked = useStackedValue(props.stacked);
const wrap = !useNoWrapValue(props);
const isDirty = ref(false);

const {
  mergedSizeClass,
  inputColorClass,
  bgColorClass,
  disabledClass,
} = useInputClasses(props);
const cursorClass = useCursorClass(props);
const colorClass = useInputColorClassValue(props);

const value = computed({
  get() {
    return useInputValue(props);
  },
  set(value) {
    isDirty.value = true;
    emit('update:modelValue', value);
  },
});

const size = useSizeValue(props.size);
const paddingYClass = {
  xs: 'py-0.5',
  sm: 'py-1',
  md: 'py-2',
  lg: 'py-2',
}[size];

const onEnter = useEventHandler('enter', props, emit, value, isDirty);
const onBlur = useEventHandler('blur', props, emit, value, isDirty);

const inputRef = ref(null);
const focus = () => inputRef.value.focus();
const blur = () => inputRef.value.blur();

defineExpose({
  focus,
  blur,
});

useRegisterInput(props, inputRef);
</script>
