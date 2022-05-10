<script>
import get from 'lodash/get';
import CIcon from '@/components/Icon';
// import cloneVnode from '../utils/cloneVnode';


const TitleBar = {
  name: 'TitleBar',
  components: { CIcon },
  props: {
    title: { type: String, default: '' },
    back: { type: String, default: null },
  },
  methods: {
    goBack() {
      this.$emit('go-back');
    },
  },
  render() {
    return (
      <div class="concrete-panel-titlebar concrete">
        {this.back && (
          <div
            class="concrete-panel-back concrete"
            vOn:click={this.goBack}
          >
            <CIcon type="chevron-left" />
            {this.back}
          </div>
        )}
        {this.title}
      </div>
    );
  },
};

const CPanelLink = {
  name: 'CPanelLink',
  components: { CIcon },
  props: {
    linkTo: { type: String, required: true },
    styled: { type: Boolean, default: true },
    size: { type: String, default: 'base' },
  },
  inject: ['drillDown'],
  methods: {
    clickLink() { this.drillDown(this.linkTo); },
  },
  render() {
    if (this.styled) {
      return (
        <div
          class={`concrete-panel-link concrete ${this.size}`}
          vOn:click={this.clickLink}
        >
          <div class="concrete-panel-link-content">
            { this.$scopedSlots.default() }
          </div>
          <CIcon type="chevron-right" />
        </div>
      );
    }
    return (
      <div vOn:click={this.clickLink}>{ this.$scopedSlots.default() }</div>
    );
  },
};
const CPanel = {
  name: 'CPanel',
  props: {
    panelId: { type: String, required: true },
    title: { type: String, default: '' },
  },
  inject: ['updatePanel'],
  created() {
    this.updatePanel(this.$vnode);
  },
  updated() {
    this.updatePanel(this.$vnode);
  },
  render() {
    return null;
  },
};

const CPanelContainer = {
  name: 'CPanelContainer',
  render() {
    const panel = this.$slots.default[1];
    const toRender = panel.componentInstance.$scopedSlots.default();
    return <div class="concrete-panel-content concrete"> { toRender } </div>;
  },
};

const CPanelSection = {
  functional: true,
  name: 'CPanelSection',
  render(h, { scopedSlots }) {
    return [
      ...scopedSlots.default(),
      <div class="concrete-panel-divider concrete" />,
    ];
  },
};
const CPanelSlider = {
  name: 'CPanelSlider',
  props: {
    title: { type: String, default: '' },
  },
  data() {
    return {
      panels: {},
      panelState: [],
    };
  },
  components: { CPanelContainer },
  methods: {
    drillDown(id) {
      this.panelState.push(id);
    },
    goBack() {
      this.panelState.pop();
    },
    updatePanel(panel) {
      const panelId = panel.componentOptions.propsData.panelId;
      this.$set(this.panels, panelId, panel);
    },
  },
  provide() {
    return {
      drillDown: this.drillDown,
      updatePanel: this.updatePanel,
      goBack: this.goBack,
    };
  },
  render() {
    const rootVnodes = this.$scopedSlots.default() || [];
    const depth = this.panelState.length;
    const panelList = this.panelState.map((id) => this.panels[id]);
    const title = get(panelList[panelList.length - 1], 'componentOptions.propsData.title', this.title);
    let back;
    if (depth === 0) {
      back = null;
    } else if (depth === 1) {
      back = this.title;
    } else {
      back = get(panelList[panelList.length - 2], 'componentOptions.propsData.title', this.title);
    }

    return (
      <div class="concrete-panel-container concrete">
        <div class="concrete-panel-title-wrapper concrete">
          <TitleBar
            title={title}
            back={back}
            vOn:go-back={this.goBack}
          />
        </div>
        <div class="concrete-panel-content-wrapper concrete">
          <div
            class="concrete-panel-content-container concrete"
            style={`transform: translate(-${depth * 100}%, 0)`}
          >
            <div class="concrete-panel-content concrete">
              { rootVnodes }
            </div>
            { panelList.map((panel) => <c-panel-container> { panel } </c-panel-container>) }
          </div>
        </div>
      </div>
    );
  },
};
export default CPanelSlider;
export {
  CPanelSlider,
  CPanel,
  CPanelLink,
  CPanelSection,
};
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';
.concrete-panel-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  flex-direction: column;
}
.concrete-panel-container * {
  box-sizing: border-box;
}
.concrete-panel-title-wrapper {
  flex: none;
}
.concrete-panel-content-wrapper {
  flex: 1 1 0%;
  overflow: auto;
}
.concrete-panel-titlebar {
  position: relative;
  font-size: $text-base;
  width: 100%;
  text-align: center;
  font-weight: bold;
  background-color: $color-gray-01;
  height: 3rem;
  box-sizing: content-box;
  border-bottom: $border-sm solid $color-gray-04;
  line-height: 3rem;
}
.concrete-panels-hidden {
  display: none;
}
.concrete-panel-link {
  cursor: pointer;
  box-sizing: content-box;
  margin-left: -1rem;
  width: 100%;
  padding: .75rem 1rem .75rem 1rem;
  border-top: $border-sm solid transparent;
  border-bottom: $border-sm solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .concrete-panel-link-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &.xs {
    font-size: $text-xs;
    padding-top: .25rem;
    padding-bottom: .25rem;
  }
  &.sm {
    font-size: $text-sm;
    padding-top: .5rem;
    padding-bottom: .5rem;
  }
  &.lg {
    font-size: $text-lg;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  &:hover {
    background-color: $color-gray-01;
    border-color: $color-gray-04;
  }
}
.concrete-panel-back {
  position: absolute;
  height: 1rem;
  padding-left: 1rem;
  cursor: pointer;
  font-size: $text-sm;
  font-weight: normal;
  color: $color-blue;
  .svg-inline {
    margin-right: 0.5rem;
  }
}
.concrete-panel-content-container {
  display: flex;
  transition: transform .2s ease;
  padding: 1rem;
}
.concrete-panel-content {
  width: 100%;
  margin-right: 2rem;
  flex: none;
}
.concrete-panel-divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: -1rem;
  border-bottom: $border-sm solid $color-gray-04;
  width: calc(100% + 2rem);
  &:last-of-type {
    border-bottom: $border-sm solid transparent;
  }
}
</style>
