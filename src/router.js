import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const createRouter = (store) => {
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/resume',
        name: 'resume',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/Resume.vue'),
      },
    ],
  });

  router.afterEach((to, from) => {
    if (from.name === 'home' && to.name === 'home') {
      store.commit('updateHomeView', to.hash);
    }
  });

  return router;
};

export default createRouter;
