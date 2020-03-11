<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white rounded"
    :class="{ ...sizeClass }"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  computed: {
    sizeClass() {
      return {
        "h-12 px-4 text-lg": this.size === 'lg',
        "h-10 px-4 text-md": this.size === 'md',
        "h-8 px-4 text-sm": this.size === 'sm',
        "h-6 px-3 text-xs": this.size === 'xs',
      }
    },
  },
  props: {
    size: {
      type: String,
      default: 'lg',
    }
  },
}
</script>