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
    }"
    :class="inputColorClass"
  >
    <div class="flex w-full" :class="[colorClass, disabledClass]">
      <CInputAffix v-if="prefix" type="prefix" v-html="prefix" />
      <slot name="prefix" class="z-10" />
      <textarea
        ref="inputRef"
        :id="id"
        :rows="rows"
        v-model="value"
        type="text"
        class="h-auto"
        :class="[
          localInputStaticClasses,
          mergedSizeClass,
          paddingYClass,
          inputColorClass,
          disabledClass,
          cursorClass,
          bgColorClass,
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        @keydown.enter="onEnter"
        @blur="onBlur"
      />
      <CInputAffix v-if="suffix" type="suffix" v-html="suffix" />
      <slot name="suffix" class="z-10" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  useInputColorClassValue,
  useInputClasses,
  useCursorClass,
} from '../../composables/styles.js';
import CFragment from '../Fragment/Fragment.vue';
import FormElementProps from '../../types/FormElementProps';
import CFormElement from '../FormElement/FormElement.vue';
import { useConcreteForms } from '../../composables/forms';
import { useEventHandler } from '../../composables/events.js';

interface Props extends FormElementProps {
  rows: number;
  modelValue?: any;
  readOnly: boolean;
  placeholder: string;
  onEnter: (val: string) => void;
  onBlur: (val: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  readOnly: false,
  placeholder: '',
});

const { getStackedValue, getNoWrapValue, registerInput, getInputValue, getSizeValue } =
  useConcreteForms();

const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

const stacked = getStackedValue(props.stacked);
const wrap = !getNoWrapValue(props);
const isDirty = ref(false);
const localValue = ref('');

const { mergedSizeClass, inputColorClass, bgColorClass, disabledClass } = useInputClasses(props);
const cursorClass = useCursorClass(props);
const colorClass = useInputColorClassValue(props);
const localInputStaticClasses =
  'block z-20 w-full border font-normal text-left focus:outline-none focus:ring-1 focus:border-brand-700 hover:border-base-600 rounded-input';

const value = computed({
  get() {
    return getInputValue(props);
  },
  set(val) {
    localValue.value = val;
    isDirty.value = true;
    emit('update:modelValue', val);
  },
});

const size = getSizeValue(props.size);
const paddingYClass = {
  xs: 'py-0.5',
  sm: 'py-1',
  md: 'py-2',
  lg: 'py-2',
}[size];

const onEnter = useEventHandler('enter', props, emit, localValue, isDirty);
const onBlur = useEventHandler('blur', props, emit, localValue, isDirty);

const inputRef = ref(null);
const blur = () => inputRef.value.blur();
const focus = () => inputRef.value.focus();
const select = () => inputRef.value.select();

defineExpose({ focus, blur, select });

registerInput(props, inputRef);
</script>
