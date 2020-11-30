<template>
  <div style="width: 98%;">
    <v-row>
      <v-dialog v-model="imgDialog" max-width="50vw" max-height="70vh">
        <img style="max-width:50vw;max-height:70vh" :src="imgUrl" />
      </v-dialog>
      <v-col cols="12" md="12" class="yjuzhong-1 py-0">
        <v-file-input
          class="mr-2 mt-0 pt-0"
          prepend-icon="mdi-camera"
          :disabled="!add_permition"
          :show-size="showSize"
          :counter="showSize ? limitCount : null"
          :multiple="multiple"
          :accept="accept"
          v-model="files"
          :label="label"
          @click:clear="cleanFile(1)"
        >
        </v-file-input>
        <v-progress-circular
          class="text-sm-caption"
          color="#00FFFF"
          :value="jindu"
          :rotate="-90"
          :size="35"
          >{{ jindu }}</v-progress-circular
        >
      </v-col>
      <v-col
        class="py-0 mb-2"
        cols="12"
        md="2"
        v-for="(item, index) in yun_imgs"
        :key="'yun' + index"
      >
        <v-img
          contain
          height="128"
          :src="item.file"
          @click="showIMG(item.file)"
        >
          <v-btn
            v-if="del_permition"
            style="position: absolute;right: 0;top: 0"
            :elevation="1"
            fab
            dark
            color="pink"
            :height="25"
            :width="25"
            @click.stop="del_yunimg(item.id)"
          >
            <v-icon dark size="25">
              close
            </v-icon>
          </v-btn>
        </v-img>
      </v-col>
      <v-col
        class="py-0 mb-2"
        cols="12"
        md="2"
        v-for="(item, index) in imgsback"
        :key="'local' + index"
      >
        <v-img
          contain
          :height="huge ? 200 : 128"
          :src="item.file"
          @click="showIMG(item.file)"
        >
          <v-btn
            v-if="multiple || limit > 1"
            style="position: absolute;right: 0;top: 0"
            :elevation="1"
            fab
            dark
            color="pink"
            :height="25"
            :width="25"
            @click.stop="del_file(item.name, index)"
          >
            <v-icon dark size="25">
              close
            </v-icon>
          </v-btn>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  props: {
    //是否自动上传，目前只支持单文件自动上传，
    // 当multiple为false时并且one_file_name存在时，可配置自动上传功能
    auto_upload: {
      type: Boolean,
      default: false
    },
    add_permition: {
      type: Boolean,
      default: true
    },
    del_permition: {
      type: Boolean,
      default: true
    },
    showSize: {
      type: Boolean,
      default: true
    },
    huge: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: "image/png, image/jpeg"
    },
    label: {
      type: String,
      default: "选择文件"
    },
    checkRepeat: {
      //过滤文件名相同的文件
      type: Boolean,
      default: false
    },
    one_file_name: {
      //单文件上传时的文件字段名
      type: String,
      default: ""
    },
    more_file_name: {
      //多文件上传时的文件字段名
      type: String,
      default: ""
    },
    limit: {
      //文件数量
      type: Number,
      default: 1
    },
    url: {
      //上传文件地址
      type: String,
      default: ""
    },
    extra_data: {
      //附加参数
      type: Object,
      default: () => {
        return {};
      }
    },
    yun_imgs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    one_yun_img: {
      //单图片云端图片，如头像
      type: String,
      default: ""
    }
  },
  data() {
    return {
      finalFiles: [],
      sendForm: null,
      files: [],
      jindu: 0,
      imgsback: [],
      imgUrl: "",
      imgDialog: false
    };
  },
  computed:{
    limitCount(){
      return this.limit-this.yun_imgs.length
    }
  },
  watch: {
    files(newVal) {
      this.sendForm = null;
      if (newVal.length > 0) {
        this.fileUpdate(newVal);
      }
    },
    one_yun_img(newVal) {
      if (newVal) {
        this.imgsback = [{ file: newVal, name: newVal }];
      }
    }
  },
  destroyed() {
    this.cleanFile(1);
  },
  mounted() {
    if (this.one_yun_img) {
      this.imgsback = [{ file: this.one_yun_img, name: this.one_yun_img }];
    }
  },
  methods: {
    showIMG(imgUrl) {
      this.imgUrl = imgUrl;
      this.imgDialog = true;
    },
    del_file(name, indeximg) {
      let index = this.finalFiles.findIndex(item => item.name === name);
      this.finalFiles.splice(index, 1);
      this.imgsback.splice(indeximg, 1);
      this.files = this.finalFiles;
    },
    cleanFile(type) {
      this.sendForm = null;
      this.files = [];
      this.finalFiles = [];
      this.imgsback = [];
      if (type === 1) {
        this.jindu = 0;
        this.$emit("changeStatus", false);
        if (this.one_yun_img) {
          this.imgsback = [{ file: this.one_yun_img, name: this.one_yun_img }];
        }
      }
    },
    fileUpdate(datas) {
      let me = this;
      if (this.multiple || this.limit > 1) {
        for (let i = 0; i < datas.length; i++) {
          let nowTM = new Date().getTime(); //用作file数组里的key
          if (this.checkRepeat) {
            //检查文件是否重名
            let check_repeat = this.finalFiles.some(function(item) {
              if (item.name === datas[i].name) {
                return true;
              }
            });
            if (check_repeat) {
              continue;
            }
          } else {
            if (datas[i].hasOwnProperty("key")) {
              //检查file对象是否包含key，如果有key，则认为是已处理过的file，跳过
              continue;
            }
          }
          if (me.finalFiles.length === me.limit - me.yun_imgs.length) {
            //超出图片限制
            this.$message.warning({
              duration: 1500,
              message: "照片数量已达上限"
            });
            break;
          } else {
            if (datas[i].size / 1024 / 1024 > 1) {
              //超出图片大小1m的限制
              this.$message.warning({
                duration: 1500,
                message: "照片大小不能超过1兆"
              });
            } else {
              this.jindu = 0;
              //finalFiles最终会赋值给files，用于更改上传组件中输入框显示的文件个数，
              // 保证无论用户调用几次文件选择器，
              // input输入框显示的文件个数始终是所有累计之和(不做处理的话，输入框显示的文件个数始终是单次选择文件的数量)，
              // 这也会触发files的watch机制，导致重复调用fileUpdate，
              // 所以在finalFiles对象中手动添加key字段用于辨别是否是重复调用了fileUpdate，
              // 因为在原始的file对象中不存在key属性，如果有key，说明是重复的
              this.finalFiles.push({
                file: datas[i],
                name: datas[i].name,
                size: datas[i].size,
                key: nowTM
              });
              let reader = new FileReader();
              reader.readAsDataURL(datas[i]);
              reader.onload = function(e) {
                //展示图片
                me.imgsback.push({
                  file: e.target.result,
                  name: datas[i].name,
                  key: nowTM
                }); // base 64 图片地址形成预览
              };
              if (me.auto_upload) {
                //自动上传
                if (me.one_file_name) {
                  //只单文件上传
                  me.one_file_autoUp(datas[i]);
                }
              }
            }
          }
        }
      } else {
        if (datas[0].size / 1024 / 1024 > 1) {
          this.$message.warning({
            duration: 1500,
            message: "照片大小不能超过1兆"
          });
        } else {
          if (datas[0].hasOwnProperty("key")) {
            return;
          }
          this.jindu = 0;
          this.finalFiles = [
            { file: datas[0], name: datas[0].name, size: datas[0].size, key: 0 }
          ];
          let reader = new FileReader();
          reader.readAsDataURL(datas[0]);
          reader.onload = function(e) {
            me.imgsback = [{ file: e.target.result, name: datas[0].name }]; // base 64 图片地址形成预览
          };
        }
      }
      this.$nextTick(() => {
        this.files = this.finalFiles;
        this.$emit("changeStatus", true);
      });
    },
    one_file_autoUp(file) {
      let me = this;
      this.sendForm = new FormData();
      for (let key in this.extra_data) {
        if (this.extra_data[key]) {
          this.sendForm.append(key, this.extra_data[key]);
        }
      }
      this.sendForm.append(this.one_file_name, file);
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
          me.cleanFile(0);
          me.$nextTick(() => {
            me.$emit("success", res.data);
            me.$emit("changeStatus", false);
          });
        })
        .catch(error => {
          me.jindu = 0;
          me.$emit("changeStatus", true);
          me.$message.error({
            duration: 3000,
            message:
              "上传失败，请重新上传！错误原因：" +
              JSON.stringify(error.response.data)
          });
          me.cleanFile(0);
        });
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
      if (this.one_file_name) {
        this.sendForm.append(this.one_file_name, this.files[0].file);
      } else {
        for (let i = 0; i < this.files.length; i++) {
          if(i===0){
            this.sendForm.append(this.more_file_name, this.files[i].file);
          }else{
            this.sendForm.append(this.more_file_name + i, this.files[i].file);
          }
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
          me.cleanFile(0);
          me.$nextTick(() => {
            me.$emit("success", res.data);
            me.$emit("changeStatus", false);
          });
        })
        .catch(error => {
          me.jindu = 0;
          me.$emit("changeStatus", true);
          me.$message.error(JSON.stringify(error.response.data));
        });
    },
    del_yunimg(id) {
      //删除云端照片
      this.$emit("delete", id);
    }
  }
};
</script>

<style scoped></style>
