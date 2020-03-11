<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white rounded"
    :class="[textSize, paddingX, height]"
    @click="$emit('click')"
  >
    <font-awesome-icon
      v-if="icon"
      :class="[iconMargin]"
      :icon="icon"
    />
    <slot></slot>
  </button>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


export default {
  name: 'Button',
  components: {
    FontAwesomeIcon,
  },
  computed: {
    textSize() {
      return `text-${this.size}`
    },
    paddingX() {
      const paddingRight = this.size === 'xs' ? 3 : 4;
      const paddingLeft = this.icon ? paddingRight - 1 : paddingRight;
      return `pl-${paddingLeft} pr-${paddingRight}`
    },
    height() {
      const heightMapping = { lg: 12, md: 10, sm: 8, xs: 6 };
      return `h-${heightMapping[this.size]}`;
    },
    iconMargin() {
      return (this.size === 'lg' || this.size === 'md') ? 'mr-2' : 'mr-1';
    }
  },
  props: {
    size: {
      type: String,
      default: 'sm',
      validator: (prop) => ['lg', 'md', 'sm', 'xs'].includes(prop),
    },
    color: {
      type: String,
      default: 'blue',
    },
    fill: {
      type: String,
      default: 'solid',
      validator: (prop) => ['solid', 'outline', 'ghost'].includes(prop),
    },
    icon: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
}
</script>