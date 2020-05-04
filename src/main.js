import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from '@/App';
import alert from '@/components/alert';


Vue.use(VueCompositionApi);
Vue.prototype.$alert = alert;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
