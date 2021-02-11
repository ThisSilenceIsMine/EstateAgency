<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="600" @click:outside="closeDialog">
      <v-card>
        <v-tabs centered>
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#login">Вхід</v-tab>
          <v-tab-item id="login" key="login">
            <v-card flat>
              <v-card-text>
                <v-container>
                  <login-form></login-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab href="#register">Реєстрація</v-tab>
          <v-tab-item id="register" key="register">
            <v-card flat>
              <v-card-text>
                <v-container>
                  <register-form></register-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
        <error-snackbar></error-snackbar>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import LoginForm from "~/components/loginForm.vue";
import RegisterForm from "~/components/registerForm.vue";
export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    showDialog() {
      console.log("Dialog now showing");
      this.dialog = true;
    },
    closeDialog() {
      console.log("Hiding dialog");
      this.dialog = false;
    }
  }
};
</script>
