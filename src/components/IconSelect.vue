<template>
  <div
    class="container"
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
  >
    <span class="label"> {{ label }} </span>
    <c-icon class="selected" :type="icon" />
    <transition name="translate">
      <div v-if="expanded">
        <c-icon
          v-for="option in options.filter((o) => o.value !== value)"
          :key="option.value"
          class="option"
          :type="option.icon"
          @click="handleSelect(option.value)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import CIcon from '@/components/Icon';


export default {
  name: 'CIconSelect',
  components: { CIcon },
  props: {
    value: {
      type: null,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator(arr) {
        return arr.every((el) => el.icon && el.value !== undefined);
      },
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    icon() {
      // console.log(this.options.find((o) => o.value === this.value).icon);
      return this.options.find((o) => o.value === this.value).icon;
    },
  },
  methods: {
    handleSelect(value) {
      this.$emit('change-value', value);
      this.expanded = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    align-items: center;
  }

  .label {
    margin-right: 0.5rem;
  }

  .selected {
    opacity: 0.75;
  }

  .option {
    margin-left: 0.25rem;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .translate-enter-active, .translate-leave-active {
    transition: transform 0.1s, opacity 0.1s;
  }

  .translate-enter, .translate-leave-to {
    transform: translateX(-1rem);
    opacity: 0;
  }

  .translate-enter-to, .translate-leave {
    transform: translateX(0);
    opacity: 0.5;
  }
</style>
