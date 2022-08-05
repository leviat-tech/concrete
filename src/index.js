// Inputs and Form Components
import CButton from './components/Button/Button.vue';
import CSwitch from './components/Switch/Switch.vue';
import CTextInput from './components/TextInput/TextInput.vue';
import CNumericInput from './components/NumericInput/NumericInput.vue';
import CListbox from './components/Listbox/Listbox.vue';
import CCheckbox from './components/Checkbox/Checkbox.vue';

// Low Level Components
import CIcon from './components/Icon/Icon.vue';
import CFormSection from './components/FormSection/FormSection.vue';
import CFormElement from './components/FormElement/FormElement.vue';
import CInputAffix from './components/InputAffix/InputAffix.vue';

// High Level Components
import CModal from './components/Modal/Modal.vue';
import CAccordion from './components/Accordion/Accordion.vue';
import CStatusBar from './components/StatusBar/StatusBar.vue';
import { CToolbar, CToolGroup, CTool } from './components/Toolbar';

import { CViewportContainer, CViewport } from './components/Viewport';
import CDraggablePath from './components/DraggablePath/DraggablePath.vue';
import CDraggablePoint from './components/DraggablePoint/DraggablePoint.vue';

import { defaultOptions } from './composables/concrete';


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
  CListbox,
  CModal,
  CNumericInput,
  CStatusBar,
  CSwitch,
  CTextInput,
  CTool,
  CToolbar,
  CToolGroup,
  CViewport,
  CViewportContainer
};



const install = (app, userOptions = {}) => {

  const options = { ...defaultOptions, ...userOptions };
  const { size, components, inputHandler, labelFormatter } = options;

  app.provide('concrete', { size, inputHandler, labelFormatter });

  const componentsToInclude = components || Object.keys(allComponents);

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
  CListbox,
  CModal,
  CNumericInput,
  CStatusBar,
  CSwitch,
  CTextInput,
  CTool,
  CToolbar,
  CToolGroup,
  CViewport,
  CViewportContainer
}


