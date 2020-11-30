<template>
  <div :class="[textline ? '' : 'fullWidth']" class="d-flex px-3 py-1">
    <div :style="{ width: textWidth }">
      <form-lable :required="required" :text="text" />
    </div>
    <div :style="{ width: inputWidth }">
      <v-text-field
        v-if="textline"
        hide-details="auto"
        single-line
        outlined
        dense
        @click="sendClick"
        @input="updateDate"
        :type="type"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :rules="required ? inputRules : []"
        :required="required"
      >
        <template v-slot:label>
          <div class="text-body-2 lableColor">{{label}}</div>
        </template>
      </v-text-field>
      <v-textarea
        v-else
        hide-details="auto"
        single-line
        outlined
        dense
        :auto-grow="auto_grow"
        @click="sendClick"
        @input="updateDate"
        :rows="rows"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :rules="required ? inputRules : []"
        :required="required"
      >
        <template v-slot:label>
          <div class="text-body-2 lableColor">{{label}}</div>
        </template>
      </v-textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "formItem",
  props: {
    value: [String, Number],
    text: [String, Number],
    label : {
      type: String,
      default: ""
    },
    auto_grow: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    textline: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
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
    }
  },
  methods: {
    updateDate(date) {
      this.$emit("input", date);
    },
    sendClick() {
      this.$emit("sendClick");
    }
  }
};
</script>

<style scoped>
.fullWidth {
  width: 100%;
}
</style>
