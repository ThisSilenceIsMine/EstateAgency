<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="9" sm="12" xs="12">
        <v-card min-height="70vh" rounded="lg">
          <v-card-title>{{ estate.title }}</v-card-title>
          <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item
              v-for="item in estate.images"
              :key="item._id"
              :src="`${$axios.defaults.baseURL}${item.image}`"
            ></v-carousel-item>
          </v-carousel>

          <v-row class="mt-5 pl-5">
            <v-chip class="ma-2">
              <v-icon left>mdi-map-marker</v-icon>{{ estate.placement }}
            </v-chip>
            <v-chip class="ma-2" color="deep-purple">
              <v-icon left>{{ actionIcon }}</v-icon>

              {{ actionDisplay }}
            </v-chip>
            <v-chip class="ma-2" color="deep-orange">
              <v-icon left> mdi-sign-real-estate </v-icon>
              {{ estate.estateType }}
            </v-chip>
          </v-row>
          <v-card-text class="mt-5 pl-5 text-body-1">
            {{ estate.description }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="3" xs="12">
        <v-sheet rounded="lg">
          <v-list color="transparent">
            <v-list-item v-for="contact in contacts" :key="contact">
              <v-list-item-content>
                <v-list-item-title class="text-center">
                  {{ contact }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item color="grey lighten-4" v-if="isOwner">
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn color="primary" block depressed text>
                    Редагувати
                  </v-btn>
                  <v-btn color="error" block depressed text>
                    Видалити
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import jwt from "jsonwebtoken";

export default {
  data() {
    return {};
  },
  computed: {
    isOwner() {
      if (this.$store.getters.isAuthorized) {
        return jwt.decode(this.$store.getters.token)._id === this.estate.owner;
      } else return false;
    },
    actionDisplay() {
      if (this.estate.action === "Buy") {
        return "Покупка";
      } else {
        return "Оренда";
      }
    },
    actionIcon() {
      if (this.estate.action === "Buy") {
        return "mdi-cash-usd-outline";
      } else {
        return "mdi-calendar-clock";
      }
    }
  },
  async asyncData({ error, params, $axios }) {
    try {
      console.log("_id async data invoked");
      console.log(`estates/${params.id}`);
      const estate = (await $axios.get(`estates/${params.id}`)).data;
      const contacts = (await $axios.get(`estates/${params.id}/contacts`)).data;
      console.log("contacts :>> ", contacts);
      return { estate, contacts };
    } catch (err) {
      console.log("err :>> ", err);
      error({ statusCode: 404, message: "Сторінку не знайдено" });
    }
  }
};
</script>