<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left :elevation="0">
      Title
    </v-app-bar>
    <Navbar/>
    <main-app/>

  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import mainApp from './components/mainApp'
export default {
  name: 'Layout',

  components: {
    Navbar,mainApp
  },
  methods: {

  }
}
</script>

<style>

</style>
