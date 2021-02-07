<template>
  <v-form v-model="isValid">
    <v-text-field v-model="name" label="Ім'я" :rules="[rules.required]" />
    <v-text-field
      v-model="email"
      label="E-mail"
      :rules="[rules.email, rules.required]"
    />
    <v-text-field
      v-model="phoneNumber"
      label="Номер телефону"
      :rules="[rules.phoneNumber, rules.required]"
    />
    <v-text-field
      v-model="password"
      label="Пароль"
      @click:append="showPassword = !showPassword"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :rules="[rules.required]"
      loading
      minLength="8"
    >
      <template v-slot:progress>
        <v-progress-linear
          :value="progress"
          :color="color"
          absolute
          height="7"
        ></v-progress-linear>
      </template>
    </v-text-field>
  </v-form>
</template>
<script>
import validator from "validator";

export default {
  data() {
    return {
      isValid: true,
      showPassword: false,
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      rules: {
        email: value =>
          (value ? validator.isEmail(value + "") : true) ||
          "Некорректний email",
        phoneNumber: value =>
          (value ? validator.isMobilePhone(value + "") : true) ||
          "Некорректний номер телефону",
        required: value => !!value || "Обов'язкове поле"
      }
    };
  },
  computed: {
    progress() {
      return Math.min(100, this.password.length * 9);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  }
};
</script>