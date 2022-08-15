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

const app = createApp(App);
concrete.install(app, {
  size: 'md',
  inputIdToValue: (id) => {
    return store[id]
  },
  inputHandler: (id, value) => {
    if (!Object.hasOwn(store, id)) return;

    store[id] = value;
  }
});
app.mount('#app');

