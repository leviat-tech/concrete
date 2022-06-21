<template>
  <Switch
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
        <svg :class="[`h-${sized/2} w-${sized/2} text-gray-400`]" fill="none" viewBox="0 0 12 12">
          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span v-if="displayIcons" :class="[enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']" aria-hidden="true">
        <svg :class="[`h-${sized/2} w-${sized/2} text-${color}`]" fill="currentColor" viewBox="0 0 12 12">
          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
        </svg>
      </span>
    </span>
  </Switch>
</template>


<script setup>
  import { Switch } from '@headlessui/vue';
  import { computed } from 'vue';

  const props = defineProps({
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
  });

  const emit = defineEmits(['update:modelValue']);

  const enabled = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      console.log(value);
      emit('update:modelValue', value)
    }
  });

  const sized = {
    xs: 6,
    sm: 8,
    md: 10,
    lg: 12,
  }[props.size || 'md'];

</script>