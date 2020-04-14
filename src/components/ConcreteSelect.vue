<template>
  <div class="concrete-select-row row">
    <div
      v-if="label !== null"
      class="concrete-input-label label"
      :class="{ disabled }"
    >
      {{ label }}
    </div>
    <div class="concrete-input input" :class="{ focused }">
      <select
        v-model="localValue"
        :disabled="disabled"
        @focus="focused = true"
        @blur="focused = false"
        @change="handleChange"
      >
        <option
          disabled
          value=""
        >
          {{ placeholder || 'Please select one' }}
        </option>
        <option
          v-for="(option, i) in options"
          :key="i"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="concrete-input-icon">
        <chevron-down />
      </div>
    </div>
  </div>
</template>

<script>
import ChevronDown from '../assets/chevron-down.svg';


export default {
  name: 'Select',
  components: {
    ChevronDown,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localValue: null,
      focused: false,
    };
  },
  watch: {
    // In the event that "value" is changed outside the context of this
    // component, the localValue here will be set to match.
    value: {
      handler() {
        this.localValue = this.value;
      },
    },
  },
  created() {
    if (this.value != null) {
      this.localValue = this.value;
    }
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

</style>
