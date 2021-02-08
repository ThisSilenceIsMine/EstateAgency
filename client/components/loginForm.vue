<template>
  <v-form v-model="isValid">
    <v-text-field
      v-model="email"
      label="E-mail"
      clearable
      :rules="[rules.email, rules.required]"
    />
    <v-text-field
      v-model="password"
      label="Пароль"
      @click:append="showPassword = !showPassword"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :rules="[rules.required]"
    />
    <v-btn :disabled="!isValid" color="success" @click="login()"> Вхід </v-btn>
  </v-form>
</template>

<script>
import validator from "validator";

export default {
  data() {
    return {
      isValid: false,
      email: "",
      password: "",
      showPassword: false,
      rules: {
        email: value =>
          (value ? validator.isEmail(value + "") : true) ||
          "Некорректний email",

        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    login() {
      this.$store.dispatch("loginUser", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>