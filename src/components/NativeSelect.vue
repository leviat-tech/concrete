<template>
  <div class="concrete-input-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled, [size]: size }"
    >
      {{ label }}
    </div>
    <div class="concrete-input concrete" :class="{ focused, [size]: size, [theme]: theme }">
      <select
        v-model="localValue"
        required
        :class="[size, theme]"
        :disabled="disabled"
        @focus="focused = true"
        @blur="focused = false"
        @change="handleChange"
      >
        <option value="" disabled hidden>
          {{ placeholder }}
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
        <c-icon :type="icon" />
      </div>
    </div>
  </div>
</template>

<script>
import CIcon from '@/components/Icon';


export default {
  name: 'CNativeSelect',
  components: {
    CIcon,
  },
  props: {
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: 'Please select one' },
    label: { type: String, default: null },
    value: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'base' },
    theme: { type: String, default: 'light' },
    icon: { type: String, default: 'chevron-down' },
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
      this.$emit('input', this.localValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';

</style>
