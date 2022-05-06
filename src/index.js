import CButton from './components/Button.vue';

const list = [
  CButton,
];

// Allow setting of default size + theme at install time
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
}


