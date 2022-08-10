import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import concrete from './index.js';

const app = createApp(App);
concrete.install(app, { size: 'md' });
app.mount('#app');

