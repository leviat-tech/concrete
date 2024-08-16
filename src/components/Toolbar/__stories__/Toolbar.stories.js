import { CToolbar, CToolGroup, CTool } from "..";

const componentTemplate = (args) => ({
  components: { CToolbar, CToolGroup, CTool },
  setup() {
    return { args };
  },
  data() {
    return {
      value: "arrow-up",
      lastClicked: null,
    };
  },
  methods: {
    onClick(toolId) {
      this.lastClicked = toolId;
      setTimeout(() => (this.lastClicked = null), 1000);
    },
  },
  template: `<CToolbar v-bind="args" v-model="value">
  <CToolGroup>
    <CTool name="Grid" tool-id="grid" icon="grid" stateful />
    <CTool name="List" tool-id="list" icon="list" stateful />
  </CToolGroup>
  <CToolGroup divider-left>
    <CTool name="Undo" tool-id="arrow-left" icon="arrow-left" @click="onClick" />
    <CTool name="Redo" tool-id="arrow-right" icon="arrow-right" @click="onClick" />
  </CToolGroup>
  <CToolGroup divider-left divider-right>
    <CTool name="Disabled icon" tool-id="image" icon="image" disabled />
    <CTool name="Not hoverable" tool-id="play" icon="play" :hoverable="false" />
    <CTool name="Text button" tool-id="text" textButton @click="onClick" stateful />
  </CToolGroup>
  <div class="text-sm ml-12">
    <div>Current: <b>{{ value }}</b></div>
    <div>Clicked: <b>{{ lastClicked }}</b></div>
  </div>
</CToolbar>`,
});

export default {
  title: "Components/High level/Toolbar",
  component: CToolbar,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  args: {},
};
