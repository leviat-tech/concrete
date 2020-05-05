<template>
  <c-select
    :label="label"
    :size="size"
    :theme="theme"
    :image-size="imageSize"
    show-image
    :options="[
      { section: 'Screws', image: '/images/socket-head-screw.png', label: 'Socket Head Screw', value: 1 },
      { section: 'Screws', image: '/images/flat-head-screw.png', label: 'Flat Head Screw', value: 2 },
      { section: 'Screws', image: '/images/hex-head-screw.png', label: 'Hex Head Screw', value: 3 },
      { section: 'Screws', image: '/images/round-head-screw.png', label: 'Round Head Screw', value: 4 }
    ]"
  />
</template>

<script>
export default {
  props: ['size', 'theme', 'label', 'imageSize']
}
</script>