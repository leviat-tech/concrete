<template>
  <div class="flex space-x-3 select-none">
    <CSelectFileTypeItem
      v-for="(type, i) in types"
      :selected="i === currentFileType"
      :label="type.label"
      :ext="type.ext"
      @click="currentFileType = i"
    />
  </div>
</template>

<script setup lang="ts">
  import CSelectFileTypeItem from './SelectFileTypeItem.vue';

  defineProps<{
    types: { [key: string]: { size: string; ext: string; label: string } };
    currentFileType: string;
  }>();

  const currentFileType = defineModel('currentFileType');
</script>
