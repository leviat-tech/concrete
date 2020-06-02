<template>
  <div class="component-container">
    <div class="container-interior" :class="{ theme }">
      <div v-for="type in icons" :key="type" class="icon-thumbnail">
        <c-icon :type="type" size="xl" />
        <div class="label">{{ type }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentContainer',
  props: {
    theme: { type: String, default: 'light' },
  },
  computed: {
    icons() {
      return [
        'check',
        'chevron-down',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'compress',
        'cube',
        'download',
        'expand',
        'folder-open',
        'grip',
        'hand',
        'image',
        'long-arrow-down',
        'long-arrow-up',
        'pause',
        'pen',
        'play',
        'plus',
        'pointer-outline',
        'pointer-solid',
        'polygon',
        'redo',
        'save',
        'times-circle',
        'times',
        'trash',
        'undo',
        'upload',
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../src/assets/styles/variables.scss';

.component-container {
  box-sizing: border-box;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.container-interior {
  text-align: center;
  border: $border-sm solid $color-gray-04;
  border-radius: 0.5rem;
  padding: 4rem 2rem 4rem 2rem;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  column-gap: 1rem;
  row-gap: 2rem;

  &.light {
    background-color: $color-white;
  }

  &.dark {
    background-color: $color-gray-10;
  }
}

.icon-thumbnail {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: $text-xs;

  .label {
    margin-top: .25rem;
    color: $color-gray-06;
  }
}

</style>