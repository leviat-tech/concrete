<template>
  <component
    class="relative z-50"
    :is="formElement ? CFormElement : CFragment"
    v-bind="{ id, label, size, color, labelFormatter, message, stacked }"
  >
  
    <Combobox as="div" class="concrete__autocomplete" v-model="displayValue" :disabled="disabled">
      <div :class="['relative', disabledClass]">
        
        <div
          class="
            inline-flex
            w-full
            cursor-default
            text-left
          "
        >
          <slot name="prefix" class="z-10"/>
          <ComboboxInput
            ref="inputRef"
            @change="searchValue = $event.target.value"
            @click="$event.target.select()"
            @blur="onBlur"
            @focus="onFocus"
            autocomplete="off"
            :class="[inputStaticClasses, mergedSizeClass, hPaddingClass, bgColorClass, inputColorClass]"
          />
          <slot name="suffix" class="z-10"/>
        </div>
        <ComboboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
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
              :class="[active ? 'text-white bg-indigo' : 'text-gray-900', textSizeClass]"
              class="cursor-default select-none relative py-2 pl-3 pr-9 z-20"
            >
              {{ option.key }}
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
  </component>
</template>

<script setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from '@headlessui/vue';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { computed, ref, reactive } from 'vue';
import { colorProp, formElementProps, useSizeProp } from '../../composables/props';
import { inputStaticClasses, useInputClasses } from '../../composables/styles';
import {
  useFormElementValue,
  useInputValue,
  useRegisterInput,
  useSizeValue,
  useStackedValue
} from '../../composables/forms.js';
import { useEventHandler } from '../../composables/events.js';
import { isPlainObject } from 'lodash-es';

const props = defineProps({
  ...formElementProps,

  id: { type: String, default: null },
  modelValue: [String, Object, Array],
  color: colorProp,
  size: useSizeProp(),
  options: {
    type: Array,
      default(rawProps) { return [] },
  },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Select option' },
  formatter: { type: Function, default: null },
  searchFailedMessage: { type: String, default: 'No Options match the search' },
  transparent: { type: Boolean, default: false },
  listSize: { type: Number, default:5 },
  onChange: { type: Function, default: null },
  onFocus: { type: Function, default: null },
  onBlur: { type: Function, default: null },
});

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur']);

const inputRef = ref(null);
const stacked = useStackedValue(props.stacked);
const formElement = useFormElementValue(props.label);
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

const displayValue = computed({
  get() {
    const val = useInputValue(props);

    if (!val) return props.placeholder;

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
const onFocus = useEventHandler('focus', props, emit, localValue, isDirty);
const onBlur = useEventHandler('blur', props, emit, localValue, isDirty);

const size = useSizeValue(props.size);
const hPaddingClass = {
  xs: 'pl-3 pr-6',
  sm: 'pl-3 pr-8',
  md: 'pl-3 pr-10',
  lg: 'pl-3 pr-12',
}[size];

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

const filteredOptions = computed(() => {
  return searchValue.value === ''
    ? localOptions.value.slice(0, props.listSize)
    : localOptions.value.filter((option) => {
        return option.key
          .toLowerCase()
          .includes(searchValue.value.toLowerCase());
      }).slice(0,props.listSize);
});

useRegisterInput(props, inputRef);
</script>
