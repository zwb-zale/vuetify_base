<template>
  <div class="yjuzhong-1">
    <v-file-input
      class="mr-2"
      :show-size="showSize"
      counter
      :multiple="multiple"
      :accept="accept"
      v-model="files"
      :label="label"
      @click:clear="cleanFile(1)"
    ></v-file-input>
    <v-progress-circular
      class="text-sm-caption"
      color="#00FFFF"
      :value="jindu"
      :rotate="-90"
      :size="35"
      >{{ jindu }}</v-progress-circular
    >
    <v-expand-x-transition>
      <v-btn
        class="mx-2"
        fab
        dark
        small
        color="primary"
        :size="35"
        :elevation="1"
        v-if="docid"
      >
        <v-icon dark>
          cloud_download
        </v-icon>
        <v-btn
          style="position: absolute;right: -5px;top: -12px"
          :elevation="1"
          fab
          color="pink"
          :height="15"
          :width="15"
          @click.stop="delFile"
        >
          <v-icon dark size="15">
            close
          </v-icon>
        </v-btn>
      </v-btn>
    </v-expand-x-transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  props: {
    showSize: {
      type: Boolean,
      default: true
    },

    multiple: {
      type: Boolean,
      default: false
    },
    docid: {
      type: String,
      default: ""
    },
    accept: {
      type: String,
      default: "file"
    },
    label: {
      type: String,
      default: "选择文件"
    },
    one_file_name: {
      type: String,
      default: ""
    },
    limit: {
      type: Number,
      default: 9
    },
    url: {
      type: String,
      default: ""
    },
    extra_data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    permision_name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      sendForm: null,
      files: [],
      jindu: 0
    };
  },
  watch: {
    files(newVal) {
      this.sendForm = null;
      if (newVal.length > 0) {
        this.fileUpdate(newVal);
      }
    }
  },
  destroyed() {
    this.cleanFile();
  },
  methods: {
    delFile() {
      this.$emit("delFile");
    },
    cleanFile() {
      this.sendForm = null;
      this.files = [];
      this.jindu = 0;
      this.$emit("changeStatus", false);
    },
    fileUpdate(datas) {
      let me = this;
      this.jindu = 0;

      this.$emit("changeStatus", true);
    },
    conFirm() {
      let me = this;
      if (!me.url) {
        return;
      }
      this.$emit("changeStatus", false);
      this.sendForm = new FormData();
      for (let key in this.extra_data) {
        if (this.extra_data[key]) {
          this.sendForm.append(key, this.extra_data[key]);
        }
      }
      for (let i = 0; i < this.files.length; i++) {
        if (this.one_file_name) {
          this.sendForm.append(this.one_file_name, this.files[i]);
        } else {
          this.sendForm.append("file", this.files[i]);
        }
      }
      axios({
        url: me.url,
        method: "post",
        data: me.sendForm,
        headers: { "content-Type": "multipart/form-data" },
        onUploadProgress: progressEvent => {
          me.jindu = Number(
            ((progressEvent.loaded / progressEvent.total) * 100) | 0
          );
        }
      })
        .then(res => {
          me.$emit("success", res.data);
          me.$emit("changeStatus", false);
          me.sendForm = null;
        })
        .catch(error => {
          me.jindu = 0;
          me.$emit("changeStatus", true);
          me.$message.error(JSON.stringify(error.response.data));
        });
    }
  }
};
</script>

<style scoped></style>
