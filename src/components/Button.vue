<template>
  <button
    :class="[
      'concrete-button',
      'concrete',
      size,
      (!disabled && color),
      (!disabled && fill),
      (disabled && 'disabled'),
      (inProgress && 'in-progress'),
    ]"
    :disabled="disabled"
    @click="click"
  >
    <div
      :style="progressStyle"
      class="progress-bar"
    >
      &nbsp;
    </div>
    <div class="button-content">
      <c-icon v-if="play && !inProgress" type="play" class="icon" />
      <c-icon v-if="inProgress && cancelable" type="times-circle" class="icon" @click="cancel" />
      <slot />
    </div>
  </button>
</template>

<script>
import CIcon from '@/components/Icon';


export default {
  name: 'CButton',
  components: {
    CIcon,
  },
  props: {
    size: {
      type: String,
      default: 'sm',
      validator: (prop) => ['lg', 'md', 'sm', 'xs'].includes(prop),
    },
    color: {
      type: String,
      default: 'primary',
      validator: (prop) => ['primary', 'danger'].includes(prop),
    },
    fill: {
      type: String,
      default: 'solid',
      validator: (prop) => ['solid', 'outline', 'ghost'].includes(prop),
    },
    play: { type: Boolean, default: false },
    progress: { type: Number, default: null },
    fake: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    cancelable: { type: Boolean, default: true },
  },
  data() {
    return {
      fakeProgress: 20,
      intervalId: null,
    };
  },
  computed: {
    inProgress() {
      return this.progress && this.progress < 100;
    },
    progressStyle() {
      if (!this.progress || this.progress >= 100) {
        return { display: 'none' };
      }

      if (this.fake) {
        return { width: `${this.fakeProgress}%` };
      }

      return { width: `${this.progress}%` };
    },
  },
  watch: {
    progress: {
      handler(nv) {
        if (this.fake) {
          this.fakeProgress = nv;
          if (nv >= 100) {
            clearInterval(this.intervalId);
          }
        }
      },
    },
  },
  methods: {
    click() {
      this.$emit('click');
      if (this.fake) {
        this.fakeProgress = 20;
        this.intervalId = setInterval(() => {
          const diff = 90 - this.fakeProgress;
          if (diff > 0 && diff < 90) this.fakeProgress += diff / 20;
        }, 100);
      }
    },
    cancel(e) {
      e.stopPropagation();
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

@mixin btn-kind($color) {
  background: $color;

  &:hover {
    background: scale-color($color, $lightness: -15%);
  }

  &:active {
    background: scale-color($color, $lightness: -25%);
  }

  &.outline {
    background: $color-white;
    color: $color;
    border: $border-sm solid $color;
  }

  &.ghost {
    background: $color-white;
    color: $color;
  }
}

.concrete-button {
  cursor: pointer;
  border: none;
  color: $color-white;
  border-radius: $radius;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;

  &.primary {
    @include btn-kind($color-blue);
  }

  &.danger {
    @include btn-kind($color-red);
  }

  &.disabled {
    cursor: not-allowed;
    background: $color-gray-02;
    color: $color-gray-04;
  }

  &.in-progress {
    cursor: not-allowed;
    background: $color-gray-02;
    color: $color-gray-04;

    &:hover {
      background: $color-gray-02;
      color: $color-black;
    }
  }

  .progress-bar {
    position: absolute;
    border-radius: $radius;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(#209cef, #1985dd);
    opacity: 1;
  }

  .button-content {
    position: relative;
  }

  &.xs {
    height: 1.5rem;
    font-size: $text-xs;
  }

  &.sm {
    height: 2rem;
    font-size: $text-sm;
  }

  &.md {
    height: 2.5rem;
    font-size: $text-base;
  }

  &.lg {
    height: 3rem;
    font-size: $text-lg;
  }

  .icon {
    margin-right: 0.5rem;
    cursor: pointer;
  }
}

</style>
