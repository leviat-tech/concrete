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
      child.tabIndex = index % (this.$children.length / 2); // eslint-disable-line
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
  box-sizing: border-box;
}

.concrete-tab-switcher * {
  box-sizing: border-box;
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
  transition: opacity .1s ease .1s,
              visibility 0s linear .1s,
              left .1s ease-in .1s;
  transform: translate(0, 0);
  left: 0;
  opacity: 1;
  visibility: visible;

  &.hide {
    transition: opacity .1s ease 0s,
                visibility 0s linear .1s,
                transform .1s ease-in 0s,
                left 0s linear .2s;
    opacity: 0;
    transform: translate(15%, 0);
    visibility: hidden;
    left: -30%;
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
    height: 3rem;
    line-height: 3rem;
    cursor: pointer;
    font-size: $text-sm;
    width: 100%;
    text-align: center;
    border-right: $border-sm solid $color-gray-04;

    &:last-of-type {
      border-right: none;
    }

    &:hover, &.active {
      background-color: $color-gray-01;
    }

    &.active {
      font-weight: bold;
    }
  }
}
</style>
