<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  .k-accordian {
  }
  .title {
    font-weight: bold;
  }
  .arrow {
    margin-right: 8px;
    width: 10px;
  }
  .toggle {
    cursor: pointer;
    padding: 15px;
  }
</style>


<template>
  <div class="k-accordian v-box flex-limit">
    <div class="toggle h-box items-center" @click="toggle">
      <k-icon v-show="!expanded" class="arrow" icon="fas-caret-right"/>
      <k-icon v-show="expanded" class="arrow" icon="fas-caret-down"/>
      <div class="title h-box items-center">
        <slot name="title">
          <div>{{title}}</div>
          <div class="flex-spacer"></div>
        </slot>
        <slot name="toolbar">
        </slot>
      </div>
    </div>
    <div v-show="expanded">
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  name: 'k-accordian',
  props: ['title', 'value'],
  data() {
    return {
      expanded: this.value || false,
    };
  },
  methods: {
    open() {
      this.expanded = true;
    },
    close() {
      this.expanded = false;
    },
    toggle() {
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
