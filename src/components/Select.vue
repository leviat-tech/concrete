<template>
  <div
    slot="reference"
    class="concrete-input-row concrete"
    tabindex="-1"
    @focus="$refs.input.focus()"
  >
    <div
      v-if="label !== null"
      class="concrete-input-label concrete"
      :class="{ disabled, [size]: size }"
    >
      {{ label }}
    </div>
    <div
      ref="reference"
      class="concrete-input concrete"
      :class="{ focused, [size]: size, [theme]: theme, disabled }"
      @click="handleFocus"
    >
      <div v-if="$slots.prefix" ref="prefix" class="prefix">
        <slot name="prefix" />
      </div>
      <div
        v-if="showImage"
        class="concrete-image-container"
        :class="[imageSize]"
        :style="{ 'background-image': `url('${selected.image}')` }"
      >
        <template v-if="selected.image">
          &nbsp;
        </template>
        <c-icon v-else type="image" class="concrete-image generic" />
      </div>
      <label v-if="selected.label" class="concrete-select-text">
        {{ selected.label }}
      </label>
      <label v-else class="concrete-placeholder concrete-select-text">
        {{ placeholder }}
      </label>
      <input
        ref="input"
        slot="reference"
        v-model="searchText"
        class="concrete-hidden-input"
        type="text"
        inputmode="none"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.down="handleKeyDown"
        @keydown.up="handleKeyUp"
        @keydown.enter="handleKeyEnter"
        @keydown.esc="handleKeyEsc"
      >

      <div class="concrete-input-icon">
        <c-icon :type="icon" />
      </div>

      <div v-if="$slots.suffix" ref="suffix" class="suffix">
        <slot name="suffix" />
      </div>
    </div>
    <ul
      v-show="showOptions"
      ref="popper"
      class="concrete-select-options"
      :class="{ 'show-image': showImage, [size]: size }"
      :style="{ width: `${optionsWidth}px` }"
    >
      <template
        v-for="(option, index) in filteredOptions"
      >
        <li
          v-if="showSections && isNewSection(option, index)"
          :key="'section_' + (option.section || index)"
          class="section-header"
        >
          {{ option.section }}
        </li>
        <li
          :key="index"
          class="option"
          :class="{ keyed: index === arrowCounter }"
          @mousedown.prevent="handleSelect(option)"
        >
          <div class="option-check">
            <c-icon v-if="localValue === option.value" type="check" />
            <div v-else>&nbsp;</div>
          </div>
          <div
            v-if="showImage"
            class="concrete-image-container"
            :class="imageSize"
            :style="{ 'background-image': `url('${option.image}')` }"
          >
              &nbsp;
          </div>
          <div class="concrete-option-label">
            {{ option.label }}
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import isPlainObject from 'lodash/isPlainObject';
import CIcon from '@/components/Icon';


export default {
  name: 'CSelect',
  components: { CIcon },
  props: {
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: 'Please select one' },
    showImage: { type: Boolean, default: false },
    imageSize: { type: String, default: 'md' },
    size: { type: String, default: 'base' },
    theme: { type: String, default: 'light' },
    sortSections: { type: Boolean, default: false },
    showSections: { type: Boolean, default: false },
    label: { type: String, default: null },
    value: { type: [String, Number, Object], default: '' },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: 'chevron-down' },
    formatter: { type: Function, default: null },
  },
  data() {
    return {
      localValue: null,
      focused: false,
      arrowCounter: -1,
      searchText: '',
      showOptions: false,
      optionsWidth: '0px',
    };
  },
  computed: {
    localOptions() { // eslint-disable-line
      return this.options.map((o) => {
        const opt = isPlainObject(o) ? o : { label: o, value: o };
        return this.formatter ? { ...opt, label: this.formatter(opt.label) } : opt;
      });
    },
    selected() {
      return this.localOptions.find((o) => o.value === this.localValue) || {};
    },
    filteredOptions() {
      if (!this.sortSections) return this.localOptions;
      return this.localOptions.slice().sort((a, b) => {
        if (a.section < b.section) return -1;
        if (a.section > b.section) return 1;
        return 0;
      });
    },
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
  mounted() {
    this.popper = createPopper(this.$refs.reference, this.$refs.popper, {
      placement: 'bottom-start',
      modifiers: [
        { name: 'offset', options: { offset: [0, 10] } },
      ],
    });
    this.observer = new ResizeObserver((entries) => {
      const input = entries[0];
      this.optionsWidth = input.target.clientWidth;
    });
    this.observer.observe(this.$refs.reference);
  },
  created() {
    if (this.value != null) {
      this.localValue = this.value;
    }
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    handleFocus() {
      if (this.disabled) return;
      this.showOptions = true;
      this.focused = true;
      this.popper.update();
    },
    handleBlur() {
      this.focused = false;
      this.showOptions = false;
    },
    handleSelect(option) {
      this.localValue = option.value;
      this.$emit('change-value', this.localValue);
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
    isNewSection(option, index) {
      if (option.section === null) return false;
      if (index === 0) return true;
      const prevSection = this.filteredOptions[index - 1];
      return prevSection.section !== option.section;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/input.scss';

.concrete-input {
  cursor: pointer;
  .suffix {
    border-left: 1px solid $color-gray-03;
  }
}

.concrete-hidden-input {
  position: absolute;
  caret-color: transparent;
  color: transparent;
  width: 100%;
  height: 100%;
}

.concrete-image-container {
  margin: 0.5rem;
  flex: none;
  margin-right: 1rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  .concrete-image {
    &.generic {
      width: 100%;
      height: 100%;
      color: $color-gray-04;
    }
  }
}

.concrete-input.xs {
 .concrete-image-container {
    height: 1.75rem;
    width: 3rem;
 }

  .sm.concrete-image-container {
    height: 1.5rem;
    width: 1.5rem;
  }
}

.concrete-input.sm {
  .concrete-image-container {
    height: 2rem;
    width: 3.5rem;
  }

  .sm.concrete-image-container {
    height: 1.75rem;
    width: 1.75rem;
  }
}

.concrete-input.base {
  .concrete-image-container {
    height: 2.25rem;
    width: 4rem;
  }

  .sm.concrete-image-container {
    height: 2rem;
    width: 2.25rem;
  }
}

.concrete-input.lg {
  .concrete-image-container {
    height: 2.5rem;
    width: 4.5rem;
  }

  .sm.concrete-image-container {
    height: 2.25rem;
    width: 2.5rem;
  }
}

.concrete-select-text, .concrete-option-label {
  overflow: hidden;
  flex: 1 1 0%;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 0.5rem;
}

.concrete-select-options {
  z-index: 30;

  .section-header {
    margin-top: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-weight: 700;

    &:first-of-type {
      margin-top: 0;
    }
  }
}

</style>
