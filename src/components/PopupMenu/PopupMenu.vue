<template>
  <Menu class="relative" as="div">
    <!-- Button -->
    <MenuButton
      :title="title"
      :class="`flex items-center p-1 relative ring-0 ${menuButtonClasses}`"
    >
      <slot v-if="$slots.button" name="button" />
      <EllipsisVerticalIcon v-else class="w-4 h-4" />
    </MenuButton>

    <!-- Content -->
    <Transition enter-from-class="scale-95 opacity-0" leave-to-class="opacity-0">
      <MenuItems
        as="div"
        :class="`absolute text-black top-3 right-3 z-20 w-44 py-2 bg-white shadow-xl transition duration-150 origin-top-right ${menuContainerClasses}`"
      >
        <MenuItem v-for="(slot, index) in $slots.default?.()" :key="index" as="div">
          <SlotRenderer :child="slot" />
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<script setup>
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
  import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
  import SlotRenderer from '../SlotRenderer.vue';

  defineProps({
    title: String,
    modelValue: Boolean,
    menuButtonClasses: {
      type: String,
      default: '',
    },
    menuContainerClasses: {
      type: String,
      default: '',
    },
  });
</script>
