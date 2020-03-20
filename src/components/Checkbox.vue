<template>
  <label class="checkbox-container">
    <input
      class="checkbox"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
    />
    <font-awesome-icon
      class="icon"
      icon="check"
    />
  </label>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    checked: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
