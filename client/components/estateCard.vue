<template>
  <div>
    <v-card elevation="2" outlined max-width="374">
      <v-img height="250" :src="source"> </v-img>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>$ - {{ price }}</v-card-subtitle>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    price: Number,
    source: String
  },
  data() {
    return {};
  }
};
</script>
<style>
</style>