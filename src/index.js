import CButton from './components/Button/Button.vue';
import CSwitch from './components/Switch/Switch.vue';
import CIcon from './components/Icon/Icon.vue';
import CModal from './components/Modal/Modal.vue';
import { CToolbar, CToolGroup, CTool } from './components/Toolbar';

const list = {
  CButton,
  CSwitch,
  CIcon,
  CToolbar,
  CToolGroup,
  CTool,
  CModal,
};

const install = (app, { components = [] } = {}) => {
  const all = components.length === 0;
  Object.entries(list).forEach(([name, component]) => {
    if(all || components.indexOf(name) > -1) {
      app.component(name, component);
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
}


