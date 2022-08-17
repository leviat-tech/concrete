<template>
  <div class="w-full h-full border">
    <TabGroup>
      <TabList
        v-if="tabPosition === 'top'"
        class="w-full border-b flex CTabsList"
      >
        <Tab
          class="
            w-full
            items-center
            justify-around
            p-4
            hover:bg-gray-100
            border-r
          "
          >Tab 1</Tab
        >
        <Tab
          class="
            w-full
            items-center
            justify-around
            p-4
            hover:bg-gray-100
            border-r
          "
          >Tab 2</Tab
        >
        <Tab
          class="
            w-full
            items-center
            justify-around
            p-4
            hover:bg-gray-100
            border-r
          "
          >Tab 3</Tab
        >
      </TabList>
      <TabPanels>
        <TabPanel class="p-4">Content 1</TabPanel>
        <TabPanel class="p-4">Content 2</TabPanel>
        <TabPanel class="p-4">Content 3</TabPanel>
      </TabPanels>
      <TabList v-if="tabPosition === 'bottom'">
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
    </TabGroup>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

const props = defineProps({
  tabPosition: {
    default: 'top',
    validator(value) {
      // The value must match one of these strings
      return ['top', 'bottom'].includes(value);
    },
  },
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
