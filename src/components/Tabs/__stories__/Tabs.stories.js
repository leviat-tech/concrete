import CTabs from '../Tabs.vue';
import CTabPanel from '../CTabPanel.vue';

export const Overview = () => ({
  components: { CTabs, CTabPanel },
  template: /*html*/ `
  <CTabs :labels="['Tab 1','Tab 2','Tab 3']" class="border"> 
    <template #panels> 
      <CTabPanel>Panel 1</CTabPanel> 
      <CTabPanel>Panel 2</CTabPanel> 
      <CTabPanel>Panel 3</CTabPanel> 
    </template>
  </CTabs>`,
  play: async (args, canvasElement) => {
    const canvas = within(canvasElement);
    // Check that labels array is the same length as the number of visible tabs
    const tabs = await screen.findByRole('tablist');
    const numberOfTabs = tabs.children.length;
    const numberOfLabelsArg = args.labels.length;
    expect(numberOfTabs).toBe(numberOfLabelsArg);
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
  },
});
Overview.parameters = {
  docs: {
    source: {
      code: /*html*/ ` 
//prop labels
      <CTabs :labels="['Tab 1','Tab 2','Tab 3']" class="border">
        <template #panels>
          <CTabPanel>Panel 1</CTabPanel>
          <CTabPanel>Panel 2</CTabPanel>
          <CTabPanel>Panel 3</CTabPanel>
        </template>
      </CTabs>
      
//slot labels
      <CTabs class="border">
        <template #panels>
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
      language: 'html',
    },
  },
};
