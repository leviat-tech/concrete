<template>
  <div class="concrete-toolbar flex items-center h-8 p-1 min-h-12">
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

if (props.modelValue) {
  watch(props.modelValue, (val) => {
    selectedTool.value = val;
  })
}

</script>
