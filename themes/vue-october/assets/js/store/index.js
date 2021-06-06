import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart';
import product from './product';
import category from './category';
import navbar from './navbar';
import axios from 'axios';

Vue.use(Vuex)

class Settings {
  constructor(siteName, phone, email, address, whatsapp, ok, vk, instagram, logo, banners) {
    this.siteName = siteName;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.whatsapp = whatsapp;
    this.ok = ok;
    this.vk = vk;
    this.instagram = instagram;
    this.siteLogo = logo;
    this.banners = banners;
  }
}

export default new Vuex.Store({
  state: {
    loading: false,
    settings: {},
    fixedPanel: false
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getSettings(state) {
      return state.settings;
    },
    getPanelStatus(state) {
      return state.fixedPanel;
    }
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_SETTINGS(state, payload) {
      state.settings = payload;
    },
    SET_FIXEDPANEL_STATUS(state, payload) {
      state.fixedPanel = payload;
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
        const banners = JSON.parse(data.banners);
        const settings = new Settings(data.site_name, phone, data.t_email,  data.address, data.whatsapp, data.ok, data.vk, data.instagram, data.site_logo, banners)
        commit("SET_SETTINGS", settings);
      })
      .catch(err => {
        console.log(err);
      })
    },
    setFixedPanelStatus({ commit }, data) {
      commit("SET_FIXEDPANEL_STATUS", data);
    }
  },
  modules: {
    cart,
    product,
    category,
    navbar
  }
})
