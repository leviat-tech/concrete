<script setup>
defineProps({
  value: [String, Number],
  isEditing: Boolean,
  row: Object,
  error: String,
});

const emit = defineEmits(['edit', 'update'])
</script>

<template>
  <slot v-if="$slots.default" />
  <input
    v-else-if="isEditing"
    class="border-x-0 bg-transparent outline-none"
    :class="{ 'text-red-500 border-red-500': error }"
    :value="value"
    :type="typeof value === 'number' ? 'number' : 'text'"
    @input="(e) => emit('edit', e.target.value)"
    @blur="$emit('update')"
    @keydown.enter="$emit('update')"
  />
  <div v-else :class="{ 'text-red-500': error }" class="border-b border-transparent"> {{ value }} </div>
</template>