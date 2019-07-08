import Vue from 'vue';
import App2 from './App2.vue';
import createRouter from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

const router = createRouter(store);

new Vue({
  router,
  store,
  render: h => h(App2),
}).$mount('#app');
