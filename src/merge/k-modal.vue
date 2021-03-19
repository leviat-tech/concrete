<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  .backdrop {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: hsla(0, 0, 0, .4);
    z-index: 9999;
  }
</style>


<template>
  <div class="backdrop c-box" v-show="showing">
    <k-click-off ref="dialog" @closed="showing=false">
      <div class="modal">
        <slot></slot>
      </div>
    </k-click-off>
  </div>
</template>


<script>
export default {
  name: 'k-modal',
  data() {
    return {
      showing: false,
    };
  },
  methods: {
    open() {
      this.showing = true;
      this.$refs.dialog.open();
    },
    close() {
      this.showing = false;
      this.$refs.dialog.close();
    },
  },
};
</script>
