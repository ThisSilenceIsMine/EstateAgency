export default function({ store, redirect }) {
  if (!store.isAuthorized) {
    redirect("/");
  }
}
