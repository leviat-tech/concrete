import CNumericInput from '../NumericInput.vue';
import { userEvent, screen, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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

Overview.args = {
  size: 'md',
  color: 'default',
  onEnter: undefined,
  onBlur: undefined,
  disabled: false,
  readOnly: false,
  transparent: false,
  placeholder: '',
};

Overview.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  // Check that labels array is the same length as the number of visible tabs
  const tabs = await screen.findByRole('tablist');
  // Check that the all tabs are visible and match the labels prop supplied
  for (const tab of tabs.children) {
    const label = tab.innerText;
    // Check that the tab on screen is visible
    const htmlTab = await screen.findByText(label);
    expect(htmlTab).toBe(tab);
  }
  // Click on the second tab and assert that panel is displayed
  await userEvent.click(canvas.getByRole('tab', { name: 'Tab 2' }));
  await screen.findByText('Panel 2');
  // Click on the third tab and assert that panel is displayed
  await userEvent.click(canvas.getByRole('tab', { name: 'Tab 3' }));
  await screen.findByText('Panel 3');
  // Click on the first tab and assert that panel is displayed
  await userEvent.click(canvas.getByRole('tab', { name: 'Tab 1' }));
  await screen.findByText('Panel 1');
};
