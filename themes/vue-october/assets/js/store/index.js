import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart';
import product from './product';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  getters: {
    getLoading(state) {
      return state.loading;
    }
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    setLoading({ commit }, data) {
      commit("SET_LOADING", data);
    }
  },
  modules: {
    cart,
    product
  }
})
