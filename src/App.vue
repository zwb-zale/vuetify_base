<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
<style>
html {
  overflow-y: auto !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
   font-size: 0.875rem !important;
}
</style>
