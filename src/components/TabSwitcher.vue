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
  name: 'CTabLabel',
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
  render() {
    return (
      <div
        class={this.isActive ? 'active label' : 'label'}
        vOn:click={this.clickTab}
      >
        { this.$scopedSlots.default() }
      </div>
    );
  },
};

const CTab = {
  name: 'CTab',
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
  render() {
    return (
      <div class={!this.isActive ? 'concrete-content-box hide' : 'concrete-content-box'}>
        { this.$scopedSlots.default() }
      </div>
    );
  },
};

const CTabSwitcher = {
  name: 'CTabSwitcher',
  props: {
    tabPosition: {
      type: String,
      default: 'top',
      validator: (prop) => ['top', 'bottom'].includes(prop),
    },
  },
  data() {
    return {
      activeTab: { index: 0 },
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

.concrete-tab-switcher {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.concrete-tab-content {
  position: relative;
  flex-grow: 1;
  overflow: hidden;
}

.concrete-content-box {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
  transition: opacity .15s ease .15s, visibility 0s linear .15s, transform .15s ease-in .15s;
  transform: translate(0, 0);
  opacity: 1;
  visibility: visible;

  &.hide {
    transition: opacity .15s ease 0s, visibility 0s linear .15s, transform .15s ease-in 0s;
    opacity: 0;
    transform: translate(-100%, 0);
    visibility: hidden;
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
