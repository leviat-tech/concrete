import { createApp, reactive } from 'vue';
import App from './App.vue';
import './index.css';
import concrete from './index.js';
import tooltip from './directives/tooltip.js';

const options = ['Option 1', 'Option 2', 'Option 3'];

const store = reactive({
  firstname: 'John',
  lastname: 'Smith',
  phone: null,
  email: null,
  month: 'January',
  date: 1,
  year: 1980,
  nationality: 'United Kingdom',
  enableNotifications: false,
  isAdmin: false,
  buttonGroup: options,
  radioGroup: options,
  options: options
});

const statusStore = reactive({
  firstname: {
    type: 'error',
    message: 'Users called John are not allowed here'
  },
  lastname: {
    type: 'warning',
    message: 'The surname Smith is permitted, but frowned upon'
  },
  nationality: {
    type: 'info',
    message: 'where are you from?'
  }
});

window.statusStore = statusStore;

const app = createApp(App);
app.directive("tooltip", tooltip);
concrete.install(app, {
  size: 'md',
  inputIdToValue: (id) => {
    return store[id]
  },
  inputHandler: (id, value) => {
    if (!Object.hasOwn(store, id)) return;

    store[id] = value;
  },
  inputIdToOptions: (_id) => {
    return options;
  },
  registerInputs: (id, el) => {
    console.log(`Registered input with id '${id}'`);

    return () => {
      console.log(`Deregistered input with id '${id}'`);
    }
  },
  inputGetStatus(id) {
    return statusStore[id];
  },
});
app.mount('#app');

