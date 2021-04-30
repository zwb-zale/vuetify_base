<template>
  <div class="appBox">
    <div class="mb-1 py-3">
      <v-row>
        <v-col cols="12" md="3" class="py-0">
          <v-text-field
              clearable
              dense
              label="公司"
              flat
              hide-details
              :height="28"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" class="py-0 d-flex align-end">
          <v-btn depressed :elevation="0" small>
            <v-icon dark>
              search
            </v-icon>
          </v-btn>
          <v-btn
              color="primary"
              class="ml-4"
              depressed
              :elevation="0"
              small
          >
            新建
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
name: "index"
}
</script>

<style scoped>

</style>