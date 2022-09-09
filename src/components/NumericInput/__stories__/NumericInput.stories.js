import CNumericInput from '../NumericInput.vue';
import { userEvent, screen, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { useArgs } from '@storybook/client-api';

// REVIEW: Setting default export enables test-runner to find the play function
export default {
  title: 'Components/Input/NumericInput',
  component: CNumericInput,
};

export const Overview = (args) => ({
  components: { CNumericInput },
  setup() {
    return { args };
  },
  template: /*html*/ `<CNumericInput v-bind="args" id="numeric-input" />`,
});

Overview.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const input = document.getElementById('numeric-input');

  // testing that blank input is not allowed
  await userEvent.type(input, ' ');
  await expect(input.value).toBe('');

  // testing non-numeric input results in only numeric input being allowed
  await userEvent.clear(input);
  await userEvent.type(input, '!>a4');
  await expect(input.value).toBe('4');

  // test that positive input special characters are discarded and only numeric input is kept
  await userEvent.clear(input);
  await userEvent.type(input, '+8');
  await expect(input.value).toBe('8');

  // test that blank characters before input is discarded and only numeric input is kept
  await userEvent.clear(input);
  await userEvent.type(input, '    9');
  await expect(input.value).toBe('9');

  // test that blank characters after input is discarded and only numeric input is kept
  await userEvent.clear(input);
  await userEvent.type(input, '9    ');
  await expect(input.value).toBe('9');

  // test that negative input is allowed
  await userEvent.clear(input);
  await userEvent.type(input, '-8');
  await expect(input.value).toBe('-8');
};
