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

function onKeyDownEnter() {
  isEditable.value = true;
}
function onKeyDownEscape() {
  isEditable.value = false;
}
function onClick() {
  isEditable.value = true;
}
function onBlur() {
  isEditable.value = false;
}

</script>

<template>
  <input
    :class="[
      { 'text-red-500 border-red-500': error }, 
      bgColorClassCell,
      inputStaticClasses,
      inputColorClass,
      disabledClass,
      overrideCssStyles,
    ]"
    v-if="isEditingRow || isCellsEditable || isEditingCell"
    :readOnly="!isEditable"
    :value="value"
    :type="typeof value === 'number' ? 'number' : 'text'"
    @input="(e) => emit('edit', e.target.value)"
    @blur="onBlur"
    @click="onClick"
    @keydown.enter="onKeyDownEnter"
    @keydown.escape="onKeyDownEscape"
  />
  <span v-else :class="{ 'text-red-500': error }"> {{ value }} </span>
</template>
