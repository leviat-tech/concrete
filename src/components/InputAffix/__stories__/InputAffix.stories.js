import CInputAffix from "../InputAffix.vue";
import CTextInput from "../../TextInput/TextInput.vue";

const componentTemplate = (args) => ({
  components: { CInputAffix, CTextInput },
  setup() {
    return { args };
  },
  data() {
    return { value: true };
  },
  template: `
<CTextInput class="" size="md">
    <template v-slot:prefix>
      <CInputAffix>+44</CInputAffix>
    </template>
  </CTextInput>`,
});

export default {
  title: "Components/Low level/InputAffix",
  component: CInputAffix,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
};
