import CNumericInput from '../NumericInput.vue';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// REVIEW: Setting default export enables test-runner to find the play function
export default {
  title: 'Components/Input/NumericInput',
  component: CNumericInput,
  argTypes: {
    size: {
      options: ['lg', 'md', 'sm', 'xs'],
      control: { type: 'select' },
    },
    color: {
      options: [
        'default',
        'indigo',
        'sky',
        'steel',
        'success',
        'warning',
        'danger',
      ],
      control: { type: 'select' },
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    transparent: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    onEnter: {
      table: { disable: true },
    },
    onBlur: {
      table: { disable: true },
    },
  },
};

const baseTemplate = /*html*/ `<CNumericInput v-bind="args" :modelValue="args.modelValue" @update:modelValue="updateModelValue" id="numeric-input" />`;

export const Overview = (args, { updateArgs }) => ({
  components: { CNumericInput },
  setup() {
    return { args };
  },
  methods: {
    updateModelValue(modelValue) {
      updateArgs({ ...args, modelValue });
    },
  },
  template: baseTemplate,
});

export const Disabled = (args) => ({
  components: { CNumericInput },
  setup() {
    return { args };
  },
  template: baseTemplate,
});

export const Placeholder = (args) => ({
  components: { CNumericInput },
  setup() {
    return { args };
  },
  template: baseTemplate,
});

export const ReadOnly = (args) => ({
  components: { CNumericInput },
  setup() {
    return { args };
  },
  template: baseTemplate,
});

Overview.args = {
  size: 'md',
  color: 'default',
  onEnter: undefined,
  onBlur: undefined,
  disabled: false,
  readOnly: false,
  transparent: false,
  placeholder: '',
  modelValue: 0,
};

Placeholder.args = {
  placeholder: 'Numeric input placeholder',
};

Disabled.args = {
  disabled: true,
};

ReadOnly.args = {
  readOnly: true,
};

Overview.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const input = document.getElementById('numeric-input');

  // testing that blank input is not allowed
  await userEvent.clear(input);
  await userEvent.type(input, ' ');
  await expect(input.value).toBe('');

  // testing non-numeric input results in only numeric input being allowed
  await userEvent.clear(input);
  await userEvent.type(input, '!>a4');
  await expect(input.value).toBe('4');

  // test that blank characters before input is discarded and only numeric input is kept
  await userEvent.clear(input);
  await userEvent.type(input, '    9');
  await expect(input.value).toBe('9');

  // test that blank characters after input is discarded and only numeric input is kept
  await userEvent.clear(input);
  await userEvent.type(input, '9    ');
  await expect(input.value).toBe('9');

  // // test that negative input is allowed
  // await userEvent.clear(input);
  // await userEvent.type(input, '-8');
  // await expect(input.value).toBe('-8');

  // // test that positive input special characters are discarded and only numeric input is kept
  // await userEvent.clear(input);
  // await userEvent.type(input, '+0');
  // await expect(input.value).toBe('8');

  console.log('model value: ', args.modelValue);
};

Disabled.play = async () => {
  const input = document.getElementById('numeric-input');

  // testing that input is not allowed
  await userEvent.type(input, '215151');
  await expect(input.value).toBe('');
};

Placeholder.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // 👇 Assert DOM structure
  await expect(
    canvas.getByPlaceholderText('Numeric input placeholder')
  ).toBeInTheDocument();
};

ReadOnly.play = async () => {
  const input = document.getElementById('numeric-input');

  // testing that input does not change
  await userEvent.type(input, '4');
  await expect(input.value).toBe('');
};

// TODO:
// Testing Min, Max and Step will not work with the current testing library
// as it cannot access native html input increment/decrement buttons
// and the component does not support correcting incorrect values on input change
