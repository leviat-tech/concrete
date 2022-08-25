<template>
  <TabGroup as="div">
    <CTabList v-if="tabPosition === 'top'" class="border-b" :labels="labels">
      <!-- CTabLabel must be used in the template labels slot -->
      <slot name="labels" />
    </CTabList>
    <TabPanels class="flex h-full">
      <!-- CTabpanel must be used in the template panels slot -->
      <slot name="panels" />
    </TabPanels>
    <CTabList v-if="tabPosition === 'bottom'" :labels="labels" class="border-t">
      <!-- CTabLabel must be used in the template labels slot -->
      <slot name="labels" />
    </CTabList>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabPanels } from '@headlessui/vue';
import CTabList from './CTabList.vue';

const props = defineProps({
  labels: { type: Array, default: () => [] },
  tabPosition: {
    default: 'top',
    validator(value) {
      // The value must match one of these strings
      return ['top', 'bottom'].includes(value);
    },
  },
});
</script>
