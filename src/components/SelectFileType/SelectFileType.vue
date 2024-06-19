<template>
  <div>
    <CSelectFileTypeItem
    v-for="type in types"
    :selected="type.ext === currentFileType"
    :label="type.label"
    :ext="type.ext"
    @click="currentFileType = type.ext"
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
    })

const currentFileType = defineModel('currentFileType')

</script>