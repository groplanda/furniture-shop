const cart = {
  state: () => ({
    cart: [],
  }),
  mutations: {
    SET_CART(state, payload) {
      const index = state.cart.findIndex(el => el.id === payload.id);
      if (index === -1) {
        state.cart.push(payload);
      } else {
        state.cart[index].amount = Number(state.cart[index].amount) + Number(payload.amount);
      }
    },
    FILL_CART(state, payload) {
      state.cart = payload;
    }
  },
  actions: {
    fillCart({commit}, data) {
      commit("FILL_CART", data);
    },
    addToCart({commit}, data) {
      if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const index = cart.findIndex(el => el.id === data.id);
        if (index === -1) {
          cart.push(data);
        } else {
          cart[index].amount = Number(cart[index].amount) + Number(data.amount);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        localStorage.setItem('cart', JSON.stringify([data]));
      }
      commit("SET_CART", data);
    }
  },
  getters: {
    getCart(state) {
      return state.cart;
    }
  }
}
export default cart;