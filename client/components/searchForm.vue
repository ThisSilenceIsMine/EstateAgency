<template>
  <v-form v-model="isValid">
    <v-row>
      <v-col>
        <v-select
          v-model="filters['type']"
          :items="estateTypes"
          label="Тип нерухомості"
          single-line
          clearable
        />
      </v-col>

      <v-col>
        <!--           item-text="place"
          item-value="place" -->
        <v-combobox
          v-model="filters['place']"
          :items="items"
          label="Район"
          prepend-inner-icon="mdi-map-marker"
          return-object
          single-line
          clearable
          multiple
          chips
        />
      </v-col>

      <v-col>
        <v-radio-group row v-model="filters['action']">
          <v-radio label="Покупка" value="Sell" />
          <v-radio label="Оренда" value="Rent" />
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="filters['minPrice']"
          label="Мінімальна ціна"
          prefix="$"
          :rules="[rules.currency]"
          clearable
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="filters['maxPrice']"
          label="Максимальна ціна"
          prefix="$"
          :rules="[rules.currency]"
          clearable
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="filters['title']"
          label="Назва"
          prepend-inner-icon="mdi-format-title"
          clearable
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
      filters: {},

      isValid: true,

      items: placements,
      estateTypes,
      rules: {
        currency: value =>
          (value ? validator.isCurrency(value + "") : true) ||
          "Введіть в правильному форматі",
        required: value => !!value || "Required."
      }
    };
  },
  watch: {
    filters: {
      handler: function(newFilter, oldFilter) {
        // console.log("filters :>> ", newFilter);
        this.$emit("filterChanged", newFilter);
      },
      deep: true
    }
  }
};
</script>
