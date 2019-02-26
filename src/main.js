import Vue from 'vue';
// import KsVueScrollmagic from 'ks-vue-scrollmagic'
// import 'fullpage.js/vendors/scrolloverflow';
// import VueFullPage from 'vue-fullpage.js';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
// Vue.use(KsVueScrollmagic);
// Vue.use(VueFullPage);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
