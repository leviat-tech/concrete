<template>
  <div class="concrete-select-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled }"
    >
      {{ label }}
    </div>
    <div class="concrete-input concrete" :class="{ focused }">
      <input
        ref="input"
        v-model="localText"
        type="text"
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
            <c-icon v-if="value === option.value" type="check" />
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
    placeholder: { type: String, default: '' },
    label: { type: String, default: null },
    text: { type: String, default: '' },
    value: { type: Number, default: null },
    externalFilter: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: 'chevron-down' },
  },
  data() {
    return {
      selected: null,
      focused: false,
      localText: '',
      localPlaceholder: '',
      arrowCounter: -1,
      showOptions: false,
    };
  },
  computed: {
    filteredOptions() {
      if (this.externalSort) return this.options;
      return this.options.filter((o) => o.label.toLowerCase()
        .includes(this.localText.toLowerCase()));
    },
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        const option = this.options.find((o) => o.value === this.value);
        if (option) {
          this.selected = option.label;
          this.localText = option.label;
        } else if (!this.disabled) {
          this.selected = null;
          this.localPlaceholder = this.placeholder;
          this.localText = '';
        }
      },
    },
    text: {
      immediate: true,
      handler() {
        this.localText = this.text;
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
      this.localText = '';
      if (this.externalFilter) {
        this.$emit('search', '');
      }
      this.showOptions = true;
      this.localPlaceholder = this.selected || this.placeholder;
    },
    handleBlur() {
      this.focused = false;
      if (this.externalFilter) {
        this.$emit('blur');
      }
      if (this.selected) {
        this.localPlaceholder = '';
        this.localText = this.selected;
      } else {
        this.localPlaceholder = this.placeholder;
        this.localText = '';
      }
      this.showOptions = false;
    },
    handleChange() {
      if (this.externalFilter) {
        this.$emit('search', this.localText);
      }
    },
    handleSelect(option) {
      this.$emit('input', option.value);
      this.selected = option.label;
      this.localText = option.label;
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
