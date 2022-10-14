<template>
  <transition name="modal">
    <div v-if="show"
      class="fixed w-full h-full left-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 p-4"
      @click.self="onClose" @keydown.esc="onClose" aria-modal="true" role="dialog">
      <div class="concrete-modal max-w-full bg-white rounded shadow duration-300 ellipsis overflow-auto max-h-full"
        :class="widthClass">

        <!-- header -->
        <div class="flex items-center justify-between border-b text-lg text-gray-500" :class="{ title }">
          <div class="py-4 px-6">{{ title }}</div>
          <button v-if="closeable" class="p-4 mr-2" @click="onClose" @focus="focusModal"
            @keydown.tab.prevent="focusModal" ref="modal" @keydown.esc="onClose">
            <CIcon type="times" size="sm" />
          </button>
        </div>

        <!-- content -->
        <div class="p-6">
          <slot />
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
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

const modal = ref(null)

watch(() => props.show, (showValue) => {
  if (showValue) {
    nextTick(() => {
      focusModal();
    });
  }
});


const focusModal = () => {
  modal.value.focus()
};

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

<style>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .concrete-modal {
  transform: translateY(2rem);
}
</style>
