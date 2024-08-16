import CSelectFileType from "../SelectFileType.vue";
import CSelectFileTypeItem from "../SelectFileTypeItem.vue";

const componentTemplate = (args) => ({
  components: { CSelectFileType, CSelectFileTypeItem },
  setup() {
    return { args };
  },
  data() {
    return {
      point: { x: 50, y: 50 },
    };
  },
  methods: {},
  template: `<CSelectFileType v-bind="args"></CSelectFileType>
`,
});

export default {
  title: "Components/Input/SelectFileType",
  component: CSelectFileType,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",

  args: {
    types: [
      {
        ext: ".ext1",
        label: "Label1",
      },
      {
        ext: ".ext2",
        label: "Label2",
      },
      {
        ext: ".ext3",
        label: "Label3",
      },
    ],

    currentFileType: ".ext1",
  },
};
