export const state = () => ({
  userToken: String
});

export const mutations = {
  setUserToken(state, key) {
    state.userToken = key;
  }
};

export const actions = {
  async loginUser(context, email, password) {
    const user = (
      await this.$axios.get("/users/login", {
        email,
        password
      })
    ).data;

    context.commit("setUserToken", user.token);
  },

  async registerUser(context, name, email, password, phoneNumber) {
    const user = (
      await this.$axios.post("/users", {
        name,
        email,
        phoneNumber,
        password
      })
    ).data;

    context.commit("setUserToken", user.token);
  }
};
