<template>
  <div class="main_edit_Box">
    <v-toolbar dense height="41" :elevation="0">
      <v-btn fab small width="30" height="30" :elevation="1" @click="goBack">
        <v-icon size="20">
          arrow_back
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-form ref="empForm" class="editFormBox" v-model="valid">
      <v-container fluid>
        <v-row class="pa-2 pr-8">
          <form-item
            textWidth="150px"
            required
            text="姓名"
            v-model="employee.name"
          />
          <form-item
            textWidth="150px"
            required
            text="代码"
            v-model="employee.code"
          />
          <form-item
            textWidth="150px"
            @sendClick="showCompany"
            readonly
            required
            text="所属公司"
            v-model="employee.company_name"
          />
          <form-select
            textWidth="150px"
            itemtext="name"
            itemvalue="value"
            text="性别"
            :items="sexItems"
            v-model="employee.sex"
          />
          <form-item
            textWidth="150px"
            text="电话"
            v-model="employee.mobtelphone"
          />
          <form-item
            textWidth="150px"
            text="身份证号"
            v-model="employee.identityno"
          />
          <form-date
            textWidth="150px"
            text="生日"
            v-model="employee.birthday"
          />
          <form-date
            textWidth="150px"
            text="入职日期"
            v-model="employee.accessiondate"
          />
          <form-select
            textWidth="150px"
            itemtext="name"
            itemvalue="value"
            text="是否离职"
            :items="isdimissionItems"
            v-model="employee.isdimission"
          />
          <form-date
            v-if="employee.isdimission"
            textWidth="150px"
            text="离职日期"
            v-model="employee.dimissiondate"
          />
          <form-select
            type="combox"
            textWidth="150px"
            text="民族"
            :items="nations"
            v-model="employee.nation"
          />
          <form-item
            textWidth="150px"
            text="联系人"
            v-model="employee.linkman"
          />
          <form-item
            textWidth="150px"
            text="联系人电话"
            v-model="employee.linktelphone"
          />
          <form-item
            textWidth="150px"
            inputWidth="calc(100% - 200px)"
            :rows="2"
            :textline="false"
            text="联系地址"
            v-model="employee.address"
          />
          <form-item
            textWidth="150px"
            inputWidth="calc(100% - 200px)"
            :rows="2"
            :textline="false"
            text="备注"
            v-model="employee.remark"
          />
          <upload-img
            class="pl-16 py-2"
            ref="imgPost"
            url="/kong/maxguide-fleetmng/v1.0/employeepicture"
            :extra_data="{ extra_data:'' }"
            one_file_name="pic"
            :one_yun_img="
              employee.picturefilename
                ? './fleetmng-images/' + employee.picturefilename.split('/').pop()
                : ''
            "
            label="员工照片"
            checkRepeat
            @changeStatus="imgChange"
            @success="imgSuccess"
          />
        </v-row>
      </v-container>
    </v-form>
    <v-footer height="48" absolute class="d-flex justify-center">
      <v-btn text elevation="0" class="mx-15" @click="goBack">取消 </v-btn>
      <v-btn
        color="primary"
        elevation="1"
        class="mx-15"
        @click="onSubmit"
        >保存
      </v-btn>
    </v-footer>
  </div>
</template>

<script>
import UploadImg from "@/components/UploadImg/index";
import {
  getEmployeesID,
  removeEmployee,
  createEmployee,
  updateEmployee,
} from "@/api/employee.js";

export default {
  name: "editEmp",
  components: {
    UploadImg
  },
  data() {
    return {
      employee: {},
      employeID: "",
      safety_file_ready: false,
      faceIMG_ready: false,
      form_fields: [
        "name",
        "code",
        "birthday",
        "sex",
        "mobtelphone",
        "linkman",
        "linktelphone",
        "accessiondate",
        "dimissiondate",
        "remark",
        "address",
        "identityno",
        "nation",
        "isdimission",
        "companyid",
      ],
      valid: false,
      sexItems: [
        {
          name: "男",
          value: 0
        },
        {
          name: "女",
          value: 1
        }
      ],
      isdimissionItems: [
        {
          name: "是",
          value: true
        },
        {
          name: "否",
          value: false
        }
      ],
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
      work_groups: [],
      inputRules: [v => !!v || "此栏位是必须的"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  props: {
    formDatas: {
      type: Object,
      default: {}
    }
  },
  watch: {
    formDatas: {
      //监听的对象
      deep: true, //深度监听设置为 true
      handler: function(newV, oldV) {
        this.employee = newV;
        this.employeID = newV.id;
      }
    }
  },
  mounted() {
    this.employee = this.formDatas;
    this.employeID = this.employee.id;
  },
  methods: {
    onSubmit() {
      let me = this;
      if (this.$refs.empForm.validate()) {
        const data = JSON.parse(JSON.stringify(this.employee));
        // 將所有輸入框爲空的值變爲null
        Object.keys(data).forEach(key => {
          if (key === "id" || me.form_fields.includes(key)) {
            if (data[key] === "") {
              data[key] = null;
            }
          } else {
            delete data[key];
          }
        });
        if (data.hasOwnProperty("id")) {
          updateEmployee(data)
            .then(response => {
              this.$emit("updateForm", response.data);
              this.$store.commit("UpdateEmployee", response.data);
              this.$message.success({
                duration: 2000,
                message: this.$t("dataManage.success_modified")
              });
              if (me.faceIMG_ready) {
                me.$refs.imgPost.conFirm();
              }
            })
            .catch(err => {
              this.$message.error(this.$t("dataManage.edit_fail"));
              console.log(err);
            });
        } else {
          createEmployee(data)
            .then(response => {
              this.$emit("updateForm", response.data);
              this.employeID = this.employee.id;
              this.$store.commit("AddEmployee", response.data);
              this.$nextTick(() => {
                if (me.faceIMG_ready) {
                  me.$refs.imgPost.conFirm();
                }
              });
              this.$message.success({
                duration: 2000,
                message: this.$t("dataManage.success_added")
              });
            })
            .catch(err => {
              this.$message.error(this.$t("dataManage.edit_fail"));
              console.log(err);
            });
        }
      }
    },
    imgChange(status) {
      this.faceIMG_ready = status;
    },
    imgSuccess(res) {
      this.$emit("updateIMG", res.doc_fileid);
      this.$store.commit("UpdateEmployee", this.employee);
    },
    goBack() {
      this.$emit("back");
    },
    showCompany() {
      this.$emit("showCompany");
    },
    changeINT(value) {
      if (value) {
        return value.toString();
      } else {
        return "";
      }
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
