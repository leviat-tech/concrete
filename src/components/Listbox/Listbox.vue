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
          <div
            class="relative z-0 inline-flex w-full items-center"
            :class="inputColorClass"
          >
            <CInputAffix v-if="prefix" type="prefix">{{ prefix }}</CInputAffix>
            <slot name="prefix" class="z-10" />
            <ListboxButton
              ref="buttonRef"
              :id="id"
              :class="[
                inputStaticClasses,
                bgColorClass,
                inputColorClass,
                mergedSizeClass,
                cursorClass,
              ]"
              class="!flex items-center"
            >
              <slot name="buttonPrefix" />
              <span
                class="block-truncate"
                :class="selectedLabel || 'text-gray-400'"
              >
                {{ selectedLabel || placeholder }}
              </span>

              <span
                class="
                  absolute
                  inset-y-0
                  right-0
                  flex
                  items-center
                  pr-2
                  pointer-events-none
                "
              >
                <ChevronUpDownIcon
                  :class="[iconColorClass, iconSizeClass]"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <input type="hidden" :value="selectedLabel" data-selected />
            <CInputAffix v-if="suffix" type="suffix">{{ suffix }}</CInputAffix>
            <slot name="suffix" class="z-10" />
          </div>
        </div>

        <transition
          enter-from-class="opacity-0 -mt-4"
          leave-to-class="opacity-0"
          name="listbox"
        >
          <ListboxOptions
            class="
              transition-all
              mt-1
              duration-200
              absolute
              z-30
              w-full
              bg-white
              shadow-lg
              outline-none
              overflow-y-auto
            "
            :class="[optionsSizeClass, maxOptionsHeightClass]"
          >
            <ListboxOption
              as="template"
              v-for="option in localOptions"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
              v-slot="{ active, selected }"
              :class="selectedValue === option.value ? 'bg-steel-light' : ''"
            >
              <li
                :class="[
                  option.disabled
                    ? 'text-opacity-50'
                    : 'cursor-pointer hover:bg-gray-50',
                  'select-none relative py-2 px-3 text-black',
                ]"
              >
                <div
                  class="truncate flex items-center"
                  :class="selected ? 'font-semibold' : 'font-normal'"
                >
                  <slot
                    v-if="$slots.optionPrefix"
                    name="optionPrefix"
                    :option="option"
                  />
                  {{ option.label }}
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </component>
</template>

<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';
import { isPlainObject, isEqual } from 'lodash-es';
import { formElementProps } from '../../composables/props.js';
import {
  useInputColorClassValue,
  inputStaticClasses,
  useInputClasses,
  useCursorClass,
} from '../../composables/styles.js';
import {
  useNoWrapValue,
  useSizeValue,
  useStackedValue,
  useInputValue,
  useRegisterInput,
  useInputIdToOptions,
} from '../../composables/forms.js';
import { useEventHandler } from '../../composables/events.js';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import CInputAffix from '../InputAffix/InputAffix.vue';

const props = defineProps({
  ...formElementProps,
  modelValue: [String, Object, Array, Number],
  options: {
    type: Array,
    default(rawProps) {
      return [];
    },
  },
  multiple: { type: Boolean, default: false },
  formatter: { type: Function, default: null },
  placeholder: { type: String, default: 'Select option' },
  transparent: { type: Boolean, default: false },
  optionListSize: {
    type: String,
    default: 'md',
    validator(value) {
      return ['auto', 'xs', 'sm', 'md', 'lg'].includes(value);
    },
  },
  onChange: { type: Function, default: null },
});

const emit = defineEmits(['update:modelValue', 'change']);

const { mergedSizeClass, inputColorClass, bgColorClass } =
  useInputClasses(props);
const disabledClass = computed(() => isDisabled.value && 'opacity-60');
const cursorClass = computed(() =>
  isDisabled.value ? 'cursor-not-allowed' : 'cursor-pointer'
);

const size = useSizeValue(props.size);
const stacked = useStackedValue(props.stacked);
const wrap = !useNoWrapValue(props);

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
  },
});

const isDisabled = computed(() => {
  return props.disabled || !localOptions.value.length;
});

const onChange = useEventHandler('change', props, emit, localValue, isDirty);
const focus = () => {
  buttonRef.value.$el.focus();
};
defineExpose({ focus });

const localOptions = computed(() => {
  const options = useInputIdToOptions(props);

  return options.map((option) => {
    const opt = isPlainObject(option)
      ? option
      : { label: option, value: option };
    return props.formatter
      ? { ...opt, label: props.formatter(opt.label || opt.value) }
      : opt;
  });
});

const selectedLabel = computed(() => {
  let sv = selectedValue.value;

  if (!props.multiple) {
    if (isPlainObject(sv)) {
      return props.formatter ? props.formatter(sv) : sv;
    }
    sv = [selectedValue.value];
  }
  const labels = sv
    .filter((selectedItem) => selectedItem != null)
    .map((selectedItem) => {
      return localOptions.value.find((option) => {
        return isEqual(option.value, selectedItem);
      })?.label;
    });

  return labels.join(', ');
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
