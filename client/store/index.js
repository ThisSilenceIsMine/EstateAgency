export const state = () => ({
  userToken: ""
});

export const getters = {
  isAuthorized: state => {
    return state.userToken.length !== 0;
  },
  token: state => {
    return state.userToken;
  }
};

export const mutations = {
  setUserToken(state, key) {
    state.userToken = key;
  }
};

export const actions = {
  async loginUser(context, userData) {
    try {
      const user = (await this.$axios.post("/users/login", userData)).data;

      context.commit("setUserToken", user.token);
    } catch (error) {
      console.log("error :>> ", error);
    }
  },

  async registerUser(context, userData) {
    try {
      const user = (await this.$axios.post("/users", userData)).data;

      context.commit("setUserToken", user.token);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
};
