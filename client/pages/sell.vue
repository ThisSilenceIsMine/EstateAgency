<template>
  <v-form v-model="isValid">
    <v-row>
      <v-col>
        <v-text-field
          :rules="[rules.required]"
          v-model="estateData.title"
          label="Заголовок"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          :rules="[rules.required]"
          row
          v-model="estateData.action"
        >
          <v-radio label="Продаж" value="Sell" />
          <v-radio label="Оренда" value="Rent" />
        </v-radio-group>
      </v-col>
      <v-col>
        <v-combobox
          v-model="estateData.placement"
          :items="placements"
          :rules="[rules.required]"
          label="Район"
          prepend-inner-icon="mdi-map-marker"
          single-line
          clearable
        />
      </v-col>
      <v-col>
        <v-select
          v-model="estateData.type"
          :rules="[rules.required]"
          :items="estateTypes"
          label="Тип нерухомості"
          single-line
          clearable
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-file-input
          @change="filesChanged"
          :rules="[rules.required]"
          accept="image/*"
          label="Фото"
          prepend-icon="mdi-camera"
          counter
          multiple
          chips
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="estateData.price"
          :rules="[rules.required, rules.currency]"
          label="Ціна"
          prefix="$"
          clearable
        />
      </v-col>
    </v-row>
    <v-row>
      <v-textarea
        :rules="[rules.required]"
        label="Опис"
        v-model="estateData.description"
        auto-grow
      />
    </v-row>
    <v-row>
      <v-btn :disabled="!isValid" color="success" @click="upload()">
        Зберегти
      </v-btn>
      <v-btn color="error" depressed nuxt to="/">
        Відмінити
      </v-btn>
    </v-row>
  </v-form>
</template>
<script>
import validator from "validator";
import FormData from "form-data";
import { placements, estateTypes } from "~/assets/globals.js";
import { getters } from "~/store/index.js";

export default {
  middleware: "authLock",
  data() {
    return {
      estateTypes,
      placements,
      isValid: true,
      estateData: {
        title: "",
        price: 0,
        action: "",
        placement: "",
        type: "",
        photos: [],
        description: ""
      },
      rules: {
        required: value => !!value || "Обов'язкове поле",
        currency: value =>
          (value ? validator.isCurrency(value + "") : true) ||
          "Введіть в правильному форматі"
      }
    };
  },
  methods: {
    filesChanged(Files) {
      this.estateData.photos = Files;
    },
    async upload() {
      const form = new FormData();
      //refactor later
      form.append("title", this.estateData.title);
      form.append("action", this.estateData.action);
      form.append("placement", this.estateData.placement);
      form.append("estateType", this.estateData.type);
      form.append("price", this.estateData.price);
      form.append("description", this.estateData.description);
      this.estateData.photos.forEach(ph => form.append("photos", ph));

      const token = this.$store.getters.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      };

      try {
        const data = (await this.$axios.post("/estates", form, config)).data;
      } catch (error) {
        console.log("Upload error :>> ", error);
      }
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   if (getters.isAuthorized) {
  //     console.log("Go ahead, sell your grandma's house");
  //     next();
  //   } else {
  //     console.log("Not authorized!");
  //     next(false);
  //   }
  // }
};
</script>
<style>
</style>