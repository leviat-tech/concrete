<!-- when editing the cell data, it is not saving the changes, 
  it is reverting back to original value when exiting the cell component-->
<template>
  <component>
    <div>
      <input
        ref="inputRef"
        :id="id"
        v-model="value"
        type="text"
        :class="[
          inputStaticClasses,
          mergedSizeClass,
          inputColorClass,
          disabledClass,
          cursorClass,
          cellbgColorClass,
          overrideCssStyles,
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readOnly="!isEditable"
        @keydown.enter="onEnter"
        @blur="onBlur"
        @focusout="onFocusOut"
        @dblclick="onDblClick"
      />
    </div>
  </component>
</template>

<script setup>
import { computed, ref } from "vue";
import { formElementProps } from "../../composables/props.js";
import {
  inputStaticClasses,
  useInputClasses,
  useCursorClass,
} from "../../composables/styles";
import { useInputValue, useRegisterInput } from "../../composables/forms";
import { useEventHandler } from "../../composables/events.js";

const props = defineProps({
  ...formElementProps,
  modelValue: String,
  placeholder: { type: String, default: "" },
  transparent: { type: Boolean, default: false },
  onEnter: { type: Function, default: null },
  onBlur: { type: Function, default: null },
  overrideCssStyles: { type: String },
});

const bgColorClassTransparent = "border-transparent text-black bg-transparent";
const cellbgColorClass = computed(() => {
  return isEditable.value ? bgColorClass : bgColorClassTransparent;
});
const emit = defineEmits(["update:modelValue", "enter", "blur"]);

const { mergedSizeClass, inputColorClass, bgColorClass, disabledClass } =
  useInputClasses(props);
const cursorClass = useCursorClass(props);

const isDirty = ref(false);
const inputRef = ref(null);
const localValue = ref("");

const value = computed({
  get() {
    return useInputValue(props);
  },
  set(val) {
    localValue.value = val;
    isDirty.value = true;
    emit("update:modelValue", val);
  },
});

const onEnter = useEventHandler("enter", props, emit, localValue, isDirty);
const onBlur = useEventHandler("blur", props, emit, localValue, isDirty);

let isEditable = ref(false);

function onDblClick() {
  isEditable.value = true;
}
function onFocusOut() {
  isEditable.value = false;
}
const blur = () => inputRef.value.blur();
const focus = () => inputRef.value.focus();
const select = () => inputRef.value.select();

defineExpose({ focus, blur, select });

useRegisterInput(props, inputRef);
</script>
