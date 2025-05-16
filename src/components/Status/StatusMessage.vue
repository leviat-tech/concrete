<template>
  <div
    class="flex justify-between items-center w-full bg-base-50 border-l-8 py-1 pl-2 min-h-10"
    :class="[borderClassMap]">
    <div class="flex items-center space-x-2">
      <StatusIndicator :status="cStatus" :icon="showIcon" v-if="showIcon" />
      <div class="mx-2" v-html="content" />
    </div>
    <div class="text-right px-2 text-base-700" v-if="loggedAt">
      <div class="">
        {{  loggedAt.date }}
      </div>
      <div class="">
        {{  loggedAt.time }}
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
type Status = 'danger' | 'warning' | 'info' | 'success' | 'magic' | 'info' | 'unknown' | null;

import STATUSES from './statuses'
import StatusIndicator from './StatusIndicator.vue';

const props = defineProps<{
  status: Status,
  content: { type: String, default: '' },
  timestamp: { type: Number, default: null },
  icon: { type: Boolean, default: true },
}>();

const cStatus = computed(() => (props.status) ? props.status : 'no_status');

const showIcon = computed(() => ['unknown', 'no_status'].includes(cStatus.value) === false )
const borderClassMap = computed(() => {
  return {
    [STATUSES.INFO]: 'border-status-info',
    [STATUSES.MAGIC]: 'border-status-magic',
    [STATUSES.SUCCESS]: 'border-status-success',
    [STATUSES.WARNING]: 'border-status-warning',
    [STATUSES.DANGER]: 'border-status-danger',
    [STATUSES.UNKNOWN]: 'border-status-unknown',
    [STATUSES.NO_STATUS]: 'border-base-100',
  }[cStatus.value]
});

const loggedAt = computed(() => {
  if(props.timestamp) {
    const parsed = new Date(props.timestamp);
    return {
      date: parsed.toLocaleDateString('en-GB', { month: 'short', year: "numeric", day: 'numeric' }),
      time: parsed.toLocaleTimeString(),
    }
  }
  return null;
})

</script>
