import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart';
import product from './product';
import category from './category';
import axios from 'axios';

Vue.use(Vuex)

class Settings {
  constructor(siteName, phone, email, address, whatsapp, ok, vk, instagram) {
    this.siteName = siteName;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.whatsapp = whatsapp;
    this.ok = ok;
    this.vk = vk;
    this.instagram = instagram;
  }
}

export default new Vuex.Store({
  state: {
    loading: false,
    settings: {}
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getSettings(state) {
      return state.settings;
    }
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_SETTINGS(state, payload) {
      state.settings = payload;
    }
  },
  actions: {
    setLoading({ commit }, data) {
      commit("SET_LOADING", data);
    },
    fetchSettings( {commit} ) {
      axios.get(`/api/settings/${process.env.MIX_THEME}`)
      .then(response => {
        const data = response.data.data;
        const phone = JSON.parse(data.phone);
        const settings = new Settings(data.site_name, phone, data.t_email,  data.address, data.whatsapp, data.ok, data.vk, data.instagram)
        commit("SET_SETTINGS", settings);
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  modules: {
    cart,
    product,
    category
  }
})
