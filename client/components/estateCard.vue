<template>
  <div>
    <v-hover v-model="hover">
      <v-card
        elevation="2"
        max-width="374"
        class="card-style"
        nuxt
        :to="`/estate/${id}`"
      >
        <v-img height="250" :src="source"> </v-img>
        <v-card-title> {{ title }} </v-card-title>

        <v-card-subtitle>
          <!-- <v-icon left>mdi-currency-usd</v-icon> - {{ price }} -->
          <v-chip label outlined>
            <span class="priceText"> {{ price }} &nbsp;</span>
            <v-icon left>mdi-currency-usd</v-icon>
          </v-chip>
        </v-card-subtitle>

        <v-card-text>
          <v-chip class="ma-2">
            <v-icon left>mdi-map-marker</v-icon>{{ place }}
          </v-chip>
          <v-chip class="ma-2" color="deep-purple">
            <v-icon left>{{ actionIcon }}</v-icon>

            {{ actionDisplay }}
          </v-chip>
          <v-chip class="ma-2" color="deep-orange">
            <v-icon left> mdi-sign-real-estate </v-icon>
            {{ type }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  //height="450"
  //max-width = 374
  props: {
    title: String,
    price: Number,
    source: String,
    place: String,
    action: String,
    id: String,
    type: String
  },
  data() {
    return {
      hover: false
    };
  },
  computed: {
    actionDisplay() {
      if (this.action === "Buy") {
        return "Покупка";
      } else {
        return "Оренда";
      }
    },
    actionIcon() {
      if (this.action === "Buy") {
        return "mdi-cash-usd-outline";
      } else {
        return "mdi-calendar-clock";
      }
    }
  }
};
</script>
<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal;
}

.priceText {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
}
</style>