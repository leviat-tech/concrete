<template>
  <div class="concrete-select-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled }"
    >
      {{ label }}
    </div>

    <div class="concrete-input-container">
      <div
        class="concrete-input concrete"
        :class="{focused}"
        @click="handleFocus"
      >
        <div
          v-for="selection in selected"
          :key="selection.value"
          class="selected"
        >
          <label> {{ selection.label }} </label>
          <times-circle
            class="icon"
            @click="removeSelection(selection.value, $event)"
          />
        </div>

        <span v-if="selected.length === 0" class="placeholder">
          {{ placeholder || 'Select Options' }}
        </span>

        <div class="concrete-input-icon">
          <plus v-if="!disabled" />
        </div>
      </div>

      <div v-if="showOptions" class="options-flyout">
        <div class="input-container">
          <input
            ref="input"
            v-model="searchText"
            type="text"
            :placeholder="localPlaceholder"
            @blur="handleBlur"
            @keydown.down="handleKeyDown"
            @keydown.up="handleKeyUp"
            @keydown.enter="handleKeyEnter"
            @keydown.esc="handleKeyEsc"
          >
        </div>

        <ul class="concrete-select-options">
          <li
            v-for="(option, index) in filteredOptions"
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
  </div>
</template>

<script>
import TimesCircle from '../assets/times-circle.svg';
import Plus from '../assets/plus.svg';


export default {
  components: {
    TimesCircle,
    Plus,
  },
  props: {
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: '' },
    value: { type: Array, default: () => [] },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      localValue: [],
      localPlaceholder: '',
      searchText: '',
      focused: false,
      showOptions: false,
      arrowCounter: -1,
    };
  },
  computed: {
    selected() {
      return this.localValue.map((v) => this.options.find((o) => o.value === v));
    },
    filteredOptions() {
      return this.options.filter((o) => {
        const isNotSelected = !this.localValue.includes(o.value);
        const isSearched = o.label.toLowerCase()
          .includes(this.searchText.toLowerCase());
        return isNotSelected && isSearched;
      });
    },
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.localValue = this.value;
      },
    },
  },
  methods: {
    changeValue(value) {
      this.$emit('change-value', value);
      this.displaySearchInput = false;
    },
    removeSelection(value, e) {
      e.stopPropagation();
      const index = this.localValue.indexOf(value);
      this.localValue.splice(index, 1);
      this.$emit('input', this.localValue);
      this.$emit('update', this.localValue);
    },
    handleFocus() {
      this.showOptions = true;
      this.focused = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleBlur() {
      this.showOptions = false;
      this.focused = false;
    },
    handleSelect(option) {
      this.localValue.push(option.value);
      this.$emit('input', this.localValue);
      this.$emit('update', this.localValue);
      this.searchText = '';
      this.handleBlur();
      this.arrowCounter = this.filteredOptions
        .map((o) => o.value)
        .indexOf(option.value);
    },
    handleKeyDown() {
      if (this.arrowCounter < this.filteredOptions.length - 1) {
        this.arrowCounter += 1;
      }
    },
    handleKeyUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter -= 1;
      }
    },
    handleKeyEnter() {
      const option = this.filteredOptions[this.arrowCounter];
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

.concrete-input-container {
  position: relative;
  max-width: 28rem;
  width: 100%;

  .concrete-input {
    padding-left: 0.25rem;
    padding-right: 2rem;
    padding-top: 0.25rem;
    display: flex;
    flex-wrap: wrap;
    min-height: 2.25rem;

    &.focused {
      border-radius: 0.25rem 0.25rem 0px 0px;
      border-bottom-color: transparent;
    }

    .placeholder {
      color: $color-gray-07;
    }
  }

  .options-flyout {
    border: $border-sm solid $color-blue;
    border-radius: 0px 0px 0.25rem 0.25rem;
    border-top-color: transparent;
    box-shadow: 0px 1px 0px 1px $color-blue;
    position: absolute;
    margin-top: -1px;
    z-index: 10;
    left: 0;
    width: 100%;

    .input-container {
      width: 100%;
      background-color: $color-gray-01;

      input {
        height: 2rem;
        font-size: $text-base;
        appearance: none;
        width: 100%;
        background-color: transparent;
        border: none;
      }
    }
  }
}


.concrete-select-options {
  // top: 3rem;
  left: 0;
}


.selected {
  display: flex;
  align-items: center;
  background-color: $color-blue;
  color: $color-white;
  border-radius: $radius;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  margin-bottom: 0.25rem;
  margin-right: 0.25rem;

  label {
    margin-left: 0.25rem;
  }

  .icon {
    height: 0.75rem;
    margin-left: 0.5rem;
    cursor: pointer;
  }
}
</style>