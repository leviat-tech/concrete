<template>
  <div class="relative">
    <input
      class="text-field"
      :class="[fill, icon && 'icon', disabled && 'disabled']"
      type="text"
      :value="localValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @keydown.enter="$emit('blur')"
      @blur="$emit('blur')"
      @input="$emit('input', localValue)"
    />
    <font-awesome-icon
      v-if="icon"
      class="icon"
      :icon="['far', icon]"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'Button',
  data() {
    return {
      localValue: '',
    };
  },
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
  watch: {
    value: {
      immediate: true,
      handler() {
        this.localValue = this.value;
      }
    }
  },
};
</script>
