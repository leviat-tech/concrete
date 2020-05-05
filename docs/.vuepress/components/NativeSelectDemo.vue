<template>
  <c-native-select
    :label="label"
    :size="size"
    :theme="theme"
    :options="[
      { label: 'hello', value: 1 },
      { label: 'darkness', value: 2 },
      { label: 'my', value: 3 },
      { label: 'old', value: 4 },
      { label: 'friend', value: 5 }
    ]"
  />
</template>

<script>
export default {
  props: ['label', 'size', 'theme']
}
</script>