<template>
  <TabGroup>
    <TabList>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Content 1</TabPanel>
      <TabPanel>Content 2</TabPanel>
      <TabPanel>Content 3</TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup>
import { computed, ref, inject } from 'vue';
import { formElementProps } from '../../composables/props.js';
import { useInputColorClassValue } from '../../composables/styles';
import {
  useSizeValue,
  useStackedValue,
  useFormElementValue,
} from '../../composables/forms';
import { useEventHandler } from '../../composables/events.js';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

const props = defineProps({
  ...formElementProps,
  modelValue: String,
  readOnly: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  transparent: { type: Boolean, default: false },
  onEnter: { type: Function, default: null },
  onBlur: { type: Function, default: null },
});

const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

const size = useSizeValue(props.size);
const stacked = useStackedValue(props.stacked);
const formElement = useFormElementValue(props.label);

const isDirty = ref(false);
const inputRef = ref(null);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    isDirty.value = true;
    emit('update:modelValue', value);
  },
});

const onEnter = useEventHandler('enter', props, emit, value, isDirty);
const onBlur = useEventHandler('blur', props, emit, value, isDirty);
const focus = () => inputRef.value.focus();
const blur = () => inputRef.value.blur();
defineExpose({ focus, blur });

const sizeClass = {
  xs: 'h-6 text-xs py-0.5',
  sm: 'h-8 text-sm py-1',
  md: 'h-10 text-base py-2',
  lg: 'h-12 text-lg py-2',
}[size];

const cursorClass = props.disabled ? 'cursor-not-allowed' : 'cursor-text';
const bgColor = props.transparent ? 'bg-transparent' : 'bg-white';
const colorClass = useInputColorClassValue(props.color);
const disabledClass = computed(() => {
  return props.disabled && 'opacity-60';
});
</script>
