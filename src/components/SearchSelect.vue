<template>
  <div class="concrete-input-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled, [size]: size }"
    >
      {{ label }}
    </div>
    <div
      class="concrete-input concrete"
      :class="{ focused, [size]: size, [theme]: theme }"
    >
      <input
        ref="input"
        v-model="searchText"
        type="text"
        :class="[
          size, theme
        ]"
        :placeholder="localPlaceholder"
        :disabled="disabled"
        @input="handleChange"
        @focus="handleFocus"
        @keydown.down="handleKeyDown"
        @keydown.up="handleKeyUp"
        @keydown.enter="handleKeyEnter"
        @keydown.esc="handleKeyEsc"
        @blur="handleBlur"
      >
      <div class="concrete-input-icon">
        <c-icon
          v-if="!disabled"
          :type="icon"
          @click="$emit('click-icon')"
        />
      </div>
      <ul
        v-show="showOptions"
        class="concrete-select-options"
      >
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="option"
          :class="{ keyed: index === arrowCounter }"
          @mousedown="handleSelect(option)"
        >
          <div class="option-check">
            <c-icon v-if="localValue === option.value" type="check" />
            <div v-else>&nbsp;</div>
          </div>
          <div>
            {{ option.label }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CIcon from '@/components/Icon';


export default {
  name: 'CSearchSelect',
  components: { CIcon },
  props: {
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: 'Please select one' },
    label: { type: String, default: null },
    value: { type: [String, Number], default: null },
    externalFilter: { type: Boolean, default: false },
    size: { type: String, default: 'base' },
    theme: { type: String, default: 'light' },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: 'chevron-down' },
  },
  data() {
    return {
      localValue: this.value,
      localLabel: null,
      focused: false,
      searchText: '',
      localPlaceholder: '',
      arrowCounter: -1,
      showOptions: false,
    };
  },
  computed: {
    filteredOptions() {
      if (this.externalSort) return this.options;
      return this.options.filter((o) => o.label.toLowerCase()
        .includes(this.searchText.toLowerCase()));
    },
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        const option = this.options.find((o) => o.value === this.value);
        if (option) {
          this.localValue = option.value;
          this.localLabel = option.label;
          this.searchText = option.label;
        } else if (!this.disabled) {
          this.localValue = null;
          this.localLabel = null;
          this.localPlaceholder = this.placeholder;
          this.searchText = '';
        }
      },
    },
  },
  created() {
    if (!this.text && !this.value) {
      this.localPlaceholder = this.placeholder;
    }
  },
  methods: {
    handleFocus() {
      this.focused = true;
      this.searchText = '';
      if (this.externalFilter) {
        this.$emit('search', '');
      }
      this.showOptions = true;
      this.localPlaceholder = this.localLabel || this.placeholder;
    },
    handleBlur() {
      this.focused = false;
      if (this.externalFilter) {
        this.$emit('blur');
      }
      if (this.localLabel) {
        this.localPlaceholder = '';
        this.searchText = this.localLabel;
      } else {
        this.localPlaceholder = this.placeholder;
        this.searchText = '';
      }
      this.showOptions = false;
    },
    handleChange() {
      if (this.externalFilter) {
        this.$emit('search', this.searchText);
      }
    },
    handleSelect(option) {
      this.localValue = option.value;
      this.$emit('input', option.value);
      this.localLabel = option.label;
      this.searchText = option.label;
      this.showOptions = false;
      this.arrowCounter = this.options
        .map((o) => o.value)
        .indexOf(option.value);
    },
    handleKeyDown() {
      if (this.arrowCounter < this.options.length - 1) {
        this.arrowCounter += 1;
      }
    },
    handleKeyUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter -= 1;
      }
    },
    handleKeyEnter() {
      const option = this.options[this.arrowCounter];
      if (option) {
        this.handleSelect(option);
      }
      this.$refs.input.blur();
    },
    handleKeyEsc() {
      this.$refs.input.blur();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';


</style>
