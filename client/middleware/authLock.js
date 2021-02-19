export default function({ store, redirect }) {
  if (!store.getters.isAuthorized) {
    console.log("NOT AUTHORIZED!", store.isAuthorized);
    console.log("store", store);
    redirect("/");
  }
}
