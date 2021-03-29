<template>
  <v-list-item>
    <v-list-item-content>
      <v-img :src="src" :alt="src" />
      <v-btn @click="$emit('remove')"> Remove </v-btn>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    src: String
  }
};
</script>

<style>
</style>