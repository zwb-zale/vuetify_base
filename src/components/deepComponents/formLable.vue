<template>
  <v-subheader class="pa-0 pr-2">
    <div class="subheaderText d-flex justify-end align-center pb-2">
      <div v-if="required" class="inputStar">*</div>
      <div>{{ text }}</div>
    </div>
  </v-subheader>
</template>

<script>
export default {
  name: "formLable",
  props: {
    text: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.subheaderText {
  width: 100%;
  height: calc(100% - 8px);
}
</style>
