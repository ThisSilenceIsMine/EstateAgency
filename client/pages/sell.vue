<template>
  <v-form v-model="isValid">
    <v-row>
      <v-col>
        <v-text-field label="Заголовок" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group row>
          <v-radio label="Продаж" value="Sell" />
          <v-radio label="Оренда" value="Rent" />
        </v-radio-group>
        <v-combobox
          :items="placements"
          label="Район"
          prepend-inner-icon="mdi-map-marker"
          single-line
          clearable
        />
        <v-select
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
          accept="image/*"
          label="Фото"
          prepend-icon="mdi-camera"
          counter
          multiple
          chips
        />
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import validator from "validator";
import { placements, estateTypes } from "~/assets/globals.js";

export default {
  data() {
    return {
      estateTypes,
      placements
    };
  }
};
</script>
<style>
</style>