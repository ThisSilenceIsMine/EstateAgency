<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <v-card rounded="lg">
          <v-list color="transparent">
            <v-list-item
              v-for="link in links"
              :to="link.child"
              :key="link.child"
            >
              <v-list-item-action>
                <v-icon left>{{ link.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> {{ link.title }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item color="grey lighten-4">
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn
                    color="error"
                    block
                    depressed
                    text
                    @click="logout()"
                    nuxt
                    to="/"
                  >
                    Вихід
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col>
        <v-card min-height="70vh" rounded="lg">
          <nuxt-child />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        title: "Мої оголошення",
        icon: "mdi-sign-real-estate",
        child: "/profile/userEstates"
      },
      {
        title: "Профіль",
        icon: "mdi-account-edit",
        child: "/profile/edit"
      }
    ]
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>