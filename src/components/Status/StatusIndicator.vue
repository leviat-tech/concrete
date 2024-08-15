<template>
  <div class="flex-none flex items-center justify-center" :class="[colorClass, roundedClass, sizeClass]">
    <Icon v-if="icon" :type="iconType" :class="fillClassMap[status || STATUSES.NO_STATUS]" class="w-full"/>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Icon from '../Icon/Icon.vue';
import STATUSES from './statuses'

const props = defineProps({
  status: {
    type: String,
    default: STATUSES.NO_STATUS,
    validator: (val) => Object.values(STATUSES).includes(val),
  },
  rounded: Boolean,
  icon: Boolean,
});

const bgClassMap = {
  [STATUSES.INFO]: 'bg-blue-500',
  [STATUSES.ERROR]: 'bg-danger',
  [STATUSES.WARNING]: 'bg-warning',
  [STATUSES.NO_STATUS]: 'bg-steel',
  [STATUSES.SUCCESS]: 'bg-success',
};

const fillClassMap = {
  [STATUSES.INFO]: 'fill-blue-500',
  [STATUSES.ERROR]: 'fill-danger',
  [STATUSES.WARNING]: 'fill-warning',
  [STATUSES.NO_STATUS]: 'fill-steel',
  [STATUSES.SUCCESS]: 'fill-success',
}

const iconTypeMap = {
  [STATUSES.INFO]: 'information-solid',
  [STATUSES.ERROR]: 'error-solid',
  [STATUSES.WARNING]: 'warning-solid',
  [STATUSES.NO_STATUS]: 'minus-solid',
  [STATUSES.SUCCESS]: 'check-solid',
}

const sizeClass = computed(() => props.icon ? 'w-5 h-5' : 'w-2 h-2')

const roundedClass = computed(() => {
  return props.rounded || props.icon ? 'rounded-full' : '';
});

const colorClass = computed(() => {
  return props.icon ? '' : bgClassMap[props.status || STATUSES.NO_STATUS];
});

const iconType = computed(() => {
  return props.icon ? iconTypeMap[props.status || STATUSES.NO_STATUS] : '';
})
</script>
