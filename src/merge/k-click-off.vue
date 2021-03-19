<!-- This component is a div that can be shown or hidden and will hide itself when clicked off -->

<template>
  <div class="k-click-off" v-show="showing" ref="root">
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'k-click-off',
  data() {
    return {
      showing: false,
      listener: null,
    };
  },
  methods: {
    open() {
      this.showing = true;
      this.listen();
      this.$emit('opened');
    },
    close() {
      this.showing = false;
      this.unlisten();
      this.$emit('closed');
    },
    toggle() {
      if (this.showing) {
        this.close();
      } else {
        this.open();
      }
    },
    listen() {
      this.listener = (event) => {
        if (!this.$refs.root.contains(event.target)) {
          this.close();
        }
      };
      document.addEventListener('click', this.listener);
    },
    unlisten() {
      document.removeEventListener('click', this.listener);
    },
  },
};
</script>
