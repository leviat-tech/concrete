<template>
  <component
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
      expandInput: false,
    }"
  >
    <div class="concrete__checkbox flex">
      <span class="sr-only">{{ srLabel }}</span>
      <Switch
        ref="switchRef"
        :disabled="disabled"
        :id="id"
        v-model="enabled"
        class="items-center border border-gray-300"
        :class="[`h-${sized} w-${sized}`, cursorClass, bgColor]"
      >
        <span class="flex items-center justify-center transition-opacity">
          <CheckIcon v-if="enabled" :class="checkIconClass" />
        </span>
      </Switch>
    </div>
  </component>
</template>

<script setup>
import { Switch } from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/solid';
import { computed, onMounted, ref } from 'vue';
import { useEventHandler } from '../../composables/events.js';
import { formElementProps } from '../../composables/props.js';
import {
  useNoWrapValue,
  useInputValue,
  useRegisterInput,
  useSizeValue,
  useStackedValue,
} from '../../composables/forms';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { useCursorClass } from '../../composables/styles.js';

const props = defineProps({
  ...formElementProps,
  modelValue: { type: Boolean, default: undefined },
  transparent: { type: Boolean, default: false },
  srLabel: { type: String, default: 'Switch' },
  onChange: { type: Function, default: null },
});

const emit = defineEmits(['update:modelValue', 'change']);

const size = useSizeValue(props.size);
const stacked = useStackedValue(props.stacked);
const wrap = !useNoWrapValue(props);

const switchRef = ref(null);
const isDirty = ref(false);
const localValue = ref(null);

const enabled = computed({
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

const onChange = useEventHandler('change', props, emit, localValue, isDirty);

const bgColor = props.transparent ? 'bg-transparent' : 'bg-white';
const cursorClass = useCursorClass(props, 'cursor-pointer');
const disabledClass = computed(() => props.disabled && 'opacity-60');
const sized = { xs: 4, sm: 6, md: 8, lg: 10 }[size];

const checkIconClass = computed(() => {
  return {
    default: 'text-indigo',
    indigo: 'text-indigo',
    sky: 'text-sky',
    steel: 'text-steel',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  }[props.color];
});

useRegisterInput(props, switchRef);

// The Switch component does not accept an id prop
// so we need to override headless UI's default id
// after the component is mounted
onMounted(() => {
  switchRef.value.el.id = props.id;
});
</script>
