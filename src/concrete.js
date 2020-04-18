import CButton from './components/Button.vue';
import CCheckbox from './components/Checkbox.vue';
import CModal from './components/Modal.vue';
import CQuantityInput from './components/QuantityInput.vue';
import CSearchSelect from './components/SearchSelect.vue';
import CSelect from './components/Select.vue';
import CTextarea from './components/Textarea.vue';
import CTextInput from './components/TextInput.vue';
import { CTable, CColumn } from './components/Table.vue';
import { CTabSwitcher, CTabLabel, CTab } from './components/TabSwitcher.vue';
import CAlert from './components/alert';


const components = [
  CButton,
  CCheckbox,
  CModal,
  CQuantityInput,
  CSearchSelect,
  CSelect,
  CTextarea,
  CTextInput,
  CTable,
  CColumn,
  CTabSwitcher,
  CTabLabel,
  CTab,
];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$alert = CAlert; // eslint-disable-line
};

export default {
  install,
  CAlert,
  ...components,
};

export {
  CButton,
  CCheckbox,
  CModal,
  CQuantityInput,
  CSearchSelect,
  CSelect,
  CTextarea,
  CTextInput,
  CTable,
  CColumn,
  CTabSwitcher,
  CTabLabel,
  CTab,
  CAlert,
};
