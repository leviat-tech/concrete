<template>
  <component
    class="relative"
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
      optionsClass,
    }"
  >
    <div
      class="inline-flex items-center bg-white border border-base-300 rounded-input"
      :class="[textSizeClass, disabledClass]"
    >
      <RadioGroup
        class="concrete__radiogroup"
        v-model="value"
        ref="el"
        :disabled="disabled"
        :class="layoutClass"
      >
        <RadioGroupOption v-for="option in opts" :key="option" :value="option" v-slot="{ checked }">
          <div class="flex cursor-pointer p-1 select-none" :class="[optionsClass]">
            <span class="self-center grow text-right" :class="[inputColorClass, labelClasses]">
              {{ props.formatter ? props.formatter(option) : option }}</span
            >
            <svg
              :class="[iconSizeClass, svgColour, reverseLabels ? 'order-1' : '']"
              class="self-center"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="5" stroke-width="0.75" fill="none" />
              <transition enter-from-class="scale-0" leave-to-class="scale-0">
                <circle
                  class="transition origin-center"
                  cx="10"
                  cy="10"
                  r="3.5"
                  stroke="none"
                  v-if="checked"
                />
              </transition>
            </svg>
          </div>
        </RadioGroupOption>
      </RadioGroup>
    </div>
  </component>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { computed, ref } from 'vue';
import { useInputClasses } from '../../composables/styles';
import { useConcreteForms } from '../../composables/forms.js';
import { useEventHandler } from '../../composables/events.js';
import FormElementProps from 'types/FormElementProps';

interface Props extends FormElementProps {
  columns?: number;
  modelValue?: any;
  options: Array<string>
  reverseLabels?: boolean;
  optionsClass?: string | object;
  formatter?: () => {};
  onChange?: (val: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  columns: 0,
});

const {
  getNoWrapValue,
  getInputValue,
  registerInput,
  getStackedValue,
  getInputIdToOptions,
  getSizeValue,
} = useConcreteForms();

const value = computed({
  get() {
    return getInputValue(props);
  },
  set(value) {
    isDirty.value = true;
    localValue.value = value;
    emit('update:modelValue', value);
    onChange();
  },
});

const isDirty = ref(false);
const localValue = ref(null);
const el = ref(null);

const size = getSizeValue(props.size);
const optionsClass = props.optionsClass;

const emit = defineEmits(['update:modelValue', 'change']);
const onChange = useEventHandler('change', props, emit, localValue, isDirty);
registerInput(props, el);

const stacked = getStackedValue(props.stacked);
const wrap = !getNoWrapValue(props);

const { inputColorClass, disabledClass, textSizeClass, heightClass } = useInputClasses(props);

const iconSizeClass = size === 'xs' ? 'w-6 h-6' : heightClass;

const layoutClass = computed(() => {
  if (props.columns > 0) return `grid grid-flow-row grid-cols-${props.columns}`;
  return `flex flex-wrap justify-end ${props.reverseLabels ? '' : 'px-1'}`;
});

const colour = props.color ? props.color : 'default';
const svgColour = computed(() => {
  return {
    default: 'fill-base-800 stroke-base-800',
    info: 'fill-info-500 stroke-info-500',
    magic: 'fill-magic-500 stroke-magic-500',
    success: 'fill-success-500 stroke-success-500',
    warning: 'fill-warning-500 stroke-warning-500',
    danger: 'fill-danger-500 stroke-danger-500',
  }[colour];
});

const labelClasses = computed(() => {
  if (!props.reverseLabels) return;
  return 'order-2 !ml-0 mr-2';
});

const opts = computed(() => getInputIdToOptions(props));
</script>
