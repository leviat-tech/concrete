import CButton from './components/Button/Button.vue';
import CSwitch from './components/Switch/Switch.vue';
import CIcon from './components/Icon/Icon.vue';
import CModal from './components/Modal/Modal.vue';
import { CToolbar, CToolGroup, CTool } from './components/Toolbar/Toolbar.vue';
import CTextInput from './components/TextInput/TextInput.vue';

const list = [
  CButton,
  CSwitch,
  CIcon,
  CToolbar,
  CToolGroup,
  CTool,
  CModal,
  CTextInput,
];

const install = (Vue, { components = [] } = {}) => {
  const all = components.length === 0;
  list.forEach((component) => {
    if(all || components.indexOf(component.name) > -1) {
      Vue.component(component.name, component);
    }
  });
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


