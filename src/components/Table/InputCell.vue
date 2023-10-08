<script setup>
import { computed, ref } from "vue";
import {
  inputStaticClasses,
  useInputClasses,
} from "../../composables/styles";
const { mergedSizeClass, inputColorClass, bgColorClass, disabledClass } =
  useInputClasses(props);

  const props = defineProps({
  value: [String, Number],
  isEditingRow: Boolean,
  isEditingCell: Boolean,
  isCellsEditable: Boolean,
  row: Object,
  error: String,
  overrideCssStyles: { type: String },
});
// create selected cell view
// create edit view
// add Escape key event
let isEditable = ref(false);
const bgColorClassRowEdit = "border-b border-blue-500 bg-transparent text-blue-500 outline-none"
const bgColorClassTransparent = "border-transparent text-black bg-transparent";

const bgColorClassCell = computed(() => {
  console.log(props.isEditingRow);
  console.log(props.isCellsEditable);
  console.log(isEditable.value);
  if (props.isEditingRow) {
    isEditable.value = true;
    return bgColorClassRowEdit;
  }
  else if (props.isCellsEditable && isEditable.value) {
    return bgColorClass;
  }
  else if (props.isCellsEditable ) {
    isEditable.value = false;
    return bgColorClassTransparent;
  }
})
const emit = defineEmits(['edit'])

function onClick() {
  console.log('on click event for input cell')
  isEditable.value = true;
}
function onFocusOut() {
  isEditable.value = false;
}

</script>

<template>
  <input
    :class="[
      { 'text-red-500 border-red-500': error }, 
      bgColorClassCell,
      inputStaticClasses,
      mergedSizeClass,
      inputColorClass,
      disabledClass,
      overrideCssStyles,
    ]"
    v-if="isEditingRow || isCellsEditable || isEditingCell"
    :readOnly="!isEditable"
    :value="value"
    :type="typeof value === 'number' ? 'number' : 'text'"
    @input="(e) => emit('edit', e.target.value)"
    @focusout="onFocusOut"
    @click="onClick"
  />
  <span v-else :class="{ 'text-red-500': error }"> {{ value }} </span>
</template>
