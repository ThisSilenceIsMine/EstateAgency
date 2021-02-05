<template >
  <div>
    {{ data }}
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  async asyncData({ error, params, $axios }) {
    try {
      console.log(`estates/${params.id}`);
      const data = (await $axios.get(`estates/${params.id}`)).data;
      return { data };
    } catch (err) {
      console.log("err :>> ", err);
      const data = "NOT FOUND";
      return { data };
      //   error({ statusCode: 404, message: "Сторінку не знайдено" });
    }
  }
};
</script>
<style lang="">
</style>