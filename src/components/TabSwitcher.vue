<template>
  <div class="concrete-tab-switcher concrete">
    <div v-if="tabPosition === 'top'" class="concrete-tab-labels top concrete">
      <slot name="labels" @click-tab="clickTab" />
    </div>
    <div class="concrete-tab-content concrete">
      <slot name="content" />
    </div>
    <div v-if="tabPosition === 'bottom'" class="concrete-tab-labels bottom concrete">
      <slot name="labels" @click-tab="clickTab" />
    </div>
  </div>
</template>

<script>
const CTabLabel = {
  name: 'ConcreteTabLabel',
  data() {
    return {
      index: null,
    };
  },
  inject: ['concreteActiveTab'],
  computed: {
    isActive() {
      return this.concreteActiveTab.index === this.index;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.index = this.tabIndex;
    });
  },
  methods: {
    clickTab() {
      this.$parent.clickTab(this.index);
    },
  },
  render(h) {
    return h('div', {
      on: {
        click: this.clickTab,
      },
      class: ['label', { active: this.isActive }],
    }, this.$scopedSlots.default());
  },
};

const CTab = {
  name: 'ConcreteTab',
  data() {
    return {
      index: null,
    };
  },
  inject: ['concreteActiveTab'],
  computed: {
    isActive() {
      return this.concreteActiveTab.index === this.index;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.index = this.tabIndex;
    });
  },
  render(h) {
    return h('div', {
      class: ['content', { hide: !this.isActive }],
    }, this.$scopedSlots.default());
  },
};

const CTabSwitcher = {
  name: 'ConcreteTabSwitcher',
  props: {
    tabPosition: {
      type: String,
      default: 'top',
      validator: (prop) => ['top', 'bottom'].includes(prop),
    },
  },
  data() {
    return {
      activeTab: {
        index: 0,
      },
    };
  },
  provide() {
    return {
      concreteActiveTab: this.activeTab,
    };
  },
  methods: {
    clickTab(index) {
      this.$set(this.activeTab, 'index', index);
    },
  },
  mounted() {
    this.$children.forEach((child, index) => {
      child.tabIndex = index % 2; // eslint-disable-line
    });
  },
};

export default CTabSwitcher;

export {
  CTabSwitcher,
  CTabLabel,
  CTab,
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.concrete-tab-content {
  .hide {
    display: none;
  }
}

.concrete-tab-labels {
  display: flex;

  &.top {
    border-bottom: $border-sm solid $color-gray-04;
  }

  &.bottom {
    border-top: $border-sm solid $color-gray-04;
  }

  .label {
    font-size: $text-sm;
    width: 100%;
    text-align: center;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-right: $border-sm solid $color-gray-04;

    &:last-of-type {
      border-right: none;
    }

    &:hover, &.active {
      background-color: $color-gray-01;
    }
  }
}
</style>
