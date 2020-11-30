<template>
  <div class="appBox">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-skeleton-loader
            class="mx-auto"
            max-width="344"
            height="388"
            v-bind="attrs"
            type="divider, list-item-three-line, image, actions"
          ></v-skeleton-loader>
        </v-col>

        <v-col cols="12" md="4">
          <v-skeleton-loader
            v-bind="attrs"
            type="table-heading, list-item-two-line, image, table-tfoot"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader
            v-bind="attrs"
            type="list-item-avatar-three-line,list-item-avatar-three-line,list-item-avatar-three-line,list-item-avatar-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="py-0"
          cols="12"
          md="8"
        >
          <v-skeleton-loader
            v-bind="attrs"
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2
      },
    }
  }
};
</script>

<style scoped>
div >>> .active-ring-name {
  color: #000 !important;
  font-size: 0.75rem !important;
  font-weight: bold;
}

div >>> .v-stepper {
  box-shadow: none;
}
</style>
