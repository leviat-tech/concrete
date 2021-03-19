<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';
  .anchor {
    position: relative;
  }
  $menu-color: $color-gray-04;
  .showing, .showing:hover {
    background: $menu-color !important;
  }
  .menu {
    position: absolute;
    padding: 5px 0px;
    top: 7px;
    left: 6px;
    width: 100px;
    background: $menu-color;

    .arrow-up {
        position: absolute;
        top: -5px;
        left: 11px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid $menu-color;
      }
  }
</style>


<template>
  <div class="tool-menu">
    <input type="file" ref="file" style="display: none">
    <k-tool :icon="icon" @click.native.stop="toggle" :class="{showing}"/>
    <div class="anchor">
      <k-click-off class="menu" ref="menu" @opened="showing=true" @closed="showing=false">
        <div class="arrow-up"></div>
        <slot></slot>
      </k-click-off>
    </div>
  </div>
</template>


<script>
export default {
  name: 'k-tool-drop',
  props: {
    icon: {
      type: String,
    },
  },
  data() {
    return {
      showing: false,
    };
  },
  methods: {
    toggle() {
      this.$refs.menu.toggle();
    },
  },
};
</script>
