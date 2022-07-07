<template>
  <div class="concrete-toolbar flex h-8 p-1 min-h-12">
    <slot />
  </div>
</template>

<script>
import { h } from 'vue'
import CIcon from '../Icon/Icon.vue';


const CToolGroup = {
  functional: true,
  name: 'CToolGroup',
  render() {
    return h('div', { class: 'flex items-center'}, this.$slots.default());
  },
};

const CTool = {
  name: 'CTool',
  components: { CIcon },
  props: {
    name: { type: String, default: '' },
    toolId: { type: String, required: true },
    icon: { type: String, default: null },
    textButton: { type: Boolean, default: false },
    stateful: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    hoverable: { type: Boolean, default: true },
  },
  inject: ['concreteSelectedTool'],
  computed: {
    isActive() {
      return this.concreteSelectedTool.toolId === this.toolId;
    },
  },
  methods: {
    click() {
      if (this.disabled) return;
      if (this.stateful) {
        this.$parent.click(this.toolId);
      }
      this.$emit('click', this.toolId);
    },
  },
  render() {
    let iconContent;

    if (this.icon && !this.textButton) {
      // iconContent = <CIcon type={this.icon} class="concrete-toolbar-svg" />;
      iconContent = h(CIcon, { type: this.icon });
    } else if (this.textButton) {
      iconContent = h('button', {}, this.name);
    } else {
      iconContent = this.$slots.default();
    }

    let classProp = 'flex items-center justify-center h-8 w-8 p-1 border border-transparent rounded';
    if (this.isActive) {
      classProp += ' concrete-toolbar-tool concrete active';
    } else {
      classProp += ' concrete-toolbar-tool concrete';
    }
    if (!this.disabled && this.hoverable) {
      classProp += ' hover:bg-gray-50 hover:border-gray-300';
    }

    if (this.disabled) {
      classProp += ' text-gray-400 cursor-not-allowed'
    }

    return h('div', { class: classProp, onClick: this.click }, iconContent);
  },
};

const CToolbar = {
  name: 'CToolbar',
  props: {
    value: { type: String, default: null },
    showToolNames: { type: Boolean, default: false },
    defaultTool: { type: String, default: null },
  },
  data() {
    return {
      selected: { toolId: this.value },
    };
  },
  provide() {
    return {
      concreteSelectedTool: this.selected,
    };
  },
  watch: {
    value: {
      handler() {
        this.$set(this.selected, 'toolId', this.value);
      },
    },
  },
  methods: {
    click(toolId) {
      this.$set(this.selected, 'toolId', toolId);
      this.$emit('input', this.selected.toolId);
    },
  },
};

export default CToolbar;

export { CToolbar, CToolGroup, CTool };
</script>

<style lang="scss" scoped>

.concrete-toolbar > * + * {
  margin-left: .25rem;
  padding-left: .25rem;
  //border-left: $border-sm solid $color-gray-04;
}

:deep(.concrete-toolbar-tool) {

  .concrete-toolbar-svg {
    //height: 1.25rem;
    //flex-grow: 1;
  }

  &.disabled, &:disabled {
    cursor: not-allowed;
    //color: $color-gray-06;
  }
}


</style>
