import Vue from 'vue';
import KIcon from './k-icon.vue';
import KTool from './k-tool.vue';
import KToolDrop from './k-tool-drop.vue';
import KClickOff from './k-click-off.vue';
import KModal from './k-modal.vue';
import KResizable from './k-resizable.vue';
import KSearch from './k-search.vue';
import KAccordian from './k-accordian.vue';
import KAccordianTab from './k-accordian-tab.vue';
import KButton from './k-button.vue';
import KCallout from './k-callout.vue';
import KIpsum from './k-ipsum.vue';
import KInput from './inputs/k-input.vue';
import KTextarea from './inputs/k-textarea.vue';
import KNumericInput from './inputs/k-numeric-input.vue';
import KCheckbox from './inputs/k-checkbox.vue';
import KSelect from './inputs/k-select.vue';
import KFileDialogInput from './inputs/k-file-dialog-input.vue';
import KSpanner from './inputs/k-spanner.vue';
import KLabel from './inputs/k-label.vue';
import KInlineLabel from './inputs/k-inline-label.vue';
import KInputGroup from './k-input-group.vue';


function globalize() {
  // widgets
  Vue.component(KIcon.name, KIcon);
  Vue.component(KTool.name, KTool);
  Vue.component(KToolDrop.name, KToolDrop);
  Vue.component(KClickOff.name, KClickOff);
  Vue.component(KModal.name, KModal);
  Vue.component(KResizable.name, KResizable);
  Vue.component(KAccordian.name, KAccordian);
  Vue.component(KAccordianTab.name, KAccordianTab);
  Vue.component(KCallout.name, KCallout);
  Vue.component(KButton.name, KButton);

  // input widgets
  Vue.component(KSearch.name, KSearch);
  Vue.component(KSpanner.name, KSpanner);

  // prototyping
  Vue.component(KIpsum.name, KIpsum);

  // inputs
  Vue.component(KFileDialogInput.name, KFileDialogInput);
  Vue.component(KInput.name, KInput);
  Vue.component(KTextarea.name, KTextarea);
  Vue.component(KNumericInput.name, KNumericInput);
  Vue.component(KCheckbox.name, KCheckbox);
  Vue.component(KSelect.name, KSelect);
  Vue.component(KLabel.name, KLabel);
  Vue.component(KInlineLabel.name, KInlineLabel);

  // input helpers
  Vue.component(KInputGroup.name, KInputGroup);
}

export default globalize;
