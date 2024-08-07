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
      expandInput: false,
      tooltip,
    }"
  >
    <div class="concrete__switch">
      <Switch
        ref="switchRef"
        v-model="enabled"
        class="inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        :class="[bgColorClass, switchSizeClass]">
        <span class="sr-only">{{srLabel}}</span>
        <span aria-hidden="true"
          class="pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          :class="[ dotSizeClass, dotTranslateClass ]"
        >
          <span v-if="displayIcons"
            class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            :class="[enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200']" aria-hidden="true"
          >
            <XMarkIcon class="text-gray-400" :class="iconSizeClass" />
          </span>
          <span v-if="displayIcons"
            class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            :class="[enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100']" aria-hidden="true"
          >
            <CheckIcon :class="[iconSizeClass, checkIconClass]" />
          </span>
        </span>
      </Switch>
    </div>
  </component>
</template>


<script setup>
import { Switch } from '@headlessui/vue';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import { computed, ref, inject, onMounted } from 'vue';
import { formElementProps } from '../../composables/props.js';
import { useConcreteForms } from '../../composables/forms';
import { useEventHandler } from '../../composables/events.js';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';

const props = defineProps({
  ...formElementProps,
  modelValue: { type: Boolean, default: undefined },
  srLabel: { type: String, default: 'Switch' },
  displayIcons:{ type: Boolean, default: false },
  onChange: { type: Function, default: null },
});

const {
  getSizeValue,
  getStackedValue,
  getNoWrapValue,
  getInputValue,
  registerInput
} = useConcreteForms();

const emit = defineEmits(['update:modelValue', 'change']);

const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);
const wrap = !getNoWrapValue(props);

const switchRef = ref(null);
const isDirty = ref(false);
const localValue = ref(null);

const enabled = computed({
  get() {
    return getInputValue(props);
  },
  set(value) {
    isDirty.value = true;
    localValue.value = value;
    emit('update:modelValue', value);
    onChange();
  }
});

const onChange = useEventHandler('change', props, emit, localValue, isDirty);

const switchSizeClass = {
  xs: 'h-4 w-6',
  sm: 'h-6 w-10',
  md: 'h-8 w-14',
  lg: 'h-10 w-[4.5rem]'
}[size];

const dotSizeClass = {
  xs: 'h-3 w-3',
  sm: 'h-5 w-5',
  md: 'h-7 w-7',
  lg: 'h-9 w-9',
}[size];

const iconSizeClass = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}[size];

const dotTranslateClass = computed(() => {
  if(!enabled.value) return 'translate-x-0';
  return {
    xs: 'translate-x-2',
    sm: 'translate-x-4',
    md: 'translate-x-6',
    lg: 'translate-x-8',
  }[size];
});

const bgColorClass = computed(() => {
  if(!enabled.value) return 'bg-gray-300';
  return {
    default: 'bg-indigo focus:ring-indigo-light',
    indigo: 'bg-indigo focus:ring-indigo-light',
    sky: 'bg-sky focus:ring-sky-light',
    steel: 'bg-steel focus:ring-steel-light',
    success: 'bg-success focus:ring-success-light',
    warning: 'bg-warning focus:ring-warning-light',
    danger: 'bg-danger focus:ring-danger-light',
  }[props.color];
});

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

registerInput(props, switchRef);

// The Switch component does not accept an id prop
// so we need to override headless UI's default id
// after the component is mounted
onMounted(() => {
  switchRef.value.el.id = props.id;
})

</script>
