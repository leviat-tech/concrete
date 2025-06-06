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
    }"
  >
    <Combobox
      as="div"
      class="concrete__autocomplete"
      v-model="displayValue"
      :disabled="disabled"
      v-slot="{ open }"
    >
      <div :class="['h-full relative', disabledClass]">
        <div class="inline-flex w-full cursor-default text-left" :class="inputColorClass">
          <CInputAffix v-if="prefix" type="prefix" v-html="prefix" />
          <slot name="prefix" class="z-10" />
          <ComboboxInput
            :id="id"
            ref="inputRef"
            @change="searchValue = $event.target.value"
            @click="$event.target.select()"
            @blur="$emit('blur')"
            @focus="$emit('focus')"
            :disabled="disabled"
            :placeholder="placeholder"
            :class="[
              inputStaticClasses,
              mergedSizeClass,
              bgColorClass,
              inputColorClass,
              roundedClass,
            ]"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center z-30 pr-2"
            v-if="showButtons"
          >
            <ChevronUpDownIcon class="w-5" :class="iconColorClass" />
          </ComboboxButton>
          <CInputAffix v-if="suffix" type="suffix" v-html="suffix" />
          <slot name="suffix" class="z-10" />
        </div>
        <transition
          enter-from-class="transition opacity-0 duration-150 ease-in -translate-y-4"
          leave-to-class="transition opacity-0 duration-150"
          enter-to-class="ease-in duration-300 ease-out opacity-100 translate-y-0"
          name="listbox"
        >
        <ComboboxOptions
          class="
            absolute
            mt-1
            w-full
            bg-white
            shadow-lg
            py-1
            text-base
            ring-1 ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
            sm:text-sm
          "
          :class="open ? 'z-30' : 'z-10'"
          >
            <div
              v-if="filteredOptions.length === 0 && searchValue !== ''"
              class="cursor-default select-none relative py-2 pl-3 pr-9 z-20"
              :class="textSizeClass"
            >
              {{ props.searchFailedMessage }}
            </div>

            <ComboboxOption
              v-for="option in filteredOptions"
              :key="option.key"
              :value="option.value"
              v-slot="{ active }"
            >
              <li
                :class="[
                  active ? 'bg-base-50' : 'text-base-900',
                  textSizeClass,
                ]"
                class="cursor-default select-none relative py-2 pl-3 pr-9 z-20"
              >
                {{ option.key }}
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </transition>
      </div>
    </Combobox>
  </component>
</template>

<script setup>
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid';

import { computed, ref } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from '@headlessui/vue';

import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import CInputAffix from '../InputAffix/InputAffix.vue';
import {
  colorProp,
  formElementProps,
  useSizeProp,
} from '../../composables/props';
import { inputStaticClasses, useInputClasses, useRoundedClass } from '../../composables/styles';
import { useConcreteForms } from "../../composables/forms.js";
import { useEventHandler } from '../../composables/events.js';
import { isPlainObject } from 'lodash-es';

const props = defineProps({
  ...formElementProps,
  showButtons: { type: Boolean, default: false },
  id: { type: String, default: null },
  modelValue: [String, Object, Array],
  color: colorProp,
  size: useSizeProp(),
  options: {
    type: Array,
    default(rawProps) {
      return [];
    },
  },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Select option' },
  formatter: { type: Function, default: null },
  searchFailedMessage: { type: String, default: 'No Options match the search' },
  transparent: { type: Boolean, default: false },
  listSize: { type: Number, default: 5 },
  onChange: { type: Function, default: null },
  onFocus: { type: Function, default: null },
  onBlur: { type: Function, default: null },
});

const {
  getNoWrapValue,
  getInputValue,
  registerInput,
  getSizeValue,
  getStackedValue,
} = useConcreteForms();

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur']);

const inputRef = ref(null);
const stacked = getStackedValue(props.stacked);
const wrap = !getNoWrapValue(props);
const isDirty = ref(false);
const localValue = ref('');
const searchValue = ref('');

const {
  mergedSizeClass,
  inputColorClass,
  bgColorClass,
  disabledClass,
  textSizeClass,
} = useInputClasses(props);
const roundedClass = useRoundedClass(props);

const displayValue = computed({
  get() {
    const val = getInputValue(props);
    return props.formatter ? props.formatter(val) : val;
  },
  set(value) {
    isDirty.value = true;
    localValue.value = value;
    emit('update:modelValue', value);
    onChange();
  },
});

const localOptions = computed(() => {
  return props.options.map((o) => {
    const opt = isPlainObject(o) ? o : { key: o, value: o };
    return props.formatter ? { ...opt, key: props.formatter(opt.value) } : opt;
  });
});

const onChange = useEventHandler('change', props, emit, localValue, isDirty);

const size = getSizeValue(props.size);
const hPaddingClass = {
  xs: 'pl-3 pr-6',
  sm: 'pl-3 pr-8',
  md: 'pl-3 pr-10',
  lg: 'pl-3 pr-12',
}[size];

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

const filteredOptions = computed(() => {
  return searchValue.value === ''
    ? localOptions.value.slice(0, props.listSize)
    : localOptions.value
        .filter((option) => {
          return option.key
            .toLowerCase()
            .includes(searchValue.value.toLowerCase());
        })
        .slice(0, props.listSize);
});

registerInput(props, inputRef);
</script>
