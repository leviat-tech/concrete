import CFormSection from "../FormSection.vue";
import CTextInput from "../../TextInput/TextInput.vue";

const componentTemplate = (args) => ({
  components: { CFormSection },
  setup() {
    return { args };
  },
  data() {
    return { value: true };
  },
  template: `
  <CFormSection  title="Registration Form 1 - (xs)" size="xs">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 py-4">
                <CTextInput label="First Name" />
                <CTextInput label="Last Name" />
                <CTextInput label="Email Address">
      </div>
    <template #toolbar>
              <span class="cursor-pointer mr-2 mt-1" @click="addLayer">
                <button class="border">add me</button>
              </span>
    </template>
  </CFormSection>`,
});

export default {
  title: "Components/Low level/FormSection",
  component: CFormSection,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
};
