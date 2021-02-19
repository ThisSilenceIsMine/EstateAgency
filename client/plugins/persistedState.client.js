import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "userData",
    paths: ["userToken", "role"]
  })(store);
};
