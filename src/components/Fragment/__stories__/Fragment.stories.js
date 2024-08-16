import CFragment from "../Fragment.vue";
import CCheckbox from "../../Checkbox/Checkbox.vue";

const componentTemplate = (args) => ({
  components: { CFragment, CCheckbox },
  setup() {
    return { args };
  },
  data() {
    return { value: true };
  },
  template:
    '<CFragment v-bind="args"><CCheckbox v-bind="args" :wrap="false" v-model="value"></CCheckbox></CFragment>',
});

export default {
  title: "Components/Low level/Fragment",
  component: CFragment,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
};
