<template>
  <component :is="formElement ? CFormElement : CFragment" v-bind="{ id, label, size, color, labelFormatter, message, stacked, expandInput: false, }">
    <div class="concrete__switch">
      <Switch
        :id="id"
        v-model="enabled"
        class="inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        :class="[bgColorClass, `h-${sized} w-${sized*2}`]">
        <span class="sr-only">{{srLabel}}</span>
        <span aria-hidden="true"
          class="pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          :class="[ enabled ? `translate-x-${sized}` : 'translate-x-0', `h-${sized-1} w-${sized-1}` ]"
        >
          <span v-if="displayIcons"
            class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            :class="[enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200']" aria-hidden="true"
          >
            <XIcon :class="[`h-${sized/2} w-${sized/2} text-gray-400`]" />
          </span>
          <span v-if="displayIcons"
            class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            :class="[enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100']" aria-hidden="true"
          >
            <CheckIcon :class="[`h-${sized/2} w-${sized/2}`, checkIconClass]" />
          </span>
        </span>
      </Switch>
    </div>
  </component>
</template>


<script setup>
import { Switch } from '@headlessui/vue';
import { CheckIcon, XIcon } from '@heroicons/vue/solid';
import { computed, ref, inject } from 'vue';
import { formElementProps } from '../../composables/props.js';
import { useSizeValue, useStackedValue, useFormElementValue, useInputValue } from '../../composables/forms';
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

const emit = defineEmits(['update:modelValue', 'change']);

const size = useSizeValue(props.size);
const stacked = useStackedValue(props.stacked);
const formElement = useFormElementValue(props.label);

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
  }
});

const onChange = useEventHandler('change', props, emit, localValue, isDirty);

const sized = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
}[size];

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

</script>
