export const state = () => ({
  userToken: "",
  role: "User"
});

export const getters = {
  isAuthorized: state => {
    return state.userToken.length !== 0;
  },
  isAdmin: state => {
    console.log(`state`, state);
    return state.role === "Admin" && state.userToken.length !== 0;
  },
  authHeader: state => {
    return { Authorization: `Bearer ${state.userToken}` };
  },
  token: state => {
    return state.userToken;
  }
};

export const mutations = {
  setUserToken(state, key) {
    state.userToken = key;
  },
  clearUserToken(state) {
    state.userToken = "";
    state.role = "User";
  },
  setRole(state, role) {
    state.role = role;
  }
};

export const actions = {
  async loginUser(context, userData) {
    try {
      const res = (await this.$axios.post("/users/login", userData)).data;
      console.log("user(action)", res.user);
      context.commit("setUserToken", res.token);
      context.commit("setRole", res.user.rights);
      return true;
    } catch (error) {
      console.log("error :>> ", error);
      return false;
    }
  },

  async registerUser(context, userData) {
    try {
      const res = (await this.$axios.post("/users", userData)).data;

      context.commit("setUserToken", res.token);
      return true;
    } catch (error) {
      console.log("error :>> ", error);
      return false;
    }
  },

  async logout(context) {
    try {
      await this.$axios.post(
        "/users/logout",
        {},
        { headers: context.getters.authHeader }
      );
      this.commit("clearUserToken");
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
};
