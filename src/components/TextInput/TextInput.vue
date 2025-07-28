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
      class="flex w-full relative concrete__text-input"
      :class="[inputColorClass, disabledClass]"
    >
      <CInputAffix v-if="prefix" type="prefix" v-html="prefix" />
      <slot name="prefix" class="z-10" />

      <input
        ref="inputRef"
        :id="id"
        v-model="value"
        type="text"
        :class="[
          inputStaticClasses,
          mergedSizeClass,
          inputColorClass,
          disabledClass,
          cursorClass,
          bgColorClass,
          roundedClass,
          overrideCssStyles,
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        @keydown.enter="onEnter"
        @blur="onBlur"
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
import { computed, ref } from 'vue';
import { formElementProps } from '../../composables/props.js';
import {
  inputStaticClasses,
  useInputClasses,
  useCursorClass,
  useRoundedClass,
} from '../../composables/styles';
import { useConcreteForms } from '../../composables/forms';
import { useEventHandler } from '../../composables/events.js';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import CInputAffix from '../InputAffix/InputAffix.vue';
import FormElementProps from 'types/FormElementProps.js';
import { AvailableUnits } from 'utils/units.js';

interface Props extends FormElementProps {
  to?: string;
  noUnits?: boolean;
  readOnly?: boolean;
  modelValue?: string;
  placeholder?: string;
  unit?: AvailableUnits;
  transparent?: boolean;
  overrideCssStyles?: string;
  onBlur?: (val: string) => void;
  onEnter?: (val: string) => void;
}
const props = withDefaults(defineProps<Props>(), {
  readOnly: false,
  placeholder: '',
  transparent: false,
});

const { getSizeValue, getStackedValue, getNoWrapValue, getInputValue, registerInput } =
  useConcreteForms();

const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

const {
  mergedSizeClass,
  inputColorClass,
  bgColorClass,
  disabledClass,
  textSizeClass,
  hPaddingClass,
} = useInputClasses(props);
const cursorClass = useCursorClass(props);
const roundedClass = useRoundedClass(props);

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
    emit('update:modelValue', val);
  },
});

const onEnter = useEventHandler('enter', props, emit, localValue, isDirty);
const onBlur = useEventHandler('blur', props, emit, localValue, isDirty);

const blur = () => inputRef.value.blur();
const focus = () => inputRef.value.focus();
const select = () => inputRef.value.select();

defineExpose({ focus, blur, select });

const paddingClass = computed(() => {
  return props.readOnly || props.disabled ? '' : 'mr-5';
});

registerInput(props, inputRef);
</script>
