<template>
  <div
    class="flex-none flex items-center justify-center"
    :class="[colorClass, roundedClass, sizeClass]"
  >
    <Icon
      v-if="icon && iconType != null"
      :type="iconType"
      :class="fillClassMap[status || STATUSES.NO_STATUS]"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../Icon/Icon.vue';
import STATUSES from './statuses';

interface Props {
  status?: typeof STATUSES[keyof typeof STATUSES];
  rounded?: boolean;
  icon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  status: STATUSES.NO_STATUS,
});

const bgClassMap = {
  [STATUSES.INFO]: 'bg-status-info',
  [STATUSES.MAGIC]: 'bg-status-magic',
  [STATUSES.DANGER]: 'bg-status-danger',
  [STATUSES.WARNING]: 'bg-status-warning',
  [STATUSES.NO_STATUS]: 'bg-status-unknown',
  [STATUSES.SUCCESS]: 'bg-status-success',
};

const fillClassMap = {
  [STATUSES.INFO]: 'fill-status-info',
  [STATUSES.MAGIC]: 'fill-status-magic',
  [STATUSES.DANGER]: 'fill-status-danger',
  [STATUSES.WARNING]: 'fill-status-warning',
  [STATUSES.NO_STATUS]: 'fill-status-unknown',
  [STATUSES.SUCCESS]: 'fill-status-success',
};

const iconTypeMap = {
  [STATUSES.INFO]: 'information-solid',
  [STATUSES.MAGIC]: 'bolt-solid',
  [STATUSES.DANGER]: 'error-solid',
  [STATUSES.WARNING]: 'warning-solid',
  [STATUSES.SUCCESS]: 'check-solid',
};

const sizeClass = computed(() => (props.icon ? 'w-5 h-5' : 'w-2 h-2'));

const roundedClass = computed(() => {
  return props.rounded || props.icon ? 'rounded-full' : '';
});

const colorClass = computed(() => {
  return props.icon ? '' : bgClassMap[props.status || STATUSES.NO_STATUS];
});

const iconType = computed(() => {
  return props.icon ? iconTypeMap[props.status || STATUSES.NO_STATUS] : '';
});
</script>
