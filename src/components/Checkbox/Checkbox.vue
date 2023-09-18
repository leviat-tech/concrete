<template>
  <component
    :is="wrap ? CFormElement : CFragment"
    v-bind="{
      id: id ? id : autoId,
      label,
      size,
      color,
      disabled,
      labelFormatter,
      message,
      stacked,
      noLabel,
      expandInput: false,
      labelOrder: reverseLabels ? 1 : 0,
      labelClass,
      tooltip,
      cssClass
    }"
    :class="{ '!justify-start': reverseLabels }"
  >
    <div
      class="concrete__checkbox flex pt-1 px-2"
      :class="[reverseLabels && 'order-1',cssClass]"
    >
      <span class="sr-only">{{ srLabel }}</span>
      <Switch
        ref="switchRef"
        :disabled="disabled"
        :id="id"
        @click="onClick"
        v-model="enabled"
        class="
          items-center
          border border-gray-300
          focus:ring
          focus:outline-none
        "
        :class="[`h-${sized} w-${sized}`, cursorClass, styleClass]"
      >
        <span class="flex justify-center transition-opacity p-[2px]">
          <CheckIcon v-if="enabled" />
        </span>
      </Switch>
    </div>
  </component>
</template>

<script setup>
import { Switch } from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/20/solid';
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
import { v4 as uuidv4 } from 'uuid';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { useCursorClass } from '../../composables/styles.js';

const props = defineProps({
  ...formElementProps,
  modelValue: { type: Boolean, default: undefined },
  transparent: { type: Boolean, default: false },
  srLabel: { type: String, default: 'Switch' },
  onChange: { type: Function, default: null },
  reverseLabels: { type: Boolean, default: false },
  labelClass: String,
  cssClass: String,
});

const autoId = uuidv4();
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

const cursorClass = useCursorClass(props, 'cursor-pointer');
const sized = { xs: 5, sm: 7, md: 10, lg: 12 }[size];

const styleClass = computed(() => {
  const colour = props.color ? props.color : 'default';
  const style = props.transparent ? 'transparent' : colour;
  if (props.disabled) {
    return 'bg-gray-200 text-gray-400';
  } else if (enabled.value) {
    return {
      default: 'bg-indigo text-white focus:ring-indigo-light',
      indigo: 'bg-indigo text-white focus:ring-indigo-light',
      sky: 'bg-sky text-white focus:ring-sky-light',
      steel: 'bg-steel text-white focus:ring-steel-light',
      success: 'bg-success text-white focus:ring-success-light',
      warning: 'bg-warning text-white focus:ring-warning-light',
      danger: 'bg-danger text-white focus:ring-danger-light',
    }[colour];
  } else {
    return {
      transparent: 'bg-transparent focus:ring-indigo-light',
      default: 'bg-white  focus:ring-indigo-light',
      indigo: 'bg-white  focus:ring-indigo-light',
      sky: 'bg-white  focus:ring-sky-light',
      steel: 'bg-white  focus:ring-steel-light',
      success: 'bg-white  focus:ring-success-light',
      warning: 'bg-white  focus:ring-warning-light',
      danger: 'bg-white  focus:ring-danger-light',
    }[style];
  }
});

useRegisterInput(props, switchRef);

const onClick = (_event) => switchRef.value.el.blur();

// The Switch component does not accept an id prop
// so we need to override headless UI's default id
// after the component is mounted
onMounted(() => {
  switchRef.value.el.id = props.id ? props.id : autoId;
});
</script>
