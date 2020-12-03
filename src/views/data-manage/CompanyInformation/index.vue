<template>
  <div class="appBox">
    <!--    公司tree-->
    <com-tree
        :showAll="false"
        :visible="com_tree_dialog"
        @set_company="set_company"
        @close_dialog="com_tree_dialog = false"
    />
    <!--    工具栏-->
    <div class="py-0 mx-2 mb-1 d-flex align-center">
      <v-row style="height: 100%;">
        <v-col cols="12" md="3" class="py-0">
          <date-picker
              label="开始时间~结束时间"
              type="range"
              hide_details
              dense
              v-model="searchData.daterange"
          ></date-picker>
        </v-col>
        <v-col cols="12" md="3" class="py-0">
          <date-picker
              label="选择时间"
              hide_details
              dense
              v-model="searchData.date"
          ></date-picker>
        </v-col>
        <v-col cols="12" md="2" class="py-0">
          <v-text-field
              v-model="searchData.company_name"
              clearable
              dense
              label="公司"
              flat
              hide-details
              :height="28"
              readonly
              @click="com_tree_dialog = true"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" class="py-0">
          <date-picker
              label="有边框选择时间"
              outlined
              hide_details
              dense
              v-model="searchData.date"
          ></date-picker>
        </v-col>

        <v-col cols="12" md="12" class="py-0">
          <div class="text-center">
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
                @click="testNotify"
            >
              <v-icon dark>
                search
              </v-icon>
            </v-btn>

            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink"
            >
              <v-icon dark>
                search
              </v-icon>
            </v-btn>

            <v-btn
                class="mx-2"
                fab
                dark
                color="indigo"
            >
              <v-icon dark>
                search
              </v-icon>
            </v-btn>

            <v-btn
                class="mx-2"
                fab
                dark
                color="teal"
            >
              <v-icon dark>
                search
              </v-icon>
            </v-btn>

            <v-btn
                class="mx-2"
                fab
                dark
                large
                color="cyan"
            >
              <v-icon dark>
                search
              </v-icon>
            </v-btn>

            <v-btn
                class="mx-2"
                fab
                dark
                large
                color="purple"
            >
              <v-icon dark>
                search
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="12" class="py-0">
          <v-form ref="Form" v-model="valid">
            <v-container>
              <v-row>
                <form-item
                    textWidth="150px"
                    required
                    text="姓名"
                    v-model="datas.name"
                />
                <form-item
                  textWidth="150px"
                  @sendClick="com_tree_dialog = true"
                  readonly
                  required
                  text="所属公司"
                  v-model="datas.company_name"
                />
                <form-select
                    textWidth="150px"
                    itemtext="name"
                    itemvalue="value"
                    text="性别"
                    :items="[{name: '男',value: 0},{name: '女',value: 1}]"
                    v-model="datas.sex"
                />
                <form-date
                    textWidth="150px"
                    text="生日"
                    v-model="datas.birthday"
                />
                <form-datetime
                required
                textWidth="150px"
                label="2020-01-01 00:00:00"
                text="时间"
                v-model="datas.date_time"/>
                <form-select
                    type="combox"
                    textWidth="150px"
                    text="民族"
                    :items="nations"
                    v-model="datas.nation"
                />
                <form-item
                    textWidth="150px"
                    inputWidth="calc(100% - 200px)"
                    :rows="3"
                    :textline="false"
                    text="联系地址"
                    v-model="datas.address"
                />
                <v-col cols="12" md="12" class="pl-16 py-2">
                  <upload-file
                    ref="myFile"
                    one_file_name="file"
                    url="posturl"
                    label="单文件上传"
                    :docid="datas.fileid"
                    :extra_data="{ extra_data:'' }"
                    @changeStatus="safeFileChange"
                    @success="safefileSuccess"
                    @delFile="del_safefile"
                  />
                </v-col>
                <upload-img
                    class="pl-16 py-2"
                    ref="imgPost"
                    url="posturl"
                    :extra_data="{ extra_data:'' }"
                    one_file_name="pic"
                    :one_yun_img="
                    datas.img_id? 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg': ''
                  "
                    label="单张照片"
                    checkRepeat
                    @changeStatus="imgChange"
                    @success="imgSuccess"
                />
                <upload-img
                    class="pl-16 py-2"
                    ref="moreimgPost"
                    url="posturl"
                    :extra_data="{ extra_data:'' }"
                    :limit="8"
                    :yun_imgs="yun_imgs"
                    multiple
                    more_file_name="file"
                    label="多图片打包上传"
                    checkRepeat
                    @changeStatus="imgChange"
                    @success="imgSuccess"
                    @delete="deleteIMG"
                />
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </div>
    <div>{{ searchData }}</div>

  </div>
</template>

<script>

import UploadImg from "@/components/UploadImg/index";
import UploadFile from "@/components/UploadFile/index";
export default {
  name: "CompanyInformation",
  components: {
    UploadImg,UploadFile
  },
  data() {
    return {
      valid: false,
      com_tree_dialog: false,
      datas: {},
      searchData: {
        daterange: null,
        company_name: ''
      },
      nations: [
        "汉族",
        "蒙古族",
        "回族",
        "藏族",
        "维吾尔族",
        "苗族",
        "彝族",
        "壮族",
        "布依族",
        "朝鲜族",
        "满族",
        "侗族",
        "瑶族",
        "白族",
        "土家族",
        "哈尼族",
        "哈萨克族",
        "傣族",
        "黎族",
        "傈僳族",
        "佤族",
        "畲族",
        "高山族",
        "拉祜族",
        "水族",
        "东乡族",
        "纳西族",
        "景颇族",
        "柯尔克孜族",
        "土族",
        "达斡尔族",
        "仫佬族",
        "羌族",
        "布朗族",
        "撒拉族",
        "毛难族",
        "仡佬族",
        "锡伯族",
        "阿昌族",
        "普米族",
        "塔吉克族",
        "怒族",
        "乌孜别克族",
        "俄罗斯族",
        "鄂温克族",
        "崩龙族",
        "保安族",
        "裕固族",
        "京族",
        "塔塔尔族",
        "独龙族",
        "鄂伦春族",
        "赫哲族",
        "门巴族",
        "珞巴族",
        "基诺族"
      ],
      img_ready: false,           //提交表单时，如果img_ready为true，则有照片需要上传；this.$refs.imgPost.conFirm();
      file_ready:false,
      yun_imgs: [
        {file: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=188173295,510375359&fm=26&gp=0.jpg', id: 0},
        {file: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg', id: 2}
      ]
    }
  },
  methods: {
    testNotify(){
      this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
    },
    del_safefile() {
      this.$message.success({
        duration: 2000,
        message: '删除图片，id:' + datas.fileid
      });
    },
    safeFileChange(status) {
      this.file_ready = status;
    },
    safefileSuccess(res) {

    },
    imgChange(status) {
      this.img_ready = status;
    },
    imgSuccess(res) {

    },
    deleteIMG(id) {
      this.$message.success({
        duration: 2000,
        message: '删除图片，id:' + id
      });
      this.yun_imgs = this.yun_imgs.filter(item => {
            return item.id !== id
          })
    },
    set_company(company) {
      this.searchData.company_name = company.name;
      this.searchData.companyid = company.id;
      this.datas.company_name = company.name;
      this.datas.company_name = company.name;
    },
  }
};
</script>

<style scoped>
/*div>>>.v-footer{*/
/*  bottom: 0;*/
/*}*/
</style>
