<template>
  <div class="concrete-input-row concrete">
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled, [size]: size }"
    >
      {{ label }}
    </div>

    <div class="concrete-input-container">
      <div
        class="concrete-input concrete"
        :class="{ focused, [size]: size, [theme]: theme }"
        @click="handleFocus"
      >
        <div v-if="selected.length > 0" class="concrete-selected-container">
          <div
            v-for="selection in selected"
            :key="selection.value"
            class="selected"
          >
            <label> {{ selection.label }} </label>
            <c-icon
              type="times-circle"
              class="icon"
              @click="removeSelection(selection.value, $event)"
            />
          </div>
        </div>

        <span v-else class="concrete-placeholder">
          {{ placeholder }}
        </span>

        <div class="concrete-input-icon">
          <c-icon v-if="!disabled" :type="icon" />
        </div>
      </div>

      <div v-if="showOptions" class="options-flyout" :class="[size, theme]">
        <div class="input-container" :class="[size, theme]">
          <input
            ref="input"
            v-model="searchText"
            type="text"
            :class="[size, theme]"
            :placeholder="localPlaceholder"
            @blur="handleBlur"
            @keydown.down="handleKeyDown"
            @keydown.up="handleKeyUp"
            @keydown.enter="handleKeyEnter"
            @keydown.esc="handleKeyEsc"
          >
        </div>

        <ul class="concrete-select-options" :class="[size, theme]">
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
import CIcon from '@/components/Icon';


export default {
  name: 'CMultiSelect',
  components: {
    CIcon,
  },
  props: {
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: 'Select options' },
    value: { type: Array, default: () => [] },
    label: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'base' },
    theme: { type: String, default: 'light' },
    icon: { type: String, default: 'plus' },
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
    removeSelection(value, e) {
      e.stopPropagation();
      const index = this.localValue.indexOf(value);
      this.localValue.splice(index, 1);
      this.$emit('input', this.localValue);
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
  width: 100%;

  .concrete-input {
    padding-left: .25rem;
    padding-top: 0.25rem;
    display: flex;
    min-height: 2.25rem;

    &.xs {
      font-size: $text-xs;
      min-height: 1.50rem;
    }

    &.sm {
      font-size: $text-sm;
      min-height: 1.75rem;
    }

    &.lg {
      font-size: $text-lg;
      min-height: 2.5rem;
    }

    &.focused {
      border-radius: 0.25rem 0.25rem 0px 0px;
      border-bottom-color: transparent;
    }
  }

  .options-flyout {
    border: $border-sm solid $color-blue;
    border-radius: 0px 0px 0.25rem 0.25rem;
    border-top-color: transparent;
    box-shadow: 0px 1px 0px 1px $color-blue;
    position: absolute;
    font-size: $text-base;
    color: $color-black;
    margin-top: -1px;
    z-index: 10;
    left: 0;
    width: 100%;

    &.xs {
      font-size: $text-xs;
    }

    &.sm {
      font-size: $text-sm;
    }

    &.lg {
      font-size: $text-lg;
    }

    .input-container {
      width: 100%;
      background-color: $color-gray-01;

      &.dark {
        border-color: $color-gray-08;
        background-color: rgba(255, 255, 255, 0.15);
      }

      input {
        height: 2rem;
        font-size: $text-base;
        appearance: none;
        width: 100%;
        background-color: transparent;
        border: none;

        &.xs {
          font-size: $text-xs;
          height: 1.5rem;
        }

        &.sm {
          font-size: $text-sm;
          height: 1.75rem;
        }

        &.lg {
          font-size: $text-lg;
          height: 2.25rem;
        }

        &.dark {
          color: $color-white;

          &::placeholder {
            color: $color-gray-03;
          }
        }
      }
    }
  }
}

.concrete-selected-container {
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.concrete-select-options {
  left: 0;

  &.xs {
    top: .75rem;
  }

  &.sm {
    top: .8rem;
  }

  &.base {
    top: .9rem;
  }

  &.lg {
    top: 1rem;
  }
}

.concrete-placeholder, .concrete-input-icon {
  margin-top: -.25rem;
}

.selected {
  display: flex;
  align-items: center;
  background-color: $color-blue;
  color: $color-white;
  border-radius: $radius;
  padding: 0.15rem 0.5rem 0.15rem 0.5rem;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;

  label {
    margin-left: 0.25rem;
  }

  .icon {
    margin-left: 0.5rem;
    cursor: pointer;
  }
}
</style>
