<template>
  <div>
    <search-form @filterChanged="onFilterChanged" />

    <v-row>
      <!-- <v-col cols="12" sm="3" md="4" v-for="title in randTitles" :key="title">
        <estate-card
          :title="title"
          source="img/interior-1.jpg"
          :price="12000"
          place="Мясокомбинат"
          action="Buy"
          type="Apartment"
        />
      </v-col> -->
      <v-col cols="12" sm="3" md="4" v-for="ad in filtered" :key="ad._id">
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
  </div>
</template>

<script>
import _ from "lodash";
import EstateCard from "~/components/estateCard.vue";
import searchForm from "~/components/searchForm.vue";
import LoginForm from "~/components/loginForm.vue";
import RegisterForm from "~/components/registerForm.vue";

export default {
  components: {
    searchForm,
    EstateCard,
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      filters: {}
    };
  },
  methods: {
    onFilterChanged(newFilter) {
      this.filters = newFilter;
    }
  },
  computed: {
    filtered() {
      const fts = this.filters;

      const filteredEstates = _.filter(this.estates, function(estate) {
        let isViable = true;

        if (fts.title) {
          isViable &= estate.title.includes(fts.title); //ok
        }
        if (fts.place && fts.place.length) {
          isViable &= fts.place.includes(estate.placement);
          console.log("estate.placement :>> ", estate.placement);
          console.log("fts.place :>> ", fts.place);
        }
        if (fts.action) {
          isViable &= estate.action === fts.action; //ok
        }
        if (fts.minPrice) {
          isViable &= parseFloat(fts.minPrice) <= parseFloat(estate.price);
        }
        if (fts.maxPrice) {
          isViable &= parseFloat(fts.maxPrice) >= parseFloat(estate.price);
        }
        if (fts.type) {
          // console.log(`fts`, fts);
          // console.log(`estate`, estate);
          isViable &= estate.estateType === fts.type;
        }

        return isViable;
      });
      console.log("filteredEstates :>> ", filteredEstates);
      return filteredEstates;
    }
  },

  async asyncData({ $axios }) {
    try {
      const estates = (await $axios.get("/estates")).data;
      return { estates };
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
};
</script>