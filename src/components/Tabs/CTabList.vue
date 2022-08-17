<template>
  <TabList class="w-full flex CTabsList">
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
// Global style to target slot labels from parent, outside the scope of this component
.CTabsList {
  button {
    border-right-width: 1px;
  }
  button:last-of-type {
    border-right: none;
  }
}
</style>
