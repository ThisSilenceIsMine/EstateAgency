<template>
  <v-form v-model="isValid">
    <h1 class="text-center">Редагувати</h1>
    <br />
    <v-row>
      <v-col>
        <v-text-field
          :rules="[rules.required]"
          v-model="estate.title"
          label="Заголовок"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group :rules="[rules.required]" row v-model="estate.action">
          <v-radio label="Продаж" value="Sell" />
          <v-radio label="Оренда" value="Rent" />
        </v-radio-group>
      </v-col>
      <v-col>
        <v-combobox
          v-model="estate.placement"
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
          v-model="estate.estateType"
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
          ref="imageInput"
          @change="filesChanged"
          :rules="[rules.required]"
          :value="estate.images"
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
          v-model="estate.price"
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
        v-model="estate.description"
        auto-grow
      />
    </v-row>
    <v-row>
      <v-btn :disabled="!isValid" color="success" @click="upload()" nuxt to="/">
        Зберегти
      </v-btn>
      <v-btn color="error" depressed nuxt to="/">
        Відмінити
      </v-btn>
    </v-row>
    <br /><br />
    <image-list :v-if="preview" @remove="removeImage" :images="estate.images" />
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
      title: "Редагувати",
      isValid: true,
      preview: true,

      rules: {
        required: value => !!value || "Обов'язкове поле",
        currency: value =>
          (value ? validator.isCurrency(value + "") : true) ||
          "Введіть в правильному форматі"
      }
    };
  },
  methods: {
    removeImage(id) {
      // console.log(`id`, id);
      // console.log(`this.estate.images`, this.estate.images);
      this.estate.images = this.estate.images.filter(x => x._id !== id);
    },
    filesChanged(Files) {
      this.estate.images = Files;
      this.preview = false;
    },
    async upload() {
      const form = new FormData();
      //refactor later
      form.append("title", this.estate.title);
      form.append("action", this.estate.action);
      form.append("placement", this.estate.placement);
      form.append("estateType", this.estate.estateType);
      form.append("price", this.estate.price);
      form.append("description", this.estate.description);
      this.estate.images.forEach(ph => form.append("photos", ph));

      const token = this.$store.getters.token;
      console.log(`this.estate`, this.estate);
      console.log(`form`, form);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      };

      try {
        const data = (
          await this.$axios.patch(
            `/estates/${this.$route.params.id}`,
            form,
            config
          )
        ).data;

        console.log(`Upload res:`, data);
      } catch (error) {
        console.log("Upload error :>> ", error);
      }
    }
  },
  async asyncData({ error, params, $axios }) {
    try {
      console.log("_id/edit async data invoked");
      console.log(`estates/${params.id}/edit`);
      const estate = (await $axios.get(`estates/${params.id}`)).data;

      return { estate };
    } catch (err) {
      console.log("err :>> ", err);
      error({ statusCode: 404, message: "Сторінку не знайдено" });
    }
  }
};
</script>