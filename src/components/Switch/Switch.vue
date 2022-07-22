<template>
  <Switch
    :id="id"
    v-model="enabled"
    :class="[ enabled ? `bg-${color}` : `bg-gray-200`,
    `relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer`,
    `transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-light`,
    `h-${sized} w-${sized*2}`
    ]">
    <span class="sr-only">{{srLabel}}</span>
    <span aria-hidden="true" :class="[
      enabled ? `translate-x-${sized}` : 'translate-x-0',
      'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
      `h-${sized-1} w-${sized-1}`,
    ]">
      <span v-if="displayIcons" :class="[enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']" aria-hidden="true">
        <XIcon :class="[`h-${sized/2} w-${sized/2} text-gray-400`]" />
      </span>
      <span v-if="displayIcons" :class="[enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']" aria-hidden="true">
        <CheckIcon :class="[`h-${sized/2} w-${sized/2} text-${color}`]" />
      </span>
    </span>
  </Switch>
</template>


<script setup>
  import { Switch } from '@headlessui/vue';
  import { CheckIcon, XIcon } from '@heroicons/vue/solid';
  import { computed, ref } from 'vue';
  import { useEventHandler } from '../../composables/events.js';

  const props = defineProps({
    id: {
      type: String,
      default: null,
    },
    'modelValue': Boolean,
    'color': {
      type: String,
      default: 'indigo',
      validator: (prop) => ['indigo', 'sky', 'steel', 'success', 'warning', 'danger'].includes(prop),
    },
    'size': {
      type: String,
      default: 'md',
      validator(value) {
        return ['xs', 'sm', 'md', 'lg'].includes(value)
      }
    },
    'srLabel': {
      type: String,
      default: 'Switch',
    },
    'displayIcons':{
      type: Boolean,
      default: false,
    },

    onChange: { type: Function, default: null },
  });

  const emit = defineEmits(['update:modelValue', 'change']);

  const isDirty = ref(false);
  const localValue = ref(null);

  const enabled = computed({
    get() {
      return props.modelValue
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
  }[props.size || 'md'];

</script>
