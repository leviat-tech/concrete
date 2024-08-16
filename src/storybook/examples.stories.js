import CNumericInput from "../components/NumericInput/NumericInput.vue";

export default {
  title: "Concrete/Examples",
  component: CNumericInput,
};

export const GlobalInputHandler = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    data() {
      return {
        value: 1,
      };
    },

    template: `<CNumericInput v-bind="args" v-model="value" id="globalHandler" />`,
  }),

  name: "Global Input Handler",

  args: {
    onEnter: undefined,
  },
};

export const LocalInputHandler = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    data() {
      return {
        value: 1,
      };
    },

    methods: {
      alert(msg) {
        alert(msg);
      },
    },

    template: `
<CNumericInput v-model="value"
               id="localHandler"
               @enter="alert('This is a custom handler for the localHandler input. Value: ' + value)"/>`,
  }),

  name: "Local Input Handler",

  args: {
    onEnter: null,
  },
};
