<template>
  <div class="border-b border-steel border-dotted mb-2">
    <CAccordion
      :default-open="defaultOpen"
      :localized="localTitle"
      :title="localTitle ? title : $L(title)"
      size="md"
      class="pb-2"
      transition
      :accordion-id="accordionId"
      :data-cy="dataCy"
      title-class="text-sky-dark"
      @opened="$emit('opened')"
      @closed="$emit('closed')"
    >
      <div class="mt-2 pb-1 ml-5">
        <slot />
      </div>
    </CAccordion>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    title: string;
    defaultOpen?: boolean;
    accordionId?: string;
    localTitle?: boolean;
  }>(),
  {
    defaultOpen: true,
  }
);

const dataCyTitle = props.title.trim().toLowerCase().replace(/ /g, '_');
const dataCy = computed(() => `${dataCyTitle}__accordion_toggle`);

defineEmits(['opened', 'closed']);
</script>
