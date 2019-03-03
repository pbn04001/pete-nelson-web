import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentHomeSection: null,
  },
  mutations: {
    updateHomeView(state, section) {
      state.currentHomeSection = section;
    },
  },
  actions: {

  },
});
