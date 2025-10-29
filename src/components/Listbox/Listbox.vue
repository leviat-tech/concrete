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
  >
    <Listbox
      as="div"
      v-model="selectedValue"
      :disabled="isDisabled"
      :multiple="multiple"
      v-slot="{ open }"
      class="concrete__listbox"
    >
      <div :class="['relative', disabledClass]">
        <div class="inline-flex w-full">
          <div class="relative z-0 inline-flex w-full" :class="inputColorClass">
            <CInputAffix v-if="prefix" type="prefix" v-html="prefix" />
            <slot name="prefix" class="z-10" />
            <ListboxButton
              ref="buttonRef"
              :id="id"
              :class="[
                inputStaticClasses,
                bgColorClass,
                mergedSizeClass,
                cursorClass,
                roundedClass,
                'border-base-500',
                open && 'border-entity-active',
              ]"
              class="!flex items-center pr-8"
            >
              <slot name="buttonPrefix" />
              <span class="block-truncate" :class="selectedLabel">
                {{ selectedLabel || placeholder }}
              </span>

              <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon :class="[iconColorClass, iconSizeClass]" aria-hidden="true" />
              </span>
            </ListboxButton>
            <input type="hidden" :value="selectedLabel" data-selected />
            <CInputAffix v-if="suffix" type="suffix" v-html="suffix" />
            <slot name="suffix" class="z-10" />
          </div>
        </div>

        <transition
          enter-from-class="opacity-0 mt-0 mb-0"
          leave-to-class="opacity-0"
          name="listbox"
        >
          <ListboxOptions
            class="
              transition-all
              duration-100
              absolute
              z-30
              bg-white
              shadow-lg shadow-base-600
              ring-1 ring-base-300
              overflow-y-auto
              rounded-input
            "
            :class="[optionsSizeClass, maxOptionsHeightClass, getOptionsClass(), optionListWidth]"
          >
            <ListboxOption
              as="template"
              v-for="option in localOptions"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
              :class="option.class"
              v-slot="{ active, selected }"
            >
              <li
                :class="[
                  option.disabled ? 'text-opacity-50' : 'cursor-pointer',
                  'select-none relative py-2 px-3 text-black',
                  active && 'bg-base-50',
                ]"
              >
                <div
                  class="truncate flex items-center"
                  :class="selected ? 'font-semibold' : 'font-normal'"
                >
                  <!-- Support for custom option slot -->
                  <slot
                    v-if="$slots.option"
                    name="option"
                    :option="option"
                    :active="active"
                    :selected="selected"
                  />
                  <template v-else>
                    <slot v-if="$slots.optionPrefix" name="optionPrefix" :option="option" />
                    {{ formatter(option.label || option.value) }}
                  </template>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { isPlainObject, isEqual } from 'lodash-es';
import { ChevronUpDownIcon } from '@heroicons/vue/24/solid';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';

import CFragment from '../Fragment/Fragment.vue';
import CInputAffix from '../InputAffix/InputAffix.vue';
import CFormElement from '../FormElement/FormElement.vue';
import FormElementProps from '../../types/FormElementProps';
import { useConcreteForms } from '../../composables/forms.js';
import { useEventHandler } from '../../composables/events.js';
import { inputStaticClasses, useInputClasses, useRoundedClass } from '../../composables/styles.js';

export interface Option {
  label: string;
  value: any;
  disabled?: boolean;
  class?: string;
}

interface Props extends FormElementProps {
  options: Option[] | string[];

  modelValue?: any;
  multiple?: boolean;
  placeholder?: string;
  transparent?: boolean;
  onChange?: (val: any) => {};
  formatter?: (val: string) => void;
  checkEquality?: (a: any, b: any) => boolean;
  optionListSize?: 'auto' | 'xs' | 'sm' | 'md' | 'lg';
  optionListWidth?: 'auto' | 'w-full' | 'w-min' | 'w-max';
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  optionListSize: 'md',
  checkEquality: isEqual,
  optionListWidth: 'w-full',
  placeholder: 'Select option',
});

const {
  getNoWrapValue,
  getSizeValue,
  getStackedValue,
  getInputValue,
  registerInput,
  getInputIdToOptions,
} = useConcreteForms();

const emit = defineEmits(['update:modelValue', 'change']);

const { mergedSizeClass, inputColorClass, bgColorClass } = useInputClasses(props);
const roundedClass = useRoundedClass(props);
const disabledClass = computed(() => isDisabled.value && 'opacity-60');
const cursorClass = computed(() => (isDisabled.value ? 'cursor-not-allowed' : 'cursor-pointer'));

const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);
const wrap = !getNoWrapValue(props);

const isDirty = ref(false);
const localValue = ref(null);
const buttonRef = ref(null);

const formatter = (value) => {
  return props.formatter ? props.formatter(value) : value;
};

const selectedValue = computed({
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

const getOptionFromValue = (value) => {
  const item = localOptions.value.find((option) => {
    return props.checkEquality(option.value, value);
  });

  return formatter(item?.label);
};

const isDisabled = computed(() => {
  return props.disabled || !localOptions.value.length;
});

const onChange = useEventHandler('change', props, emit, localValue, isDirty);
const focus = () => {
  buttonRef.value.$el.focus();
};
defineExpose({ focus });

const localOptions = computed(() => {
  const options = getInputIdToOptions(props);

  return options.map((option) => {
    return isPlainObject(option) ? option : { label: option, value: option };
  });
});

const selectedLabel = computed(() => {
  let sv = selectedValue.value;

  if (!props.multiple) {
    return getOptionFromValue(sv);
  }

  const arrVal = Array.isArray(sv) ? sv : [sv];
  return arrVal
    .filter((selectedItem) => selectedItem != null)
    .map(getOptionFromValue)
    .join(', ');
});

const optionsSizeClass = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}[size];

const iconSizeClass = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}[size];

const maxOptionsHeightClass = {
  auto: '',
  xs: 'max-h-28',
  sm: 'max-h-44',
  md: 'max-h-60',
  lg: 'max-h-96',
}[props.optionListSize || 'md'];

const iconColorClass = computed(() => {
  return {
    default: 'text-base-600',
    info: 'text-status-info',
    magic: 'text-status-magic',
    success: 'text-status-success',
    warning: 'text-status-warning',
    danger: 'text-status-danger',
  }[props.color];
});

function getOptionsClass() {
  const el = buttonRef.value?.el;

  if (!el) return;

  const screenHeight = window.innerHeight;
  const elPostionOnScreen = el.getBoundingClientRect().top;
  const isOptionsBelowInput = elPostionOnScreen > screenHeight / 2;

  return isOptionsBelowInput ? 'bottom-full mb-1' : 'top-full mt-1';
}

registerInput(props, buttonRef);
</script>
