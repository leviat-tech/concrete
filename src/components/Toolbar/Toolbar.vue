<template>
  <div class="concrete__toolbar flex items-center h-8 space-x-2">
    <slot />
  </div>
</template>

<script setup>
import { computed, provide, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: null },
})

const emit = defineEmits(['update:modelValue'])

const selectedTool = ref(props.modelValue);

const toolId = computed({
  get: () => selectedTool.value,
  set: (val) => {
    selectedTool.value = val;
    emit('update:modelValue', val);
  }
});

provide('concreteSelectedTool', toolId);

watch(() => props.modelValue, (val) => {
  selectedTool.value = val;
})

</script>
