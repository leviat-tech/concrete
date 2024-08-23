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
      overrideCssStyles
    }"
    :class="inputColorClass"
  >
    <div class="flex w-full h-full concrete__text-input" :class="[inputColorClass, disabledClass]">
      <CInputAffix v-if="prefix" type="prefix" v-html="prefix" />
      <slot name="prefix" class="z-10"/>

      <input
        ref="inputRef"
        :id="id"
        v-model="value"
        type="text"
        :class="[inputStaticClasses, mergedSizeClass, inputColorClass, disabledClass, cursorClass, bgColorClass,
          overrideCssStyles ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"

        @keydown.enter="onEnter"
        @blur="onBlur"
      >
      <CInputAffix v-if="suffix" type="suffix" v-html="suffix" />
      <slot name="suffix" class="z-10"/>
    </div>
  </component>
</template>

<script setup>
import { computed, ref } from 'vue';
import { formElementProps } from '../../composables/props.js';
import { inputStaticClasses, useInputClasses, useCursorClass } from '../../composables/styles';
import { useConcreteForms } from '../../composables/forms';
import { useEventHandler } from '../../composables/events.js';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import CInputAffix from '../InputAffix/InputAffix.vue';

const props = defineProps({
  ...formElementProps,
  modelValue: String,
  readOnly: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  transparent: { type: Boolean, default: false },
  onEnter: { type: Function, default: null },
  onBlur: { type: Function, default: null },
  overrideCssStyles: { type: String},
});

const {
  getSizeValue,
  getStackedValue,
  getNoWrapValue,
  getInputValue,
  registerInput,
} = useConcreteForms();

const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

const {
  mergedSizeClass,
  inputColorClass,
  bgColorClass,
  disabledClass,
} = useInputClasses(props);
const cursorClass = useCursorClass(props);


const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);
const wrap = !getNoWrapValue(props);

const isDirty = ref(false);
const inputRef = ref(null);
const localValue = ref('');

const value = computed({
  get() {
    return getInputValue(props);
  },
  set(val) {
    localValue.value = val;
    isDirty.value = true;
    emit('update:modelValue', val)
  }
});

const onEnter = useEventHandler('enter', props, emit, localValue, isDirty);
const onBlur = useEventHandler('blur', props, emit, localValue, isDirty);

const blur = () => inputRef.value.blur();
const focus = () => inputRef.value.focus();
const select = () => inputRef.value.select();

defineExpose({ focus, blur, select });

registerInput(props, inputRef);

</script>
