<template>
  <div class="absolute w-full bottom-0 flex flex-col z-20 concrete__status-bar" :class="`text-${size}`">
    <transition-group
        enter-from-class="opacity-0 translate-y-8"
        enter-active-class="transition-all duration-500"
        move-class="transition-all duration-500"
        leave-active-class="transition-all duration-500 absolute w-full -z-0"
        leave-to-class="opacity-0"
    >
      <div v-for="item, i in items"
          class="flex items-center justify-between mt-4 shadow-lg z-0 cursor-pointer text-white"
          :class="item.classes"
          :key="item.id">
        <div class="flex items-center p-3 flex-1" @click="$emit('click', item.id)">
          <component :is="item.icon" class="flex-none mr-2" :style="{ width: 24, height: 24 }"/>
          <div v-html="item.text"></div>
        </div>
        <button class="ml-8 uppercase p-3" @click="$emit('dismiss', i)">
          <CIcon type="times" size="sm"/>
        </button>
      </div>
    </transition-group>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import logger from '../../utils/logger';
import { InformationCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline';
import CIcon from '../Icon/Icon.vue';

const types = {
  info: {
    icon: InformationCircleIcon,
    classes: 'bg-blue-500', // TODO: add info to leviat tailwind config
  },
  warning: {
    icon: ExclamationTriangleIcon,
    classes: 'bg-warning',
  },
  error: {
    icon: ExclamationCircleIcon,
    classes: 'bg-danger',
  },
}

const props = defineProps({
  messages: Array,
  size: {
    type: String,
    default: 'md',
    validator: (prop) => ['xs', 'sm', 'md', 'lg'].includes(prop)
  }
})

defineEmits(['click', 'dismiss'])

const items = computed(() => {
  return props.messages.map(item => {
    if (item.id === undefined) {
      logger.warn('StatusBar messages must have an id property', item)
    }

    const { icon, classes } = (types[item.type] || types.info);
    return {
      ...item,
      icon,
      classes
    }
  })
})

</script>
