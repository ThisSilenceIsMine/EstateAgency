import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "userToken",
    paths: ["userToken"]
  })(store);
};
