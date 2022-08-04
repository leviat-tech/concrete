<template>
<Disclosure as="div" v-slot="{ open }">
  <DisclosureButton class="w-full text-left" @click="onClick(!open)">
     <div v-if="title" class="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100">
        {{ title }}
        <ChevronUpIcon
            :class="[open && 'rotate-180 transform']"
            class="flex-none h-5 w-5 ml-2 transition-all"
        />
      </div>

      <slot v-else name="title" :open="open"/>

  </DisclosureButton>

  <DisclosurePanel static>
    <div class="overflow-hidden transition-all duration-200" :style="{ height }">
      <div ref="content">
        <slot :open="open"/>
      </div>
    </div>
  </DisclosurePanel>
</Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, } from '@headlessui/vue';

import { ChevronUpIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';

const props = defineProps({
  defaultOpen: { type: Boolean, default: false },
  title: String
});

const initialHeight = props.defaultOpen ? 'auto' : 0;
const height = ref(initialHeight);
const content = ref(null);
const TRANSITION_TIME = 300;

const onClick = (open) => {
  const contentHeight = content.value.getBoundingClientRect().height;
  height.value = contentHeight + 'px';

  if (open) {
    setTimeout(() => height.value = 'auto', TRANSITION_TIME);
  } else {
    setTimeout(() => height.value = '0');
  }
}
</script>
