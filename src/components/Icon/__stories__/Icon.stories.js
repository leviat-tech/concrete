import CIcon, { icons } from "../Icon.vue";

const allIconsTemplate = (args) => ({
  components: { CIcon },
  setup() {
    return { args, icons };
  },
  template: `
    <div class="flex flex-wrap"></div>`,
});

const interactiveIconTemplate = (args) => ({
  components: { CIcon },
  setup() {
    return { args, icons };
  },
  template: `<CIcon v-bind="args" />`,
});

export default {
  title: "Components/Low Level/Icon",
  component: CIcon,

  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],

      control: {
        type: "select",
      },
    },

    type: {
      options: Object.keys(icons),

      control: {
        type: "select",
      },
    },

    color: {
      options: [
        "default",
        "indigo",
        "sky",
        "steel",
        "success",
        "warning",
        "danger",
      ],

      control: {
        type: "select",
      },
    },

    spin: {
      control: "boolean",
    },
  },
};

export const Overview = {
  render: interactiveIconTemplate.bind({}),
  name: "Overview",
  args: {
    size: "md",
    type: "hand",
    spin: false,
  },
};

export const IconsReference = {
  render: allIconsTemplate.bind({}),
  name: "Icons Reference",
};
