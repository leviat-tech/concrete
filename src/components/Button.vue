<template>
  <button
    :class="[
      'btn',
      size,
      (!disabled && color),
      (!disabled && fill),
      (disabled && 'disabled'),
      (icon && $slots.default && 'text-icon')
    ]"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <font-awesome-icon
      v-if="icon"
      :class="[ $slots.default && 'text-icon' ]"
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
  props: {
    size: {
      type: String,
      default: 'sm',
      validator: (prop) => ['lg', 'md', 'sm', 'xs'].includes(prop),
    },
    color: {
      type: String,
      default: 'primary',
      validator: (prop) => ['primary', 'danger']
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
