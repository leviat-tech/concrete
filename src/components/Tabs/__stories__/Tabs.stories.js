import CTabs from '../Tabs.vue';
import CTabLabel from '../CTabLabel.vue';
import CTabPanel from '../CTabPanel.vue';
import { userEvent, screen, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// REVIEW: Setting default export enables test-runner to find the play function
export default {
  component: CTabs,
};

export const Overview = (args) => ({
  components: { CTabs, CTabPanel },
  setup() {
    return { args };
  },
  template: /*html*/ `
  <CTabs v-bind="args" class="border"> 
    <template #panels> 
      <CTabPanel>Panel 1</CTabPanel> 
      <CTabPanel>Panel 2</CTabPanel> 
      <CTabPanel>Panel 3</CTabPanel> 
    </template>
  </CTabs>`,
});

export const LabelSlots = (args) => ({
  components: { CTabs, CTabLabel, CTabPanel },
  setup() {
    return { args };
  },
  template: /*html*/ `
  <CTabs v-bind="args" class="border"> 
    <template #labels>
      <CTabLabel>Tab 1</CTabLabel>
      <CTabLabel>Tab 2</CTabLabel>
      <CTabLabel>Tab 3</CTabLabel>
    </template>
    <template #panels> 
      <CTabPanel>Panel 1</CTabPanel> 
      <CTabPanel>Panel 2</CTabPanel> 
      <CTabPanel>Panel 3</CTabPanel> 
    </template>
  </CTabs>`,
});

Overview.args = {
  labels: ['Tab 1', 'Tab 2', 'Tab 3'],
};

LabelSlots.play = async ({ canvasElement }) => {
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

Overview.play = async ({ args, canvasElement }) => {
  // Use label slots test as base case for this test
  await LabelSlots.play({ canvasElement });

  // Check that labels array is the same length as the number of visible tabs, using args (props) passed in
  const tabs = await screen.findByRole('tablist');
  const numberOfTabs = tabs.children.length;
  const numberOfLabelsArg = args.labels.length;
  expect(numberOfTabs).toBe(numberOfLabelsArg);
};
