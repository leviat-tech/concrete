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
<script setup>
import CSelectFileTypeItem from './SelectFileTypeItem.vue';

const props = defineProps({
        types: {
            Type: [Array, Object],
            default: []
        },
        currentFileType: {
          Type: String,
        }
    });

const currentFileType = defineModel('currentFileType');

</script>
