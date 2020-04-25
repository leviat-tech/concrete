import Vue from 'vue';
import App from '@/App';
import alert from '@/components/alert';


Vue.prototype.$alert = alert;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
