<template>
  <button :title="name"
    class="flex items-center justify-center h-8 p-1 border border-transparent rounded concrete__tool"
    :class="[
      !disabled && hoverable && !isActive && 'hover:border-gray-300',
      (isActive || mousedown) && !disabled && 'border-gray-400 bg-gray-500 bg-opacity-5',
      disabled && 'text-gray-400 cursor-default',
      textButton && 'px-2' || 'w-8',
    ]"
    @mousedown="mousedown = true"
    @mouseup="mousedown = false"
    @mouseleave="mousedown = false"
    @click="onClick"
  >
    <template v-if="textButton">{{ name }}</template>
    <CIcon v-else-if="icon" :type="icon"/>
    <slot v-else/>
  </button>

</template>

<script setup>
import { computed, inject, ref } from 'vue'
import CIcon from '../Icon/Icon.vue';

const props = defineProps({
  name: { type: String, default: '' },
  toolId: { type: String, required: true },
  icon: { type: String, default: null },
  textButton: { type: Boolean, default: false },
  stateful: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  hoverable: { type: Boolean, default: true },
});

const emit = defineEmits(['click']);

const selectedTool = inject('concreteSelectedTool');
const isActive = computed(() => selectedTool.value === props.toolId);
const mousedown = ref(false);

const onClick = () => {
  if (props.disabled) return;

  if (props.stateful) {
    selectedTool.value = props.toolId;
  }

  emit('click', props.toolId);
}
</script>
