<template>
  <transition name="modal">
    <div v-if="show" class="fixed w-full h-full left-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500" @click.self="onClose">
      <div class="concrete-modal max-w-full bg-white rounded shadow duration-300" :class="widthClass">

        <!-- header -->
        <div class="flex items-center justify-between border-b text-lg text-gray-500" :class="{ title }">
          <div class="py-4 px-6">{{ title }}</div>
          <button v-if="closeable" class="p-4 mr-2" @click="onClose">
            <CIcon type="times" />
          </button>
        </div>

        <!-- content -->
        <div class="p-6">
          <slot/>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';
import CIcon from '../Icon/Icon.vue';

const props = defineProps({
  show: { type: Boolean, default: true },
  title: { type: String, default: null, },
  closeable: { type: Boolean, default: true, },
  size: {
    type: String,
    default: 'md',
    validator: (prop) => ['md', 'lg'].includes(prop),
  },
});

const emit = defineEmits(['close']);

const widthClasses = {
  md: 'w-[24rem]',
  lg: 'w-[36rem]',
}

const widthClass = computed(() => {
  return widthClasses[props.size];
})

const onClose = () => {
  if (props.closeable) emit('close');
}
</script>

<style lang="scss">
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .concrete-modal {
  transform: translateY(2rem);
}
</style>