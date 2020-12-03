<template>
  <v-dialog v-model="display" :width="dialogWidth" @click:outside="okHandler">
    <template v-slot:activator="{ on }">
      <div class="d-flex px-3 py-1">
        <div v-if="formlable" :style="{ width: textWidth }">
          <form-lable :required="required" :text="text"/>
        </div>
        <div :style="{ width: inputWidth }">
          <v-text-field
              v-bind="textFieldProps"
              clearable
              :disabled="disabled"
              :loading="loading"
              :label="label"
              :value="formattedDatetime"
              :rules="required ? inputRules : []"
              :required="required"
              @click:clear="clearHandler"
              hide-details="auto"
              single-line
              outlined
              dense
              v-on="on"
              readonly
          >
            <template v-slot:progress>
              <slot name="progress">
                <v-progress-linear color="primary" indeterminate absolute height="2"></v-progress-linear>
              </slot>
            </template>
            <template v-slot:label>
              <div class="text-body-2 lableColor">{{ label }}</div>
            </template>
          </v-text-field>
        </div>
      </div>

    </template>

    <v-card>
      <v-card-text class="px-0 py-0">
        <v-tabs fixed-tabs v-model="activeTab">
          <v-tab key="calendar">
            <slot name="dateIcon">
              <v-icon>event</v-icon>
            </slot>
          </v-tab>
          <v-tab key="timer" :disabled="dateSelected">
            <slot name="timeIcon">
              <v-icon>access_time</v-icon>
            </slot>
          </v-tab>
          <v-tab-item key="calendar">
            <v-date-picker :first-day-of-week="1" v-model="date" v-bind="datePickerProps" @input="showTimePicker" full-width></v-date-picker>
          </v-tab-item>
          <v-tab-item key="timer">
            <v-time-picker
                ref="timer"
                class="v-time-picker-custom"
                v-model="time"
                v-bind="timePickerProps"
                format="24hr"
                full-width
                use-seconds
            ></v-time-picker>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions" :parent="this">
          <v-btn color="grey lighten-1" text @click.native="clearHandler">{{ clearText }}</v-btn>
          <v-btn color="green darken-1" text @click="okHandler">{{ okText }}</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const DEFAULT_DATE = ''
const DEFAULT_TIME = '00:00:00'
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'
const DEFAULT_TIME_FORMAT = 'hh:mm:ss'
const DEFAULT_DIALOG_WIDTH = 380
const DEFAULT_CLEAR_TEXT = '清除'
const DEFAULT_OK_TEXT = '确认'

export default {
  name: 'formDatetime',
  model: {
    prop: 'datetime',
    event: 'input'
  },
  props: {
    formlable: {
      type: Boolean,
      default: true
    },
    datetime: {
      type: [Date, String],
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    label: {
      type: String,
      default: ''
    },
    dialogWidth: {
      type: Number,
      default: DEFAULT_DIALOG_WIDTH
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT
    },
    timeFormat: {
      type: String,
      default: DEFAULT_TIME_FORMAT
    },
    clearText: {
      type: String,
      default: DEFAULT_CLEAR_TEXT
    },
    okText: {
      type: String,
      default: DEFAULT_OK_TEXT
    },
    textFieldProps: {
      type: Object
    },
    datePickerProps: {
      type: Object
    },
    timePickerProps: {
      type: Object
    },
    text: [String, Number],
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
      display: false,
      activeTab: 0,
      date: DEFAULT_DATE,
      time: DEFAULT_TIME
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    dateTimeFormat() {
      return this.dateFormat + ' ' + this.timeFormat
    },
    defaultDateTimeFormat() {
      return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
    },
    formattedDatetime() {
      return this.selectedDatetime ? new Date(this.selectedDatetime).format(this.dateTimeFormat) : ''
    },
    selectedDatetime() {
      if (this.date && this.time) {
        let datetimeString = this.date + ' ' + this.time
        if (this.time.length === 5) {
          datetimeString += ':00'
        }
        return new Date(datetimeString)
      } else {
        return null
      }
    },
    dateSelected() {
      return !this.date
    }
  },
  methods: {
    init() {
      if (!this.datetime) {
        return
      }
      // let initDateTime
      // if (this.datetime instanceof Date) {
      //   initDateTime = this.datetime
      // } else if (typeof this.datetime === 'string' || this.datetime instanceof String) {
      //   initDateTime = parse(this.datetime, this.dateTimeFormat, new Date())
      // }
      this.date = new Date(this.datetime).format('yyyy-MM-dd')
      this.time = new Date(this.datetime).format('hh:mm:ss')
    },
    okHandler() {
      this.resetPicker()
      this.$emit('input', this.selectedDatetime)
    },
    clearHandler() {
      this.resetPicker()
      this.date = DEFAULT_DATE
      this.time = DEFAULT_TIME
      this.$emit('input', null)
    },
    resetPicker() {
      this.display = false
      this.activeTab = 0
      if (this.$refs.timer) {
        this.$refs.timer.selectingHour = true
      }
    },
    showTimePicker() {
      this.activeTab = 1
    }
  },
  watch: {
    datetime: function () {
      this.init()
    },
    display(newVal) {
      if(newVal&&!this.datetime){
        this.date=new Date().format('yyyy-MM-dd')
        this.time=new Date().format('hh:mm:ss')
      }
    },
  }
}
</script>
