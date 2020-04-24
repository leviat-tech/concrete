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
  components: { CPanelLink, TitleBar },
  props: {
    panelId: { type: String, default: null },
    title: { type: String, default: '' },
  },
  data() {
    return {
      panels: [],
    };
  },
  render(h) { // eslint-disable-line
    const vnodes = this.$slots.default || [];

    const [panels, content] = partition(
      vnodes,
      (vnode) => get(vnode, 'componentOptions.tag') === 'c-panel',
    );

    this.panels = panels;

    return (
      <div class="concrete-panel-content">
        { content }
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
      showChild: null,
    };
  },
  methods: {
    drillDown(id) {
      this.showChild = id;
    },
    goBack() {
      this.showChild = null;
    },
  },
  render(h) { // eslint-disable-line
    const vnodes = this.$slots.default || [];

    const [rootPanels, rootContents] = partition(
      vnodes, (n) => get(n, 'componentOptions.tag') === 'c-panel',
    );

    const panelList = [];
    if (this.showChild) {
      const childPanel = rootPanels.find(
        (p) => {
          console.log('showchild', this.showChild);
          console.log('pid', get(p, 'componentOptions.propsData.panelId'));
          return this.showChild === get(p, 'componentOptions.propsData.panelId');
        },
      );

      console.log('cp', childPanel);

      panelList.push(cloneVnode(childPanel));
    }

    // const panelList = [];
    // let thisNodePanels = rootPanels;
    // this.panelState.forEach((id, index, arr) => {
    //   const thisPanel = thisNodePanels.find(
    //     (p) => id === get(p, 'componentOptions.propsData.panelId'),
    //   );

    //   const vnode = cloneVnode(h, thisPanel);

    //   const slots = vnode.$slots.default || [];

    //   const [panels, contents] = partition( // eslint-disable-line
    //     slots, (n) => get(n, 'componentOptions.tag') === 'c-panel',
    //   );

    //   panelList.push(vnode);

    //   if (arr.length > index + 1) {
    //     thisNodePanels = panels;
    //   }
    // });

    console.log('PANEL LIST:', panelList);

    return (
      <div class="concrete-panel-container">
        <div class="concrete-panel">
          <TitleBar
            title={this.title}
            vOn:go-back={this.goBack}
          />
        </div>
        <div class="concrete-panel-content-container">
          <div class="concrete-panel-content">
            { rootContents }
          </div>
          {
            panelList
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
  // overflow-x: hidden;
}

.concrete-panel-content-container {
  display: flex;
}

.concrete-panel-content {
  width: 100%;
  flex: none;
}

</style>
