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
        @blur="handleBlur"
      >
      <div class="concrete-input-icon">
        <plus
          v-if="!disabled && !!icon"
          @click="$emit('click-icon')"
        />
      </div>
      <ul
        v-show="showOptions"
        class="concrete-select-options"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          class="option"
          :class="{ keyed: index === arrowCounter }"
          @mousedown="handleSelect(option)"
        >
          <div class="option-check">
            <check v-if="value === option.value" />
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
import Plus from '../assets/plus.svg';
import Check from '../assets/check.svg';


export default {
  name: 'SearchSelect',
  components: {
    Plus,
    Check,
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
    text: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: null,
    },
    fill: {
      type: String,
      default: 'outline',
    },
    icon: {
      type: String,
      default: 'plus',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
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
      this.localText = '';
      this.$emit('search', '');
      this.showOptions = true;
      this.localPlaceholder = this.selected || this.placeholder;
    },
    handleBlur() {
      this.$emit('blur');
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
      this.$emit('search', this.localText);
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
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';

.concrete-select-options {
  @include shadow;
  background-color: $color-gray-02;
  border: $border-sm solid $color-gray-04;
  width: 100%;
  position: absolute;
  list-style-type: none;
  top: 1rem;
  padding-left: 0;

  .option {
    display: flex;
    align-items: center;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;

    &:hover, &.keyed {
      background-color: $color-blue-highlight;
      color: white;
    }

    .option-check {
      width: 1rem;
    }
  }
}

</style>
