<template>
  <div>
    <image-list-item
      v-for="item in images"
      :key="item._id"
      :src="`${$axios.defaults.baseURL}${item.image}`"
      @remove="$emit('remove', item._id)"
    />
  </div>
</template>

<script>
import imageListItem from "./imageListItem.vue";
export default {
  components: { imageListItem },
  props: ["images"]
};
</script>

<style>
</style>