<template>
  <div class="flex space-x-3 select-none">
    <CSelectFileTypeItem
    v-for="type in types"
    :selected="type === currentFileType"
    :label="type.label"
    :ext="type.ext"
    @click="currentFileType = type"
    />
  </div>

</template>
<script setup>
import CSelectFileTypeItem from './SelectFileTypeItem.vue';

const props = defineProps({
        types: {
            Type: Array,
            default: []
        },
        currentFileType: {
          Type: String,
        }
    });

const currentFileType = defineModel('currentFileType');

</script>