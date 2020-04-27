import Vue from 'vue'
import App from './App.vue'
// import axiosPlugin from './utils/http';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api';
import router from "./router/index.js";
 
// Vue.use(axiosPlugin);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
