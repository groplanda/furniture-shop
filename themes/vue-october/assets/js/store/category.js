import axios from "axios";
const category = {
  state: () => ({
    categories: []
  }),
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    }
  },
  actions: {
    fetchCategories( {commit} ) {
      axios.get('/api/categories')
      .then(response => {
        commit("SET_CATEGORIES", response.data)
      })
      .catch(err => {
        console.log(err);
      })
    },
  },
  getters: {
    getCategories(state) {
      return state.categories;
    }
  }
}
export default category;