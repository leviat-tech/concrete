import CListbox from "../Listbox.vue";

const componentTemplate = (args) => ({
  components: { CListbox },
  setup() {
    return { args };
  },
  data() {
    return {
      value: null,
    };
  },
  template: '<CListbox v-bind="args" v-model="value"></CListbox>',
});

const componentTemplateMultiple = (args) => ({
  components: { CListbox },
  setup() {
    return { args };
  },
  data() {
    return {
      value: [],
    };
  },
  template: '<CListbox v-bind="args" v-model="value"></CListbox>',
});

export default {
  title: "Components/Input/Listbox",
  component: CListbox,

  argTypes: {
    size: {
      options: ["lg", "md", "sm", "xs"],

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

    placeholder: {
      control: "text",
    },

    disabled: {
      control: "boolean",
    },

    transparent: {
      control: "boolean",
    },

    optionListSize: {
      options: ["lg", "md", "sm", "xs", "auto"],

      control: {
        type: "select",
      },
    },

    options: {
      table: {
        disable: true,
      },
    },

    modelValue: {
      table: {
        disable: true,
      },
    },

    formatter: {
      table: {
        disable: true,
      },
    },

    multiple: {
      table: {
        disable: true,
      },
    },

    onChange: {
      table: {
        disable: true,
      },
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  height: "250px",

  args: {
    options: ["Listbox", "Test", "Values", "Storybook"],
  },
};

export const Multiple = {
  render: componentTemplateMultiple.bind({}),
  name: "Multiple",
  height: "250px",

  args: {
    options: ["Listbox", "Test", "Values", "Storybook"],
    multiple: true,
  },
};

export const Formatted = {
  render: componentTemplateMultiple.bind({}),
  name: "Formatted",
  height: "250px",

  args: {
    options: ["Listbox", "Test", "Values", "Storybook"],
    formatter: (l) => l.toUpperCase(),
  },
};