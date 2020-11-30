<template>
  <v-menu
      v-model="showBox"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex px-3 py-1">
        <div v-if="formlable" :style="{ width: textWidth }">
          <form-lable :required="required" :text="text"/>
        </div>
        <div :style="{ width: inputWidth }">
          <v-text-field
              hide-details="auto"
              single-line
              outlined
              dense
              @click:clear="updateDate(null)"
              clearable
              :value="formateDate(value)"
              :readonly="readonly"
              :rules="required ? inputRules : []"
              :required="required"
              v-bind="attrs"
              v-on="on"
          >
            <template v-slot:label>
              <div class="text-body-2 lableColor">{{ label }}</div>
            </template>
          </v-text-field>
        </div>
      </div>
    </template>
    <v-date-picker
        :first-day-of-week="1"
        :value="formateDate(value)"
        @input="updateDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "formDate",
  props: {
    formlable: {
      type: Boolean,
      default: true
    },
    value: [String, Number],
    text: [String, Number],
    label : {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    inputRules: {
      type: Array,
      default: () => {
        return [v => !!v || "此栏位是必须的"];
      }
    },
    textWidth: {
      type: String,
      default: "100px"
    },
    inputWidth: {
      type: String,
      default: "230px"
    }
  },
  data() {
    return {
      showBox: false
    };
  },
  methods: {
    updateDate(date) {
      this.$emit("input", date);
      this.showBox = false;
    },
    formateDate(value) {
      if (value) {
        return new Date(value).format(this.format);
      } else {
        return null;
      }
    }
  }
};
</script>

<style scoped></style>
