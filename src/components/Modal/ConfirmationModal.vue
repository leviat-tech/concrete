<template>
  <CModal :title="$L(props.titleKey)" :closeable="false" :show="props.isOpen">
    <div>{{ props.overrideText || $l(props.bodyKey) }}</div>
    <div class="flex justify-end mt-8">
      <CButton class="w-20" @click="emit('onDecision')">{{ $L('cancel') }}</CButton>
      <CButton class="w-20 ml-2" @click="onConfirm">{{ $L('ok') }}</CButton>
    </div>
  </CModal>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    titleKey: string;
    bodyKey: string;
    overrideText?: string;
    onConfirm: () => void;
  }>(),
  {
    isOpen: false,
    overrideText: '',
    titleKey: 'confirm',
    bodyKey: 'confirm_default',
  }
);

const emit =
  defineEmits<{
    (e: 'onDecision'): void;
  }>();

function onConfirm() {
  props.onConfirm();
  emit('onDecision');
}
</script>
