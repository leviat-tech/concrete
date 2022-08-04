
import CIcon from './components/Icon/Icon.vue';

// Inputs
import CButton from './components/Button/Button.vue';
import CSwitch from './components/Switch/Switch.vue';
import CNumericInput from './components/NumericInput/NumericInput.vue';
import CTextInput from './components/TextInput/TextInput.vue';

// High Level Components
import CModal from './components/Modal/Modal.vue';
import CAccordion from './components/Accordion/Accordion.vue';
import CStatusBar from './components/StatusBar/StatusBar.vue';
import { CToolbar, CToolGroup, CTool } from './components/Toolbar';

const allComponents = {
  CButton,
  CSwitch,
  CNumericInput,
  CIcon,
  CToolbar,
  CToolGroup,
  CTool,
  CAccordion,
  CModal,
  CTextInput,
  CStatusBar,
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
  CButton,
  CSwitch,
  CNumericInput,
  CIcon,
  CToolbar,
  CToolGroup,
  CModal,
  CStatusBar,
  CTextInput,
}


