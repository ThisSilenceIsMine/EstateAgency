<template>
  <v-form v-model="isValid">
    <v-row>
      <v-col>
        <v-text-field
          v-model="filters['title']"
          label="Назва"
          prepend-inner-icon="mdi-format-title"
          clearable
        />
      </v-col>

      <v-col>
        <v-combobox
          v-model="filters['place']"
          :items="items"
          item-text="place"
          item-value="place"
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
          <v-radio label="Покупка" value="Buy" />
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
        <v-select
          v-model="filters['type']"
          label="Тип нерухомості"
          single-line
          clearable
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import validator from "validator";

export default {
  data() {
    return {
      filters: {},
      // radioGroup: "Buy",
      isValid: true,
      // select: [],
      items: [
        { place: "Шкірзавод" },
        { place: "М’ясокомінат" },
        { place: "Прогрес" },
        { place: "Залізничний вокзал" },
        { place: "Солодовий завод" },
        { place: "Дитячий світ" },
        { place: "Новосілки" },
        { place: "Загребелля" },
        { place: "Центр" }
      ],
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
