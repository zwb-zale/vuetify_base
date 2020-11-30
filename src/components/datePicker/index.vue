<template>
  <v-menu
      :value="showBox"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-row v-if="type==='likeEL'">
        <v-col cols="4" class="pa-0">
          <form-lable :text="label" :required="required"/>
        </v-col>
        <v-col :cols="cols" class="pa-0">
          <v-text-field
              prepend-inner-icon="date_range"
              single-line
              outlined
              :hide-details="hide_details"
              :dense="dense"
              @click="showBox = true"
              @click:clear="updateDate(null)"
              clearable
              :value="formateDate(value)"
              readonly
              :required="required"
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-else-if="type==='range'">
        <v-col :cols="cols" class="pa-0">
          <v-text-field
              prepend-inner-icon="date_range"
              :label="label"
              :hide-details="hide_details"
              :dense="dense"
              flat
              :height="28"
              @click:clear="updateDate(null)"
              :value="formateDateView(value)"
              readonly
              :required="required"
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
          v-else
          prepend-inner-icon="date_range"
          :hide-details="hide_details"
          :filled="filled"
          :dense="dense"
          @click="showBox = true"
          @click:clear="updateDate(null)"
          clearable
          :value="formateDate(value)"
          :label="label"
          readonly
          :required="required"
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
    value: [String,Array],
    label: {
      type: String,
      default: ""
    },
    start_placeholder: {
      type: String,
      default: "开始日期"
    },
    end_placeholder: {
      type: String,
      default: "结束日期"
    },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    }
  },
  methods: {
    updateDate(date) {
      console.log(date)
      if(this.type==='range'){
        if(date.length===2){
          this.$emit("input", date);
          this.showBox = false;
        }
      }else{
        this.$emit("input", date);
        this.showBox = false;
      }

    },
    formateDateView(value){
      return value.join(' ~ ')
    },
    formateDate(value) {
      if(this.type==='range'){
        return value
      }else{
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
