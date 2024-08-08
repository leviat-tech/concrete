<template>
  <div class="w-2 h-2 mr-2 ml-1" :class="statusClass" />
</template>

<script setup>
import { computed } from 'vue';
import STATUSES from './statuses'

const props = defineProps({
  status: {
    type: String,
    default: STATUSES.NO_STATUS,
    validator: (val) => Object.values(STATUSES).includes(val),
  },
});

const statusClass = computed(() => {
  const statusClasses = {
    [STATUSES.ERROR]: 'bg-danger',
    [STATUSES.WARNING]: 'bg-warning',
    [STATUSES.NO_STATUS]: 'bg-steel',
    [STATUSES.SUCCESS]: 'bg-success',
  };

  return statusClasses[props.status || STATUSES.NO_STATUS];
});
</script>
