<template>
  <div class="relative">
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @keydown.enter="$emit('blur')"
      @blur="$emit('blur')"
      @input="$emit('input')"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'Button',
  components: {
    FontAwesomeIcon,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    fill: {
      type: String,
      default: 'solid',
      validator: (prop) => ['solid', 'outline'].includes(prop),
    },
    placehoder: {
      type: String,
      default: '',
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
};
</script>
