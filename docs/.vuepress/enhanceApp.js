import Concrete from '../../src/concrete';
import VueCompositionApi from '@vue/composition-api';


export default ({ Vue }) => {
  Vue.use(VueCompositionApi);
  Vue.use(Concrete);
}
