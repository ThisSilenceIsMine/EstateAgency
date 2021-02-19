<template>
  <div>
    <v-list three-line>
      <template v-for="user in users">
        <v-list-item :key="user.title" link>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle
              v-html="user.phoneNumber"
            ></v-list-item-subtitle>
            <v-list-item-subtitle v-html="user.email"></v-list-item-subtitle>
          </v-list-item-content>
          <v-btn color="error" outlined depressed absolute right>
            Видалити
          </v-btn>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>
<script>
export default {
  middleware: "authLock",
  async asyncData({ $axios, store, redirect }) {
    try {
      const users = (
        await $axios.get("/users", { headers: store.getters.authHeader })
      ).data;

      return { users };
    } catch (error) {
      console.log("admin error ", error);
      // redirect("/");
    }
  }
};
</script>