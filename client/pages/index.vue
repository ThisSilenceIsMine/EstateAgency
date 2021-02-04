<template>
  <div>
    <search-form />
    <v-row>
      <!-- <v-col
        cols="12"
        sm="3"
        md="4"
        v-for="(number, index) in sets"
        :key="index"
      >
        <estate-card
          :title="'example title'"
          source="img/interior-1.jpg"
          :price="12000"
        />
      </v-col> -->
      <v-col cols="12" sm="3" md="4" v-for="ad in estates" :key="ad._id">
        <estate-card
          :title="ad.title"
          source="img/interior-1.jpg"
          :price="ad.price"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import EstateCard from "../components/estateCard.vue";
import searchForm from "../components/searchForm.vue";

export default {
  components: {
    searchForm,
    EstateCard
  },
  data() {
    return {
      sets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    };
  },
  async asyncData({ $axios }) {
    try {
      const estates = (await $axios.get("/estates")).data;
      console.log("estates :>> ", estates);
      return { estates };
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
};
</script>