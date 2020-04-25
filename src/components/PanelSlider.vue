<script>
import get from 'lodash/get';
import partition from 'lodash/partition';
import BackArrow from '../assets/chevron-left.svg';
import ForwardArrow from '../assets/chevron-right.svg';
import cloneVnode from '../utils/cloneVnode';


const TitleBar = {
  name: 'TitleBar',
  components: { BackArrow },
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
      <div class="concrete-panel-titlebar">
        {this.back
          && <div
            class="concrete-panel-back"
            vOn:click={this.goBack}
          >
            <BackArrow />
            {this.back}
          </div>
        }
        {this.title}
      </div>
    );
  },
};

const CPanelLink = {
  name: 'CPanelLink',
  components: { ForwardArrow },
  props: {
    linkTo: { type: String, required: true },
  },
  methods: {
    clickLink() { this.$parent.drillDown(this.linkTo); },
  },
  render() {
    return (
      <div
        class="concrete-panel-link"
        vOn:click={this.clickLink}
      >
        { this.$scopedSlots.default() }
        <ForwardArrow />
      </div>
    );
  },
};

const CPanel = {
  name: 'CPanel',
  props: {
    panelId: { type: String, default: null },
    title: { type: String, default: '' },
  },
  methods: {
    drillDown(id) {
      this.$parent.drillDown(id);
    },
  },
  render() {
    const slots = this.$scopedSlots.default();

    const contents = slots.filter((s) => get(s, 'componentOptions.tag') !== 'c-panel');

    return (
      <div class="concrete-panel-content">
        { contents }
      </div>
    );
  },
};

const CPanelSlider = {
  name: 'CPanelSlider',
  props: {
    title: { type: String, default: '' },
  },
  data() {
    return {
      panelState: [],
    };
  },
  methods: {
    drillDown(id) {
      this.panelState.push(id);
    },
    goBack() {
      this.panelState.pop();
    },
  },
  render(h) {
    const rootVnodes = this.$slots.default || [];

    const [rootPanels, rootContents] = partition(
      rootVnodes,
      (s) => get(s, 'componentOptions.tag') === 'c-panel',
    );

    const panelList = this.panelState.reduce(({ vnodes, panels }, id) => {
      const current = panels.find(
        (p) => id === get(p, 'componentOptions.propsData.panelId'),
      );

      const prevPanel = vnodes[vnodes.length - 1];
      const back = prevPanel
        ? get(prevPanel, 'componentOptions.propsData.title')
        : this.title;

      const clone = cloneVnode(h, current);
      vnodes.push(clone);

      const childPanels = current.componentOptions.children.filter(
        (s) => get(s, 'componentOptions.tag') === 'c-panel',
      );

      return {
        back,
        title: get(clone, 'componentOptions.propsData.title'),
        vnodes,
        panels: childPanels,
      };
    }, { back: null, title: this.title, vnodes: [], panels: rootPanels });

    const depth = this.panelState.length;

    return (
      <div class="concrete-panel-container">
        <div class="concrete-panel">
          <TitleBar
            title={panelList.title}
            back={panelList.back}
            vOn:go-back={this.goBack}
          />
        </div>
        <div
          class="concrete-panel-content-container"
          style={`transform: translate(-${depth * 100}%, 0)`}
        >
          <div class="concrete-panel-content">
            { rootContents }
          </div>
          {
            panelList.vnodes
          }
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
};
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.concrete-panel-titlebar {
  position: relative;
  font-size: $text-base;
  width: 100%;
  text-align: center;
  font-weight: bold;
  background-color: $color-gray-01;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: $border-sm solid $color-gray-04;
}

.concrete-panels-hidden {
  display: none;
}

.concrete-panel-link {
  cursor: pointer;
  width: 100%;
  padding: 0.75rem;
  border-top: $border-sm solid transparent;
  border-bottom: $border-sm solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: $color-gray-01;
    border-color: $color-gray-04;
  }
}

.concrete-panel-back {
  position: absolute;
  height: 1rem;
  top: 50%;
  margin-top: -0.5rem;
  padding-left: 0.75rem;
  cursor: pointer;
  font-size: $text-sm;
  font-weight: normal;
  color: $color-blue;

  .svg-inline {
    margin-right: 0.5rem;
  }
}

.concrete-panel-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.concrete-panel-content-container {
  display: flex;
  transition: transform .2s ease;
}

.concrete-panel-content {
  width: 100%;
  flex: none;
}

</style>
