import ConcreteButton from './components/ConcreteButton.vue';
import ConcreteSearchSelect from './components/ConcreteSearchSelect.vue';
import ConcreteSelect from './components/ConcreteSelect.vue';
import ConcreteQuantityInput from './components/ConcreteQuantityInput.vue';
import ConcreteTextInput from './components/ConcreteTextInput.vue';
import ConcreteModal from './components/ConcreteModal.vue';


const components = [
  ConcreteButton,
  ConcreteSearchSelect,
  ConcreteSelect,
  ConcreteQuantityInput,
  ConcreteTextInput,
  ConcreteModal,
];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
  ConcreteButton,
  ConcreteSearchSelect,
  ConcreteSelect,
  ConcreteQuantityInput,
  ConcreteTextInput,
  ConcreteModal,
};
