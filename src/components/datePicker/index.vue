<template>
  <v-menu
      :value="showBox"
      :close-on-click="value?type!=='range'||value.length===2:true"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-if="type==='range'"
          :value="formateDateView(value)"
          :single-line="outlined"
          :outlined="outlined"
          :label="label"
          :hide-details="hide_details"
          :dense="dense"
          :height="28"
          :required="required"
          :rules="required ? inputRules : []"
          flat
          readonly
          clearable
          prepend-inner-icon="date_range"
          @click="showBox = true"
          @click:clear="updateDate(null)"
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
      <v-text-field
          v-else
          :value="formateDate(value)"
          :single-line="outlined"
          :outlined="outlined"
          :label="label"
          :hide-details="hide_details"
          :filled="filled"
          :dense="dense"
          :height="28"
          :required="required"
          :rules="required ? inputRules : []"
          flat
          readonly
          clearable
          prepend-inner-icon="date_range"
          @click="showBox = true"
          @click:clear="updateDate(null)"
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
        :range="type==='range'"
        :first-day-of-week="1"
        :value="formateDate(value)"
        @input="updateDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      showBox: false
    };
  },
  props: {
    type: {
      type: String,
      default: 'likeEL'
    },
    cols: {
      type: Number | String,
      default: 8
    },
    outlined: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    hide_details: {
      type: Boolean,
      default() {
        return false;
      }
    },
    filled: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    value: [String, Array],
    label: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    inputRules: {
      type: Array,
      default: () => {
        return [v => !!v || v === 0 || "此栏位是必须的"];
      }
    },
  },
  methods: {
    updateDate(date) {
      if (this.type === 'range') {
        if(date){
          if (date.length === 2) {
            this.showBox = false
          }
        }
      } else {
        this.showBox = false
      }
      this.$emit("input", date);

    },
    formateDateView(value) {
      if(value){
        return value.join(' ~ ')
      }else{
        return null
      }
    },
    formateDate(value) {
      if (this.type === 'range') {
        return value
      } else {
        if (value) {
          return new Date(value).format(this.format);
        } else {
          return null;
        }
      }

    }
  }
};
</script>

<style scoped></style>
