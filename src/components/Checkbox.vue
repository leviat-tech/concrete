<template>
  <div class="concrete-select-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled }"
    >
      {{ label }}
    </div>
    <div class="concrete-checkbox concrete" :class="{ focused }">
      <input
        v-model="localValue"
        type="checkbox"
        :disabled="disabled"
        @focus="focused = true"
        @blur="focused = false"
        @change="handleChange"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CCheckbox',
  props: {
    label: { type: String, default: '' },
    value: { type: Boolean },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      localValue: false,
      focused: false,
    };
  },
  watch: {
    value: {
      handler() {
        this.localValue = this.value;
      },
    },
  },
  created() {
    this.localValue = !!this.value;
  },
  methods: {
    handleChange() {
      this.$emit('change-value', this.localValue);
      this.$emit('update', this.localValue);
      this.$emit('input', this.localValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';

.concrete-checkbox {
  max-width: 28rem;
  width: 100%;
}

</style>
