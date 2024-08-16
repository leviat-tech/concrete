import CFormElement from "../FormElement.vue";
import CTextInput from "../../TextInput/TextInput.vue";

const componentTemplate = (args) => ({
  components: { CFormElement, CTextInput },
  setup() {
    return { args };
  },
  data() {
    return { value: true };
  },
  template:
    '<CFormElement label="Full name"><div class="flex space-x-2"><CTextInput v-bind="args" no-label ></CTextInput><CTextInput v-bind="args" no-label></CTextInput></div></CFormElement>',
});

export default {
  title: "Components/Low level/FormElement",
  component: CFormElement,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",

  args: {
    id: "formelementtest",
    size: "md",
  },
};
