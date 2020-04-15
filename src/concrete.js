import ConcreteButton from './components/ConcreteButton.vue';
import ConcreteCheckbox from './components/ConcreteCheckbox.vue';
import ConcreteModal from './components/ConcreteModal.vue';
import ConcreteQuantityInput from './components/ConcreteQuantityInput.vue';
import ConcreteSearchSelect from './components/ConcreteSearchSelect.vue';
import ConcreteSelect from './components/ConcreteSelect.vue';
import ConcreteTextarea from './components/ConcreteTextarea.vue';
import ConcreteTextInput from './components/ConcreteTextInput.vue';
import { ConcreteTable, ConcreteColumn } from './components/ConcreteTable.vue';


const components = [
  ConcreteButton,
  ConcreteCheckbox,
  ConcreteModal,
  ConcreteQuantityInput,
  ConcreteSearchSelect,
  ConcreteSelect,
  ConcreteTextarea,
  ConcreteTextInput,
  ConcreteTable,
  ConcreteColumn,
];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
  ...components,
};

export {
  ConcreteButton,
  ConcreteCheckbox,
  ConcreteModal,
  ConcreteQuantityInput,
  ConcreteSearchSelect,
  ConcreteSelect,
  ConcreteTextarea,
  ConcreteTextInput,
  ConcreteTable,
  ConcreteColumn,
};
