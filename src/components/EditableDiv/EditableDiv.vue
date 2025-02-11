<template>
  <div
    ref="el"
    class="p-0.5 select-none"
    :class="isEditing && 'bg-base-100 text-black'"
    :contenteditable="isEditing && !readOnly"
    @dblclick="onEdit"
    @keydown.enter="onBlur(true)"
    @keydown.esc="onBlur(false)"
    @blur="onBlur(true)"
  >
    {{ modelValue }}
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    modelValue: String,
    readOnly: Boolean,
  });

  const emit = defineEmits(['update:modelValue']);

  const isEditing = ref(false);
  const el = ref(null);

  function onEdit() {
    if (props.readOnly) return;

    isEditing.value = true;

    // Allow time for the input to become focussed before setting the selected range
    setTimeout(() => {
      if (el.value.vselect) {
        el.value.select();
        return;
      }

      const range = document.createRange();
      range.selectNodeContents(el.value);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);
  }

  /**
   * Either save the name or revert the HTML text content to the previous value
   * @param {boolean} shouldUpdate
   */
  function onBlur(shouldUpdate) {
    isEditing.value = false;

    const selection = window.getSelection();
    selection.removeAllRanges();

    if (shouldUpdate) {
      emit('update:modelValue', el.value.innerHTML);
    } else {
      el.value.innerHTML = props.modelValue;
    }
  }
</script>
