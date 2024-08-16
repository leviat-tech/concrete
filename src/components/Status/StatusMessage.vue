<template>
  <div
    class="flex items-center justify-between border-l-8 pl-2 pr-4 py-1.5 bg-steel-lightest text-sm text-gray-600"
    :class="borderClassMap[status || STATUSES.NO_STATUS]">
    <div class="flex items-center">
      <StatusIndicator :status="status" icon/>
      <div class="mx-2">{{ text }}</div>
    </div>
    <slot />
  </div>
</template>

<script setup>
import STATUSES from './statuses'
import StatusIndicator from './StatusIndicator.vue';

const props = defineProps({
  status: {
    type: String,
    default: STATUSES.NO_STATUS,
    validator: (val) => Object.values(STATUSES).includes(val),
  },
  text: String,
});

const borderClassMap = {
  [STATUSES.INFO]: 'border-blue-500',
  [STATUSES.ERROR]: 'border-danger',
  [STATUSES.WARNING]: 'border-warning',
  [STATUSES.NO_STATUS]: 'border-steel',
  [STATUSES.SUCCESS]: 'border-success',
};

</script>
