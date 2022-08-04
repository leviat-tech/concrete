import drag from 'v-drag';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

const app = createApp(App);
app.use(drag);
app.mount('#app');
