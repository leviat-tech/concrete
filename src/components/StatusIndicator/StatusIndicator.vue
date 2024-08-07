<template>
  <div class="w-2 h-2 mr-2 ml-1" :class="statusClass" />
</template>

<script setup>
import { computed } from 'vue';
import ENTITY_STATUSES from './statuses'

const props = defineProps({
  status: {
    type: String,
    default: ENTITY_STATUSES[0],
    validator: (val) => [...ENTITY_STATUSES].includes(val),
  },
});

const statusClass = computed(() => {
  const statusClasses = {
    no_solution: 'bg-danger',
    approved: 'bg-success-light',
    not_calculated: 'bg-steel',
  };

  return statusClasses[props.status || ENTITY_STATUSES[0]];
});
</script>
