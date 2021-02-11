<template>
  <div>
    <v-alert
      v-model="snackbar"
      dark
      outlined
      dismissible
      transition="scroll-y-reverse-transition"
      type="error"
    >
      <slot></slot>
    </v-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      snackbar: false
    };
  },
  methods: {
    show() {
      this.snackbar = true;
    }
  }
};
</script>
