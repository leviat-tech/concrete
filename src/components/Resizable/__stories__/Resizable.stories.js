import { CResizable, CPane } from "..";

const componentTemplate = (args) => ({
  components: { CResizable, CPane },
  setup() {
    return { args };
  },
  data() {
    return {
      point: { x: 50, y: 50 },
    };
  },
  methods: {},
  template: `<CResizable v-bind="args" class="my-8 bg-sky-light h-96 flex ">
  <CPane class="border-r-2 border-indigo" primary :min="35">
    <div class="text-2xl bg-success-lightest text-success font-bold text-center h-96 py-32">1</div>
  </CPane>
  <CPane class="" :min="20">
    <div class="text-2xl bg-danger-lightest text-danger font-bold text-center h-96 py-32">2</div>
  </CPane>
</CResizable>
`,
});

export default {
  title: "Components/High level/Resizable",
  component: CResizable,

  argTypes: {
    splitter: {
      options: ["default", "thick", "thin"],

      control: {
        type: "select",
      },
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  args: {},
};
