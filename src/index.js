import CButton from './components/Button/Button.vue';
import CSwitch from './components/Switch/Switch.vue';
import CIcon from './components/Icon/Icon.vue';
import CModal from './components/Modal/Modal.vue';
import { CToolbar, CToolGroup, CTool } from './components/Toolbar';
import CTextInput from './components/TextInput/TextInput.vue';

import drag from 'v-drag';

const allComponents = {
  CButton,
  CSwitch,
  CIcon,
  CToolbar,
  CToolGroup,
  CTool,
  CModal,
  CTextInput,
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

  app.use(drag);
};

export default {
  install,
};

export {
  CButton,
  CSwitch,
  CIcon,
  CToolbar,
  CToolGroup,
  CModal,
  CTextInput,
}
