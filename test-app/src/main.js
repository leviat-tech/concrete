import Vue from 'vue';
import VDragged from 'v-dragged';
import VueCompositionApi from '@vue/composition-api';
import Concrete from '@crhio/concrete';
import App from './App.vue';


Vue.use(VueCompositionApi);
Vue.use(VDragged);
Vue.use(Concrete);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
