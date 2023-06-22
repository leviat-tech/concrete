import { reactive } from 'vue';

// Inputs and Form Components
import CButton from './components/Button/Button.vue';
import CSwitch from './components/Switch/Switch.vue';
import CTextInput from './components/TextInput/TextInput.vue';
import CTextArea from './components/TextArea/TextArea.vue';
import CNumericInput from './components/NumericInput/NumericInput.vue';
import CListbox from './components/Listbox/Listbox.vue';
import CCheckbox from './components/Checkbox/Checkbox.vue';
import CAutoComplete from './components/AutoComplete/AutoComplete.vue';
import CRadioGroup from './components/RadioGroup/RadioGroup.vue';

// Low Level Components
import CIcon from './components/Icon/Icon.vue';
import CFormSection from './components/FormSection/FormSection.vue';
import CFormElement from './components/FormElement/FormElement.vue';
import CInputAffix from './components/InputAffix/InputAffix.vue';
import CFragment from './components/Fragment/Fragment.vue';
import CTooltipIcon from './components/TooltipIcon/TooltipIcon.vue';

// High Level Components
import CModal from './components/Modal/Modal.vue';
import CAccordion from './components/Accordion/Accordion.vue';
import CStatusBar from './components/StatusBar/StatusBar.vue';
import { CTabs, CTabPanel, CTabLabel } from './components/Tabs';
import { CToolbar, CToolGroup, CTool } from './components/Toolbar';
import { CViewportContainer, CViewport } from './components/Viewport';
import CSvg2dViewport from './components/Svg2dViewport/Svg2dViewport.vue';
import CDraggablePath from './components/DraggablePath/DraggablePath.vue';
import CDraggablePoint from './components/DraggablePoint/DraggablePoint.vue';
import { CTable, CInputCell } from './components/Table';
import { CResizable, CPane } from './components/Resizable';

import { defaultOptions } from './composables/concrete';
import { defineCustomUnits } from './utils/units';
import tooltip from './directives/tooltip';

const allComponents = {
  CAccordion,
  CButton,
  CCheckbox,
  CDraggablePath,
  CDraggablePoint,
  CFormElement,
  CFormSection,
  CIcon,
  CInputAffix,
  CFragment,
  CListbox,
  CModal,
  CNumericInput,
  CStatusBar,
  CSwitch,
  CTextInput,
  CAutoComplete,
  CRadioGroup,
  CTable,
  CInputCell,
  CSvg2dViewport,
  CTextArea,
  CTabs,
  CTabPanel,
  CTabLabel,
  CTool,
  CToolbar,
  CToolGroup,
  CTooltipIcon,
  CViewport,
  CViewportContainer,
  CResizable,
  CPane,
};

const install = (app, userOptions = {}) => {
  const options = {
    ...defaultOptions,
    ...userOptions,
  };

  // Create an internal input registry if the option is set
  if (userOptions.registerInputs === true) {
    options.registeredInputs = reactive({});
  }

  app.directive("tooltip", tooltip);
  app.provide('concrete', options);

  if (userOptions.customUnits?.length > 0) {
    userOptions.customUnits.forEach(({ unit, siUnit, conversions }) => {
      defineCustomUnits(unit, siUnit, conversions);
    });
  }

  const componentsToInclude = options.components || Object.keys(allComponents);

  componentsToInclude.forEach((componentName) => {
    const component = allComponents[componentName];
    app.component(componentName, component);
  });
};

export default {
  install,
};

export {
  CAccordion,
  CButton,
  CCheckbox,
  CDraggablePath,
  CDraggablePoint,
  CFormElement,
  CFormSection,
  CIcon,
  CInputAffix,
  CFragment,
  CListbox,
  CModal,
  CNumericInput,
  CStatusBar,
  CSwitch,
  CTextInput,
  CAutoComplete,
  CRadioGroup,
  CSvg2dViewport,
  CTable,
  CInputCell,
  CTextArea,
  CTabs,
  CTabPanel,
  CTabLabel,
  CTool,
  CToolbar,
  CToolGroup,
  CViewport,
  CViewportContainer,
  CResizable,
  CPane,
};
