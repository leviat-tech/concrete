<template>
  <TabList class="w-full border-b flex CTabsList">
    <CTabLabel v-for="label in labels">
      {{ label }}
    </CTabLabel>
    <!-- CTabLabel must be used in the template labels slot -->
    <slot name="labels" />
  </TabList>
</template>

<script setup>
import { TabList } from '@headlessui/vue';
import CTabLabel from './CTabLabel.vue';

const props = defineProps({
  labels: { type: Array, default: () => [] },
});
</script>
<style lang="scss" scoped>
.CTabsList {
  // Styling active tab and removing border-right on last tab
  button[aria-selected='true'] {
    font-weight: bold;
    background-color: #f7fafc;
    &:last-of-type {
      border-right: none;
    }
  }
}
</style>
