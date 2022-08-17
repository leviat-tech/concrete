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

<style lang="scss">
// Global style to target template labels that are not inside the scope of this template, but the parent
.CTabsList {
  button:last-of-type {
    border-right: none;
  }
}
</style>
