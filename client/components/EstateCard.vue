<template>
  <div>
    <sui-card>
      <sui-image :src="imageSrc"></sui-image>
      <sui-card-content>
        <sui-card-header>{{ header }}</sui-card-header>
        <sui-card-meta>
          {{ price }}
        </sui-card-meta>
      </sui-card-content>
      <sui-divider horizontal fitted />
      <sui-card-content>
        <!-- Description -->
        <sui-grid columns="2">
          <sui-grid-row>
            <sui-grid-column :width="7">
              <sui-icon name="expand arrows alternate" /> <span>500 sqft</span>
              <!-- <sui-label icon="expand arrows alternate">500 Sq ft</sui-label> -->
            </sui-grid-column>
            <sui-grid-column :width="7">
              <sui-icon name="bed" /> <span>2 beds</span>
              <!-- <sui-label icon="expand arrows alternate">500 Sq ft</sui-label> -->
            </sui-grid-column>
          </sui-grid-row>
          <sui-grid-row>
            <sui-grid-column :width="7">
              <sui-icon name="bath" /> <span>1 bath</span>
              <!-- <sui-label icon="expand arrows alternate">500 Sq ft</sui-label> -->
            </sui-grid-column>
            <sui-grid-column :width="7">
              <sui-icon name="warehouse" /><span>1 garage</span>
              <!-- <sui-label icon="expand arrows alternate">500 Sq ft</sui-label> -->
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
      </sui-card-content>
    </sui-card>
  </div>
</template>
<!-- TODO:
[ ]Replace header with dynamic nuxt-link
-->
<script>
export default {
  name: "estate-card",
  props: {
    imageSrc: String,
    header: String,
    price: String,
    area: String
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>