
import CAccordion from './components/Accordion/Accordion.vue';
import CButton from './components/Button/Button.vue';
import CDraggablePath from './components/DraggablePath/DraggablePath.vue';
import CDraggablePoint from './components/DraggablePoint/DraggablePoint.vue';
import CFormElement from './components/FormElement/FormElement.vue';
import CFormSection from './components/FormSection/FormSection.vue';
import CFragment from './components/Fragment/Fragment.vue';
import CIcon from './components/Icon/Icon.vue';
import CInputAffix from './components/InputAffix/InputAffix.vue';
import CListbox from './components/Listbox/Listbox.vue';
import CModal from './components/Modal/Modal.vue';
import CNumericInput from './components/NumericInput/NumericInput.vue';
import CStatusBar from './components/StatusBar/StatusBar.vue';
import CSwitch from './components/Switch/Switch.vue';
import CTextInput from './components/TextInput/TextInput.vue';
import { CToolbar, CToolGroup, CTool } from './components/Toolbar';


const allComponents = {
  CAccordion,
  CButton,
  CDraggablePath,
  CDraggablePoint,
  CFormElement,
  CFormSection,
  CFragment,
  CIcon,
  CInputAffix,
  CListbox,
  CModal,
  CNumericInput,
  CStatusBar,
  CSwitch,
  CTextInput,
  CToolbar,
  CToolGroup,
  CTool,
};

export const defaultOptions = {
  size: 'sm',
  components: null,
  labelFormatter: (label) => label,
  inputHandler: null
}

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
  CDraggablePath,
  CDraggablePoint,
  CFormElement,
  CFormSection,
  CFragment,
  CIcon,
  CInputAffix,
  CListbox,
  CModal,
  CNumericInput,
  CStatusBar,
  CSwitch,
  CTextInput,
  CToolbar,
  CToolGroup,
  CTool,
}


