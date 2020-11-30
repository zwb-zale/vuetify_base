<template>
  <v-app id="app">
    <app-title />
    <Navbar />
    <main-app />
  </v-app>
</template>

<script>
import appTitle from "./components/appTitle";
import Navbar from "./components/Navbar";
import mainApp from "./components/mainApp";

export default {
  name: "Layout",

  components: {
    appTitle,
    Navbar,
    mainApp
  },

  methods: {}
};
</script>

<style></style>
