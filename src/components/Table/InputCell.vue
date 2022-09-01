<script setup>
defineProps({
  value: String,
  isEditing: Boolean,
  row: Object,
  error: String,
});

const emit = defineEmits(['edit'])
</script>

<template>
  <input
    class="border-b border-blue-500 bg-transparent text-blue-500 outline-none"
    :class="{ 'text-red-500 border-red-500': error }"
    v-if="isEditing"
    :value="value"
    @input="(e) => emit('edit', e.target.value)"
  />
  <span v-else :class="{ 'text-red-500': error }"> {{ value }} </span>
</template>