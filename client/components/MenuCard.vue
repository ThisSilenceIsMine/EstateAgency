<template>
  <div>
    <sui-card>
      <sui-dimmer-dimmable
        @mouseenter.native="cardActive = true"
        @mouseleave.native="cardActive = false"
      >
        <sui-image :src="src" />
        <sui-dimmer blurring :active="cardActive">
          <slot></slot>
        </sui-dimmer>
      </sui-dimmer-dimmable>
    </sui-card>
  </div>
</template>
<script>
export default {
  name: "menu-card",
  props: {
    src: String,
  },
  data() {
    return {
      cardActive: false,
    };
  },
};
</script>
<style scoped>
</style>