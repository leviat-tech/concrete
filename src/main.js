import { createApp, reactive } from 'vue';
import App from './App.vue';
import './index.css';
import concrete from './index.js';

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
});

const statusStore = reactive({
  firstname: {
    type: 'warning',
    message: 'Users called John are not allowed here'
  }
});

const app = createApp(App);
concrete.install(app, {
  size: 'md',
  inputIdToValue: (id) => {
    return store[id]
  },
  inputHandler: (id, value) => {
    if (!Object.hasOwn(store, id)) return;

    store[id] = value;
  },
  registerInputs: (id, el) => {
    console.log(`Registered input with id '${id}'`, el);

    return () => {
      console.log(`Deregistered input with id '${id}'`);
    }
  },
  inputGetStatus(id) {
    return statusStore[id];
  },
});
app.mount('#app');

