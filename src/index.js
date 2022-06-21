import CButton from './components/Button/Button.vue';
import CSwitch from './components/Switch/Switch.vue';

const list = [
  CButton,
  CSwitch,
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
}


