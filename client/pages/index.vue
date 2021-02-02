<template>
  <v-form>
    <v-row>
      <v-col>
        <v-text-field
          label="Назва"
          prepend-inner-icon="mdi-format-title"
          clearable
        ></v-text-field>
      </v-col>
      <v-col>
        <v-combobox
          v-model="select"
          :items="items"
          item-text="place"
          item-value="place"
          label="Район"
          prepend-inner-icon="mdi-map-marker"
          return-object
          single-line
          clearable
        ></v-combobox>
      </v-col>
      <v-col>
        <v-radio-group row>
          <v-radio label="Покупка" value="Buy" />
          <v-radio label="Оренда" value="Rent" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          label="Мінімальна ціна"
          prefix="$"
          :rules="[rules.currency]"
          clearable
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Максимальна ціна"
          prefix="$"
          :rules="[rules.currency]"
          clearable
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          label="Тип нерухомості"
          return-object
          single-line
          clearable
        ></v-select>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import validator from "validator";

export default {
  data() {
    return {
      select: { place: "" },
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
  }
};
</script>
