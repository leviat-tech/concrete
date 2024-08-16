import CModal from "../Modal.vue";
import CButton from "../../Button/Button.vue";

const componentTemplate = (args) => ({
  components: { CModal, CButton },
  setup() {
    return { args };
  },
  data() {
    return { show: args.show };
  },
  template: `
<CButton @click="show = true">Click to open modal</CButton>
<CModal v-bind="args" :show="show" @close="show = false" :title="args.title">
  <div class="flex items-center">{{ args.content }}</div>
  <CButton v-if="!args.closeable" class="mt-4" @click="show = false">Dismiss</CButton>
</CModal>
  `,
});

export default {
  title: "Components/High level/Modal",
  component: CModal,

  argTypes: {
    size: {
      options: ["lg", "md"],

      control: {
        type: "select",
      },
    },

    show: {
      control: "boolean",
    },

    closeable: {
      control: "boolean",
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",

  args: {
    size: "md",
    title: "Modal title",
    content: "Modal content",
    show: false,
    closeable: true,
  },
};
