<script>
import get from 'lodash/get';
import partition from 'lodash/partition';
import BackArrow from '../assets/chevron-left.svg';
import ForwardArrow from '../assets/chevron-right.svg';
// import cloneVnode from '../utils/cloneVnode';


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

// const CPanel = {
//   name: 'CPanel',
//   components: { CPanelLink, TitleBar },
//   props: {
//     panelId: { type: String, default: null },
//     title: { type: String, default: '' },
//   },
//   data() {
//     return {
//       showChild: null,
//     };
//   },
//   render(h) { // eslint-disable-line
//     const vnodes = this.$slots.default || [];

//     const [panels, content] = partition( // eslint-disable-line
//       vnodes,
//       (vnode) => get(vnode, 'componentOptions.tag') === 'c-panel',
//     );

//     const childPanel = this.showChild
//       ? panels.find((p) => this.showChild === get(p, 'componentOptions.propsData.panelId'))
//       : [];

//     return (
//       <div class="concrete-panel-content">
//         { content }
//         {
//           childPanel
//         }
//       </div>
//     );
//   },
// };

const CPanel = {
  functional: true,
  name: 'CPanel',
  props: {
    panelId: { type: String, default: null },
    title: { type: String, default: '' },
    showChild: { type: String, default: null },
  },
  render(h, { props, scopedSlots }) {
    console.log('PROPS', props);
    const slots = scopedSlots.default();
    const [panels, contents] = partition( // eslint-disable-line
      slots,
      (s) => get(s, 'fnOptions.name') === 'CPanel' && !get(s, 'tag'),
    );

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
  render(h) { // eslint-disable-line
    const vnodes = this.$slots.default || [];

    const [rootPanels, rootContents] = partition(
      vnodes,
      (s) => get(s, 'fnOptions.name') === 'CPanel',
    );

    console.log('rp', rootPanels[0]);

    const panels = this.panelState.reduce((data, id) => {
      const current = data.panels.find((p) => id === get(p, 'fnOptions.propsData.panelId'));
      data.vnodes.push(current);

      console.log('current', current);

      // set new data.panels
      return data;
    }, { vnodes: [], panels: rootPanels });

    console.log('PANEL LIST:', panels.vnodes);

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
            // panels.vnodes
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
