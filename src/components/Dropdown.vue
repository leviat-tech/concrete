<template>
  <div class="dropdown">
    <div class="input-container">
      <font-awesome-icon
        v-if="!disabled && !!icon"
        :icon="['far', icon]"
        class="icon"
        @click="$emit('click-icon')"
      />
      <input
        ref="input"
        class="input"
        :class="[fill, icon && 'with-icon']"
        type="text"
        v-model="localText"
        :placeholder="localPlaceholder"
        :disabled="disabled"
        @input="handleChange"
        @focus="handleFocus"
        @keydown.down="handleKeyDown"
        @keydown.up="handleKeyUp"
        @keydown.enter="handleKeyEnter"
        @blur="handleBlur"
      />
    </div>
    <ul
      v-show="showOptions"
      class="options"
    >
      <li
        v-for="(option, index) in options"
        class="option"
        :class="{ keyed: index === arrowCounter }"
        :key="index"
        @mousedown="handleSelect(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
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
  },
  data() {
    return {
      selected: null,
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
        const option = this.options.find(o => o.value === this.value);
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
      this.$emit('select', option.value);
      this.selected = option.label;
      this.localText = option.label;
      this.showOptions = false;
      this.arrowCounter = -1;
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