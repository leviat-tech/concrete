<template>
  <div class="c-accordion v-box" ref="accordian">
    <div class="toggle" v-on="$listeners" :class="headerClass">
      <div @mousedown="toggle" class="toggle-button">
        <!-- eslint-disable max-len -->
        <svg
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192 512"
          v-show="!expanded"
          class="arrow"
        >
          <path
            fill="currentColor"
            d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
          ></path></svg>
        <svg
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          v-show="expanded"
          class="arrow"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          >
          </path>
        </svg>
      </div>
      <div class="h-box">
        <div class="title" @mousedown="toggle" tabindex="0" @focus="open">
          <slot name="title"> {{ title }} </slot>
        </div>
        <slot name="toolbar" />
      </div>
    </div>
    <slot name="under" />
    <transition name="expand">
      <div class="content" v-show="expanded">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: 'CAccordion',
  props: ['title', 'value', 'headerClass'],
  data() {
    return {
      expanded: this.value || false,
    };
  },
  methods: {
    close(e) {
      e.preventDefault();
      this.expanded = false;
    },
    open(e) {
      e.preventDefault();
      this.expanded = true;
    },
    toggle(e) {
      e.preventDefault();
      this.expanded = !this.expanded;
    },
  },
  watch: {
    value() {
      this.expanded = this.value;
    },
    expanded() {
      this.$emit('input', this.expanded);
    },
  },
};
</script>

<style scoped lang="scss">

  .c-accordion {
    width: 100%;
  }

  .h-box {
    display: flex;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
    align-items: stretch;
    align-items: center;
  }

  .v-box {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
  }

  .title {
    flex: 1 1 0%;
  }

  .title:focus {
    outline: none;
  }

  .arrow {
    width: 0.5rem;
    display: inline-block;
    font-size: inherit;
    height: 1em;
    vertical-align:-0.1em;
  }

  .toggle {
    cursor: pointer;
    display: flex;
    padding-top: 3px;
    padding-bottom: 3px;
    align-items: center;
  }

  .toggle-button {
    width: 1.2rem;
    align-items: center;
    text-align: center;
  }

  .content {
    min-height: 0;
  }

  .expand-enter, .expand-leave {
    transform: scaleY(0.5);
    transform-origin: top;
  }

  .expand-enter-active, .expand-leave-active {
    transition: transform .12s;
  }

  .expand-enter-to {
    transform: scaleY(1);
    transform-origin: top;
  }

  .expand-leave-to {
    transform: scaleY(0);
    transform-origin: top;
  }

</style>
