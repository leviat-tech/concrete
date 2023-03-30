<template>
  <component
    class="relative"
    :is="wrap ? CFormElement : CFragment"
    v-bind="{
      id,
      label,
      size,
      color,
      labelFormatter,
      message,
      stacked,
      noLabel,
    }"
  >
    <div
      class="flex bg-steel-lightest p-0.5 w-full border border-steel"
      :class="[textSizeClass, disabledClass]"
    >
      <RadioGroup
        class="concrete__radiogroup"
        v-model="value"
        ref="el"
        :disabled="disabled"
        :class="layoutClass"
      >
        <RadioGroupOption
          v-for="option in options"
          :key="option"
          :value="option"
          v-slot="{ checked }"
        >
          <div class="flex cursor-pointer mr-4">
            <span
              class="ml-2 self-center grow text-right"
              :class="[inputColorClass, labelClasses]"
            >
              {{ props.formatter ? props.formatter(option) : option }}</span
            >
            <svg
              :class="[
                heightClass,
                svgColour,
                reverseLabelOrder ? 'order-1' : '',
              ]"
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

<script setup>
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { computed, ref } from 'vue';
import { formElementProps } from '../../composables/props';
import { useInputClasses } from '../../composables/styles';
import {
  useNoWrapValue,
  useInputValue,
  useRegisterInput,
  useStackedValue,
} from '../../composables/forms.js';
import { useEventHandler } from '../../composables/events.js';

const props = defineProps({
  ...formElementProps,
  modelValue: [String, Object, Array],
  options: { type: Array },
  formatter: { type: Function, default: null },
  transparent: { type: Boolean, default: false },
  columns: { type: Number, default: 0 },
  onChange: { type: Function, default: null },
  reverseLabelOrder: { type: Boolean, default: false },
});

const value = computed({
  get() {
    return useInputValue(props);
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

const emit = defineEmits(['update:modelValue', 'change']);
const onChange = useEventHandler('change', props, emit, localValue, isDirty);
useRegisterInput(props, el);

const stacked = useStackedValue(props.stacked);
const wrap = !useNoWrapValue(props);

const { inputColorClass, disabledClass, textSizeClass, heightClass } =
  useInputClasses(props);

const layoutClass = computed(() => {
  if (props.columns > 0) return `grid grid-flow-row grid-cols-${props.columns}`;

  return 'flex flex-wrap justify-end';
});

const svgColour = computed(() => {
  return props.color
    ? 'stroke-' + props.color + ' fill-' + props.color
    : 'stroke-black fill-black';
});

const labelClasses = computed(() => {
  if (!props.reverseLabelOrder) return;
  return 'order-2 !ml-0 mr-2';
});
</script>
