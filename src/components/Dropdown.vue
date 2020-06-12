<template>
  <div class="concrete-dropdown-container">
    <c-button color="standard">
      <slot name="button" />
    </c-button>
    <div v-if="localValue" class="concrete-flyout">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import CButton from '@/components/Button';


export default {
  name: 'CDropdown',
  components: { CButton },
  props: {
    value: { type: Boolean, default: false },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
};
</script>
