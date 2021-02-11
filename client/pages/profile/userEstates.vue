<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3" md="6" v-for="ad in estates" :key="ad._id">
        <estate-card
          :title="ad.title"
          :source="`${$axios.defaults.baseURL}${ad.images[0].image}`"
          :price="ad.price"
          :place="ad.placement"
          :action="ad.action"
          :type="ad.estateType"
          :id="ad._id"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import EstateCard from "~/components/estateCard.vue";

export default {
  components: {
    EstateCard
  },
  async asyncData({ $axios, store }) {
    try {
      const estates = (
        await $axios.get("/estates/my", { headers: store.getters.authHeader })
      ).data;
      console.log("estates :>> ", estates);
      return { estates };
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
};
</script>
<style>
</style>