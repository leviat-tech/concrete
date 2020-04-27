<template>
  <div class="concrete-toolbar">
    <slot />
  </div>
</template>

<script>
import CIcon from '@/components/Icon';


const CToolGroup = {
  functional: true,
  name: 'CToolGroup',
  render(h, { scopedSlots }) {
    return (
      <div class="concrete-toolbar-group">
        { scopedSlots.default() }
      </div>
    );
  },
};

const CTool = {
  name: 'CTool',
  components: { CIcon },
  props: {
    name: { type: String, default: '' },
    toolId: { type: String, required: true },
    icon: { type: String, default: null },
  },
  inject: ['concreteSelectedTool'],
  computed: {
    isActive() {
      return this.concreteSelectedTool.toolId === this.toolId;
    },
  },
  methods: {
    click() { this.$parent.click(this.toolId); },
  },
  render() {
    return (
      <div
        class={this.isActive ? 'concrete-toolbar-tool active' : 'concrete-toolbar-tool'}
        vOn:click={this.click}
      >
        {this.icon
          ? <CIcon
              type={this.icon}
              class="concrete-toolbar-svg"
            />
          : this.$scopedSlots.default()
        }
      </div>
    );
  },
};

const CToolbar = {
  name: 'CToolbar',
  props: {
    value: { type: String, default: null },
    showToolNames: { type: Boolean, default: false },
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

<style lang="scss">
@import '../assets/styles/variables.scss';

.concrete-toolbar {
  padding: .25rem;
  display: flex;
  align-items: center;
}

.concrete-toolbar > * + * {
  margin-left: .25rem;
  padding-left: .25rem;
  border-left: $border-sm solid $color-gray-04;
}

.concrete-toolbar-group {
  display: flex;
  align-items: center;
}

.concrete-toolbar-group > * + * {
  margin-left: .25rem;
}

.concrete-toolbar-tool {
  min-width: 2rem;
  height: 2rem;
  line-height: 2rem;
  padding: 0.25rem;
  text-align: center;
  display: flex;
  align-items: center;

  &:hover {
    background-color: $color-gray-01;
    border: $border-sm solid $color-gray-04;
    border-radius: $radius;
  }

  &.active {
    background-color: $color-gray-03;
    border: $border-sm solid $color-gray-04;
    border-radius: $radius;
  }

  .concrete-toolbar-svg, svg {
    height: 1.25rem;
    flex-grow: 1;
  }
}


</style>
