import axios from "axios";
const product = {
  state: () => ({
    newProducts: [],
    popularProducts: [],
    cartProducts: []
  }),
  mutations: {
    SET_NEW_PRODUCTS(state, payload) {
      state.newProducts = payload;
    },
    SET_POPULAR_PRODUCTS(state, payload) {
      state.popularProducts = payload;
    },
    SET_CART_PRODUCTS(state, payload) {
      state.cartProducts = payload;
    }
  },
  actions: {
    fetchNewProducts( {commit} ) {
      axios.get('api/new-products')
      .then(response => {
        commit("SET_NEW_PRODUCTS", response.data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    fetchPopularProducts( {commit} ) {
      axios.get('api/popular-products')
      .then(response => {
        commit("SET_POPULAR_PRODUCTS", response.data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    fetchProductsByIds( {commit}, payload) {
      const productIds = payload.map(el => el.id);
      axios.get(`api/products/${productIds}`)
      .then(response => {
        const result = response.data.map(product => {
          payload.map(element => {
            if(element.id == product.id) {
              product.amount = element.amount;
            }
          });
          return product
        })
        commit("SET_CART_PRODUCTS", result)
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  getters: {
    getNewProducts(state) {
      return state.newProducts;
    },
    getPopularProducts(state) {
      return state.popularProducts;
    },
    getCartProducts(state) {
      return state.cartProducts;
    }
  }
}
export default product;