<template>
  <v-card>
    <v-tabs centered>
      <v-tabs-slider></v-tabs-slider>
      <v-tab :key="'login'">Вхід</v-tab>
      <v-tab :key="'register'">Реєстрація</v-tab>
    </v-tabs>

    <v-tabs-items>
      <v-tab-item :key="'login'">
        <v-card flat>
          <login-form></login-form>
        </v-card>
      </v-tab-item>
      <v-tab-item :key="'register'">
        <v-card flat>
          <register-form></register-form>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import LoginForm from "../components/loginForm.vue";
import RegisterForm from "../components/registerForm.vue";

export default {
  components: {
    LoginForm,
    RegisterForm
  }
};
</script>
