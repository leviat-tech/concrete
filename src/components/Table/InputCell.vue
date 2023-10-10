<script setup>
import { computed, ref, nextTick } from "vue";
import { inputStaticClasses, useInputClasses } from "../../composables/styles";
const { inputColorClass, bgColorClass, disabledClass } = useInputClasses(props);

const props = defineProps({
  value: [String, Number],
  isEditingRow: Boolean,
  isEditingCell: Boolean,
  isCellsEditable: Boolean,
  parentEvent: String,
  row: Object,
  error: String,
  overrideCssStyles: { type: String },
});
// create selected cell view
// create edit view
// add Escape key event
let isEditable = ref(false);
let isSelected = ref(false);
const bgColorClassRowEdit =
  "border-b border-blue-500 bg-transparent text-blue-500 outline-none";
const bgColorClassTransparent = "border-transparent text-black bg-transparent";
const bgColorClassCell = computed(() => {
  if (props.isCellsEditable) {
    const inputClass = [inputStaticClasses, inputColorClass, disabledClass];
    if (isEditable.value) {
      return [bgColorClass, ...inputClass];
    } else {
      return [bgColorClassTransparent, ...inputClass];
    }
  } else {
    return bgColorClassRowEdit;
  }
});
const emit = defineEmits(["edit"]);

let onClickCount = 0;

function onKeyDownEnter() {
  isEditable.value = onClickCount > 0;
  onClickCount += 1;
}
function onKeyDownEscape() {
  onClickCount = 0;
  isEditable.value = false;
}
function onClick() {
  if (props.parentEvent === "blur" && onClickCount <= 0) {
    onClickCount += 1;
  } else {
    isEditable.value = onClickCount > 0;
  }
}
async function onBlur() {
  onClickCount = 0;
  isEditable.value = false;
}
function onFocus() {
  if (props.parentEvent === "keyDown") {
    onClickCount += 1;
  }
}
</script>

<template>
  <input
    :class="[{ 'text-red-500 border-red-500': error }, bgColorClassCell]"
    v-if="isEditingRow || isCellsEditable || isEditingCell"
    :readOnly="!isEditable"
    :value="value"
    :type="typeof value === 'number' ? 'number' : 'text'"
    @input="(e) => emit('edit', e.target.value)"
    @blur="onBlur"
    @focus="onFocus"
    @click="onClick"
    @keydown.enter="onKeyDownEnter"
    @keydown.escape="onKeyDownEscape"
  />
  <span v-else :class="{ 'text-red-500': error }"> {{ value }} </span>
</template>
