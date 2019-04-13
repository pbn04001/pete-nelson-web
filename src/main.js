import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

const router = createRouter(store);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
