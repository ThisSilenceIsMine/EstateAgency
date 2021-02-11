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
      :rules="[rules.required, rules.minLength]"
      loading
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
    <v-btn :disabled="!isValid" color="success" @click="register()">
      Зареєструватись
    </v-btn>
    <error-snackbar class="mt-6" ref="errorSnackbar">
      Виникла помилка при реєстрації, спробуйте пізніше.
    </error-snackbar>
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
        required: value => !!value || "Обов'язкове поле",
        minLength: value =>
          value.length >= 6 || "Пароль повинен містити не менше 6 символів"
      }
    };
  },
  methods: {
    async register() {
      const res = await this.$store.dispatch("registerUser", {
        name: this.name,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber
      });
      if (!res) {
        this.$refs.errorSnackbar.show();
      }
    }
  },
  computed: {
    progress() {
      return Math.min(100, this.password.length * 6);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  }
};
</script>