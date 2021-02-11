<template>
  <v-app dark>
    <authentication-modal ref="authenticationDialog"></authentication-modal>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img
        max-height="50"
        max-width="50"
        :src="`${$axios.defaults.baseURL}uploads/logo.png`"
      ></v-img>
      <v-toolbar-title v-text="title" />
      <v-btn absolute right outlined v-if="!isAuthorized" @click="showDialog()">
        <v-icon left>mdi-login</v-icon> Вхід
      </v-btn>
      <v-btn
        nuxt
        absolute
        right
        color="primary"
        to="/profile/userEstates"
        exact
        v-else
      >
        Профіль
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import authenticationModal from "../components/authenticationModal";

export default {
  // components: {
  //   authenticationModal
  // },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      dialog: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Покупка/Оренда",
          to: "/"
        },
        {
          icon: "mdi-cash-usd-outline",
          title: "Продаж",
          to: "/sell"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Comfort UA"
    };
  },
  computed: {
    isAuthorized: function() {
      console.log(
        "this.$store.getters.isAuthorized :>> ",
        this.$store.getters.isAuthorized
      );
      return this.$store.getters.isAuthorized;
    }
  },
  methods: {
    showDialog: function() {
      console.log(this.$refs);
      this.$refs.authenticationDialog.showDialog();
    }
  },
  watch: {
    isAuthorized(newValue) {
      if (newValue) {
        this.$refs.authenticationDialog.closeDialog();
      }
    }
  }
};
</script>
