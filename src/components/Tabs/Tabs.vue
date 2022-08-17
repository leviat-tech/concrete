<template>
  <div class="w-full h-full border">
    <TabGroup>
      <CTabList v-if="tabPosition === 'top'">
        <template #labels>
          <CTabLabel>Tab 1</CTabLabel>
          <CTabLabel>Tab 2</CTabLabel>
          <CTabLabel>Tab 3</CTabLabel>
        </template>
      </CTabList>
      <TabPanels>
        <TabPanel class="p-4">Content 1</TabPanel>
        <TabPanel class="p-4">Content 2</TabPanel>
        <TabPanel class="p-4">Content 3</TabPanel>
      </TabPanels>
      <CTabList v-if="tabPosition === 'bottom'" :labels="labels" />
    </TabGroup>
  </div>
</template>

<script setup>
import { TabGroup, TabPanels, TabPanel } from '@headlessui/vue';
import CTabLabel from './CTabLabel.vue';
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
