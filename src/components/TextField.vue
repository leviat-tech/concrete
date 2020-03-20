<template>
  <div class="text-field">
    <input
      class="input"
      :class="[fill, icon && 'with-icon', disabled && 'disabled']"
      type="text"
      v-model="localValue"
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
  name: 'TextField',
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
    placeholder: {
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
