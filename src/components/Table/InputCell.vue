<script setup>
import { computed, defineEmits } from 'vue';
import TextInput from '../TextInput/TextInput.vue'

const emit = defineEmits(['edit'])

const props = defineProps({
  value: String,
  isEditing: Boolean,
  row: Object,
  error: String,
});

const color = computed(() => {
  if (props.error) return 'danger';
  if (props.isEditing) return 'sky';
  return 'default';
})

</script>

<template>
  <text-input
    v-if="isEditing"
    :modelValue="value"
    @update:modelValue="emit('edit', $event)"
    size="sm"
    :color="color"
    :transparent="true"
  />
  <span v-else> {{ value }} </span>
</template>
