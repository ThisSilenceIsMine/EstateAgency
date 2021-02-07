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
          source="img/interior-1.jpg"
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
import EstateCard from "../components/estateCard.vue";
import searchForm from "../components/searchForm.vue";
import LoginForm from "../components/loginForm.vue";
import RegisterForm from "../components/registerForm.vue";

//!!! USED ONLY FOR GENERATING MOCK DATA, DELETE LATER
const random = (min, max) => {
  const length = Math.random() * (max - min) + min;

  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};
//^^^ USED ONLY FOR GENERATING MOCK DATA, DELETE LATER

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
    //!!! USED ONLY FOR GENERATING MOCK DATA, DELETE LATER
    randTitles() {
      const sets = [];
      for (let i = 0; i < 70; i++) {
        sets.push(random(20, 89));
      }
      return sets;
    },
    //^^^ USED ONLY FOR GENERATING MOCK DATA, DELETE LATER
    filtered() {
      const fts = this.filters;

      const filteredEstates = _.filter(this.estates, function(estate) {
        let isViable = true;

        if (fts.title !== undefined && fts.title !== null) {
          isViable &= estate.title.includes(fts.title); //ok
        }
        if (fts.place !== undefined && fts.place.length !== 0) {
          isViable &= fts.place.includes(estate.placement); //???? FIX IT
          console.log("estate.placement :>> ", estate.placement);
          console.log("fts.place :>> ", fts.place);
        }
        if (fts.action !== undefined) {
          isViable &= estate.action === fts.action; //ok
        }
        if (fts.minPrice !== undefined && frs.minPrice !== null) {
          isViable &= parseFloat(fts.minPrice) <= parseFloat(estate.price);
        }
        if (fts.maxPrice !== undefined && fts.maxPrice !== null) {
          isViable &= parseFloat(fts.maxPrice) >= parseFloat(estate.price);
        }

        return isViable;
      });
      console.log("filteredEstates :>> ", filteredEstates);
      console.log("fts :>> ", fts);
      return filteredEstates;
    }
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