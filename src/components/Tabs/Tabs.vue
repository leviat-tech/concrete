<template>
  <div class="border">
    <TabGroup>
      <CTabList v-if="tabPosition === 'top'" class="border-b" :labels="labels">
        <!-- CTabLabel must be used in the template labels slot -->
        <slot name="labels" />
      </CTabList>
      <TabPanels class="flex h-full">
        <!-- CTabpanel must be used in the template panels slot -->
        <slot name="panels" />
        <CTabPanel>Hello 1</CTabPanel>
        <CTabPanel>Hello 2</CTabPanel>
        <CTabPanel>
          tab content 2 Sed ut perspiciatis unde omnis iste natus error sit
          voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
          ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur? ab content 2 Sed
          ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
          quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
          eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
          ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
          velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
          fugiat quo voluptas nulla pariatur?</CTabPanel
        >
      </TabPanels>
      <CTabList
        v-if="tabPosition === 'bottom'"
        :labels="labels"
        class="border-t"
      >
        <!-- CTabLabel must be used in the template labels slot -->
        <slot name="labels" />
      </CTabList>
    </TabGroup>
  </div>
</template>

<script setup>
import { TabGroup, TabPanels, TabPanel } from '@headlessui/vue';
import CTabList from './CTabList.vue';
import CTabPanel from './CTabPanel.vue';

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
