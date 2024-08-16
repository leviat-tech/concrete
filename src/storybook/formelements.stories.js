import CNumericInput from "../components/NumericInput/NumericInput.vue";

export default {
  title: "Concrete/Form Elements",
  component: CNumericInput,
};

export const Basic = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput />`,
  }),

  name: "Basic",
};

export const NoWrap = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput no-wrap />`,
  }),

  name: "No Wrap",
};

export const Label = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput label="Test Label" />`,
  }),

  name: "Label",
};

export const NoWrapAndLabel = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput label="Test Label" no-wrap />`,
  }),

  name: "No Wrap and Label",
};

export const NoLabelAndLabel = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput label="Test Label" no-label />`,
  }),

  name: "No Label and Label",
};

export const Id = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput id="firstname" />`,
  }),

  name: "ID",
};

export const IdAndNoWrap = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput id="firstname" no-wrap />`,
  }),

  name: "ID and No Wrap",
};

export const IdAndNoLabel = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput id="firstname" no-label />`,
  }),

  name: "ID and No Label",
};

export const IdAndLabel = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput id="firstname" label="First Name" />`,
  }),

  name: "ID and Label",
};

export const IdAndLabelAndLabelFormatter = {
  render: (args) => ({
    components: {
      CNumericInput,
    },

    setup() {
      return {
        args,
      };
    },

    template: `<CNumericInput id="firstname" label="First Name" :labelFormatter="(props) => props.id.toUpperCase()" />`,
  }),

  name: "ID and Label and Label Formatter",
};
