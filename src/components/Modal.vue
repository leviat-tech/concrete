<template>
  <div
    class="concrete-modal-background concrete"
    @click.self="$emit('close')"
  >
    <div class="concrete-modal concrete">
      <div
        class="header"
        :class="{ title }"
      >
        <div class="title-content">
          {{ title }}
        </div>
        <div v-if="closeable" class="close-button" @click="$emit('close')">
          <c-icon type="times" />
        </div>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import CIcon from '@/components/Icon';


export default {
  name: 'CModal',
  components: { CIcon },
  props: {
    title: {
      type: String,
      default: null,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.concrete-modal-background * {
  box-sizing: border-box;
}

.concrete-modal-background {
  z-index: 50;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.concrete-modal {
  @include shadow;
  background-color: $color-white;
  max-width: 24rem;
  width: 24rem;
  border-radius: $radius;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.title {
    border-bottom: $border-sm solid $color-gray-04;
    padding-bottom: 0.75rem;
  }

  .title-content {
    color: $color-gray-06;
    font-size: $text-sm;
  }

  .close-button {
    color: $color-gray-06;
    cursor: pointer;

    .svg-inline {
      font-size: $text-base;
    }
  }
}

.content {
  width: 100%;
  padding: 1.5rem;
}
</style>
