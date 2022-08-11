<template>
  <Combobox as="div" v-model="displayValue" :disabled="disabled">
    <div :class="['relative', disabledClass]">
      <div
        class="
          inline-flex
          w-full
          cursor-default
          overflow-hidden
          border
          text-left
          focus:outline-none
          focus:ring-1
          focus:border-indigo-light
          focus:ring-indigo-light
        "
      >
        <ComboboxInput
          @change="searchValue = $event.target.value"
          @click="$event.target.select()"
          autocomplete="off"
          class="w-full"
          :class="[ sizeClass, bgColor]"
        />
      </div>
      <ComboboxOptions
        :class="[
          'absolute z-10 mt-1 w-full bg-white shadow-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm',
        ]"
      >
        <div
          v-if="filteredOptions.length === 0 && searchValue !== ''"
          class="cursor-default select-none relative py-2 pl-3 pr-9"
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
            :class="[active ? 'text-white bg-indigo' : 'text-gray-900']"
            class="cursor-default select-none relative py-2 pl-3 pr-9"
          >
            {{ option.key }}
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/vue";
import { computed, ref, reactive } from "vue";
import { colorProp, useSizeProp } from "../../composables/props";
import {
  useInputColorClassValue,
  useSizeValue,
} from "../../composables/styles.js";
import { useEventHandler } from "../../composables/events.js";
import isPlainObject from "lodash/isPlainObject";

const props = defineProps({
  id: { type: String, default: null },
  modelValue: [String, Object, Array],
  color: colorProp,
  size: useSizeProp(),
  options: {
    type: Array,
      default(rawProps) { return [] },
  },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: "Select option" },
  formatter: { type: Function, default: null },
  searchFailedMessage: { type: String, default: "No Options match the search" },
  transparent: { type: Boolean, default: false },
  listSize: { type: Number, default:5 },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isDirty = ref(false);
const localValue = ref("");
const searchValue = ref("");
const internalValue = ref("");

const displayValue = computed({
  get() {
    return internalValue.value !== '' ? internalValue.value : props.placeholder;
  },
  set(value) {
    isDirty.value = true;
    localValue.value = value;
    internalValue.value = props.formatter ? props.formatter(value) : value
    emit("update:modelValue", value);
    onChange();
  },
});

const localOptions = computed(() => {
  return props.options.map((o) => {
    const opt = isPlainObject(o) ? o : { key: o, value: o };
    return props.formatter ? { ...opt, key: props.formatter(opt.value) } : opt;
  });
});

const onChange = useEventHandler("change", props, emit, localValue, isDirty);

const size = useSizeValue(props.size);
const sizeClass = {
  xs: "h-6 text-xs pl-3 pr-6 py-0.5",
  sm: "h-8 text-sm pl-3 pr-8 py-1",
  md: "h-10 text-base pl-3 pr-10 py-2",
  lg: "h-12 text-lg pl-3 pr-12 py-2",
}[size];

const iconColorClass = computed(() => {
  return {
    default: "text-gray-400",
    indigo: "text-indigo-light",
    sky: "text-sky-light",
    steel: "text-steel-light",
    success: "text-success-light",
    warning: "text-warning-light",
    danger: "text-danger-light",
  }[props.color];
});

const bgColor =  (props.transparent) ? 'bg-transparent' : 'bg-white';

const disabledClass = computed(() => {
  return props.disabled && "opacity-60";
});

const filteredOptions = computed(() => {
  return searchValue.value === ""
    ? localOptions.value.slice(0, props.listSize)
    : localOptions.value.filter((option) => {
        return option.key
          .toLowerCase()
          .includes(searchValue.value.toLowerCase());
      }).slice(0,props.listSize);
});
</script>
