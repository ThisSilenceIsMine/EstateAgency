<template>
  <v-form v-model="isValid">
    <v-container>
      <v-text-field
        v-model="user.name"
        label="Ім'я"
        :rules="[rules.required]"
        prepend-inner-icon="mdi-account-edit"
        outlined
      />
      <v-text-field
        v-model="user.email"
        label="E-mail"
        :rules="[rules.email, rules.required]"
        prepend-inner-icon="mdi-email-edit"
        outlined
      />
      <v-text-field
        v-model="user.phoneNumber"
        label="Номер телефону"
        :rules="[rules.phoneNumber, rules.required]"
        prepend-inner-icon="mdi-cellphone-text"
        outlined
      />
      <v-btn :disabled="!isValid" color="success" @click="update()">
        Зберегти
      </v-btn>
      <v-btn color="error" depressed nuxt to="/">
        Відмінити
      </v-btn>
    </v-container>
    <error-snackbar class="mt-6" ref="errorSnackbar">
      Виникла помилка. Перевірте з'єднання з сервером.
    </error-snackbar>
  </v-form>
</template>
<script>
import validator from "validator";

export default {
  data() {
    return {
      isValid: false,
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
  methods: {
    async update() {
      try {
        await this.$axios.patch(
          "/users/me",
          {
            name: this.user.name,
            email: this.user.email,
            phoneNumber: this.user.phoneNumber
          },
          {
            headers: this.$store.getters.authHeader
          }
        );
      } catch (error) {
        this.$refs.errorSnackbar.show();
        console.log("error :>> ", error);
      }
    }
  },
  async asyncData({ $axios, store, error }) {
    try {
      const user = (
        await $axios.get("/users/me", { headers: store.getters.authHeader })
      ).data;
      return { user };
    } catch (error) {
      this.$refs.errorSnackbar.show();
      console.log("error :>> ", error);
    }
  }
};
</script>
