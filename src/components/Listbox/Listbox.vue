<template>
  <component :is="formElement ? CFormElement : CFragment" v-bind="{ id, label, size, color, labelFormatter, message, stacked }">
    <Listbox
      as="div"
      :id="id"
      v-model="selectedValue"
      :disabled="disabled"
      :multiple="multiple"
      v-slot="{ open }"
      class="concrete__listbox"
    >
      <div :class="['relative', disabledClass]">
        <div class="inline-flex  w-full">
          <div class="relative z-0 inline-flex w-full">
            <slot name="prefix" class="z-10"/>
            <ListboxButton ref="buttonRef" :class="[inputStaticClasses, bgColorClass, inputColorClass, hPaddingClass, mergedSizeClass, cursorClass ]">
              <span :class="selectedLabelClass">{{ selectedLabel }}</span>
              <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon :class="[iconColorClass, iconSizeClass]" aria-hidden="true" />
              </span>
            </ListboxButton>
            <slot name="suffix" class="z-10" />
          </div>
        </div>

        <div v-show="open">
          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions
              static
              class="absolute z-30 mt-1 w-full bg-white shadow-lg py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
              :class="[optionsSizeClass, maxOptionsHeightClass]"
            >
              <ListboxOption
                as="template"
                v-for="option in localOptions"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
                v-slot="{ active, selected }"
              >
                <li :class="[active ? 'text-white bg-indigo' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-8']">
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                    {{ option.label }}
                  </span>

                  <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </div>
    </Listbox>
  </component>
</template>

<script setup>

import { Listbox, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue';
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
import { computed, ref, inject } from 'vue';
import { isPlainObject } from 'lodash-es';
import { formElementProps } from '../../composables/props.js';
import { useInputColorClassValue, inputStaticClasses, useInputClasses } from '../../composables/styles.js';
import {
  useFormElementValue,
  useSizeValue,
  useStackedValue,
  useInputValue,
  useRegisterInput
} from '../../composables/forms.js';
import { useEventHandler } from '../../composables/events.js';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';

const props = defineProps({
  ...formElementProps,
  modelValue: [String, Object, Array],
  options: {
    type: Array,
    default(rawProps) { return [] },
  },
  multiple: { type: Boolean, default: false },
  formatter: { type: Function, default: null },
  placeholder: { type: String, default: 'Select option' },
  transparent: { type: Boolean, default: false },
  optionListSize: {
    type: String,
    default: 'md',
    validator(value) {
      return ['auto', 'xs', 'sm', 'md', 'lg'].includes(value)
    }
  },
  onChange: { type: Function, default: null },
});

const emit = defineEmits(['update:modelValue', 'change']);

const {
  mergedSizeClass,
  inputColorClass,
  bgColorClass,
  disabledClass,
} = useInputClasses(props);

const size = useSizeValue(props.size);
const stacked = useStackedValue(props.stacked);
const formElement = useFormElementValue(props.label);

const isDirty = ref(false);
const localValue = ref(null);
const buttonRef = ref(null);

const selectedValue = computed({
  get() {
    return useInputValue(props);
  },
  set(value) {
    isDirty.value = true;
    localValue.value = value;
    emit('update:modelValue', value);
    onChange();
  }
});

const onChange = useEventHandler('change', props, emit, localValue, isDirty);
const focus = () => {  buttonRef.value.$el.focus(); }
defineExpose({ focus });

const localOptions = computed(() => {
  return props.options.map((o) => {
    const opt = isPlainObject(o) ? o : { label: o, value: o };
    return props.formatter ? { ...opt, label: props.formatter(opt.value) } : opt;
  });
});

const selectedLabel = computed(() => {
  let sv = selectedValue.value
  if(!props.multiple) {
    sv = [selectedValue.value];
  }
  const labels = sv.filter((s) => s != null).map((s) => localOptions.value.find((o) => o.value === s)?.label);
  const label = labels.join(', ');
  return (label.length > 0) ? label : props.placeholder;
});

const selectedLabelClass = computed(() => {
  let sv = selectedValue.value
  if(!props.multiple) {
    sv = [selectedValue.value];
  }
  const labels = sv.filter((s) => s != null).map((s) => localOptions.value.find((o) => o.value === s)?.label);
  const label = labels.join(', ');
  return (label.length > 0) ? 'block truncate' : 'block truncate text-gray-400';
});

const hPaddingClass = {
  xs: 'pl-3 pr-6',
  sm: 'pl-3 pr-8',
  md: 'pl-3 pr-10',
  lg: 'pl-3 pr-12',
}[size];

const optionsSizeClass = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}[size]

const iconSizeClass = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}[size];

const cursorClass = (props.disabled) ? 'cursor-not-allowed' : 'cursor-default';

const maxOptionsHeightClass = {
  auto: '',
  xs: 'max-h-28',
  sm: 'max-h-44',
  md: 'max-h-60',
  lg: 'max-h-96',
}[props.optionListSize || 'md'];

const iconColorClass = computed(() => {
  return {
    default: 'text-gray-400',
    indigo: 'text-indigo-light',
    sky: 'text-sky-light',
    steel: 'text-steel-light',
    success: 'text-success-light',
    warning: 'text-warning-light',
    danger: 'text-danger-light',
  }[props.color];
});

useRegisterInput(props, buttonRef);

</script>
