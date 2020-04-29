<template>
  <div>
    <c-button @click="show = true">
      {{ buttonText }}
    </c-button>
    <c-modal
      v-if="show"
      :title="type === 'title' ? 'Modal Title' : null"
      :closeable="type === 'text-only' ? false : true"
      @close="show = false"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <span class="red-text">dolore magna aliqua</span>.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </c-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalDemo',
  props: ['buttonText', 'type'],
  data() {
    return {
      show: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.red-text {
  color: red;
}
</style>