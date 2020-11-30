<template>
  <div class="d-flex px-3 py-1">
    <div :style="{ width: textWidth }">
      <form-lable :required="required" :text="text"/>
    </div>
    <div :style="{ width: inputWidth }">
      <v-select
          v-if="type==='select'"
          single-line
          outlined
          hide-details="auto"
          dense
          :item-text="itemtext"
          :item-value="itemvalue"
          :value="value"
          :required="required"
          :rules="required ? inputRules : []"
          :items="items"
          @change="updateDate"
      >
        <template v-slot:label>
          <div class="text-body-2 lableColor">{{label}}</div>
        </template>
      </v-select>
      <v-combobox
          v-else-if="type==='combox'"
          single-line
          outlined
          hide-details="auto"
          dense
          :item-text="itemtext"
          :item-value="itemvalue"
          :value="value"
          :required="required"
          :rules="required ? inputRules : []"
          :items="items"
          @change="updateDate"
      >
        <template v-slot:label>
          <div class="text-body-2 lableColor">{{label}}</div>
        </template>
      </v-combobox>
      <v-autocomplete
          v-else-if="type==='autocomplete'"
          single-line
          outlined
          hide-details="auto"
          dense
          hide-no-data
          no-filter
          clearable
          :item-text="itemtext"
          :item-value="itemvalue"
          :value="value"
          :loading="loading"
          :items="items"
          :search-input.sync="searchTXT"
          @change="updateDate"
      >
        <template v-slot:label>
          <div class="text-body-2 lableColor">{{label}}</div>
        </template>
      </v-autocomplete>
    </div>
  </div>
</template>

<script>
export default {
  name: "formSelect",
  props: {
    value: [String, Number, Boolean],
    text: [String, Number],
    label : {
      type: String,
      default: ""
    },
    items: [Array],
    type: {
      type: String,
      default: "select"
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    itemtext: {
      type: String,
      default: "label"
    },
    itemvalue: {
      type: String,
      default: "value"
    },
    inputRules: {
      type: Array,
      default: () => {
        return [v => !!v || v === 0 || "此栏位是必须的"];
      }
    },
    textWidth: {
      type: String,
      default: "100px"
    },
    inputWidth: {
      type: String,
      default: "230px"
    },
    loading: [String, Boolean],
  },
  data(){
    return{
      searchTXT:''
    }
  },
  watch:{
    searchTXT(newVal) {
      this.$emit("serviceFilter", newVal);
    }
  },
  methods: {
    updateDate(date) {
      this.$emit("input", date);
    }
  }
};
</script>

<style scoped></style>
