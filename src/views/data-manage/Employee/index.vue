<template>
  <div class="appBox">
    <!--    导入员工资料dialog-->
    <v-dialog v-model="upload_dialogVisible" width="750px">
      <v-card width="750px">
        <v-card-title class="d-flex justify-center">
          导入员工资料
        </v-card-title>
        <v-card-text>
          <v-text-field
            class="my-5"
            v-model="company_name_up"
            clearable
            dense
            label="公司"
            flat
            hide-details
            :height="28"
            readonly
            @click="com_tree_dialog = true"
          ></v-text-field>
          <upload-file
            class="my-5"
            v-if="upload_dialogVisible"
            ref="uploadexcel"
            multiple
            one_file_name="xlsfile"
            url="/kong/companymng/v1.0/import_employee4xls"
            accept=".xls,.xlsx"
            :extra_data="exp_upload_data"
            @changeStatus="uploadchange"
            @success="uploadsuccess"
          />
          <div class="mb-9">调整Excel列数</div>
          <v-slider
            v-model="excel_col_number"
            thumb-label="always"
            max="30"
            min="0"
          >
            <template v-slot:prepend>
              <v-icon color="indigo" @click="decrement">
                remove
              </v-icon>
            </template>

            <template v-slot:append>
              <v-icon color="indigo" @click="increment">
                add
              </v-icon>
            </template>
          </v-slider>
          <v-divider></v-divider>
          <v-form ref="excelForm" class="editFormBox" v-model="ExcelValid">
            <v-container fluid>
              <v-row class="pa-2 pr-8">
                <template v-for="(item, index) in excel_col_number">
                  <v-col :key="index" cols="12" md="4">
                    <v-select
                      outlined
                      hide-details="auto"
                      dense
                      item-text="label"
                      item-value="value"
                      :label="'第' + (index + 1) + '列'"
                      :rules="[
                        v => !!v || '',
                        v => filer_repear_col(v) < 2 || '不能重复'
                      ]"
                      :items="all_emp_cols"
                      @change="excelColItemChange($event, index)"
                    >
                    </v-select>
                  </v-col>
                </template>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-footer class="font-weight-medium">
          <v-spacer></v-spacer>
          <v-btn
            elevation="1"
            small
            depressed
            @click="upload_dialogVisible = false"
          >
            取消
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!uploadReady"
            elevation="1"
            small
            depressed
            color="primary"
            @click="upload_employee2xls"
          >
            确认
          </v-btn>
          <v-spacer></v-spacer>
        </v-footer>
      </v-card>
    </v-dialog>
    <!--    导出员工资料dialog-->
    <v-dialog v-model="donwload_dialogVisible" width="350px">
      <v-card width="350px">
        <v-card-title class="d-flex justify-center">
          筛选条件
        </v-card-title>
        <v-card-text>
          <v-text-field
            class="my-9"
            v-model="download_param.company_name"
            clearable
            dense
            label="公司(选填)"
            flat
            hide-details
            :height="28"
            readonly
            @click="com_tree_dialog = true"
          ></v-text-field>
          <v-text-field
            class="my-9"
            v-model="download_param.work_area"
            clearable
            dense
            label="工区(选填)"
            flat
            hide-details
            :height="28"
          ></v-text-field>
        </v-card-text>

        <v-footer class="font-weight-medium">
          <v-spacer></v-spacer>
          <v-btn
            elevation="1"
            small
            depressed
            @click="donwload_dialogVisible = false"
          >
            取消
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            elevation="1"
            small
            depressed
            color="primary"
            @click="export_employee2xls"
          >
            确认
          </v-btn>
          <v-spacer></v-spacer>
        </v-footer>
      </v-card>
    </v-dialog>
    <!--    删除所有选中数据-->
    <v-dialog v-model="del_all_dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          提示
        </v-card-title>

        <v-card-text>
          此操作将永久删除此数据, 是否继续?
        </v-card-text>

        <v-card-actions>
          <v-btn color="darken-1" text @click="del_all_dialog = false">
            取消
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="delete_select_datas">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    删除单个数据-->
    <v-dialog v-model="delete_one_dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          提示
        </v-card-title>

        <v-card-text>
          此操作将永久删除选中数据, 是否继续?
        </v-card-text>

        <v-card-actions>
          <v-btn color="darken-1" text @click="delete_one_dialog = false">
            取消
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="delete_one_confirm">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    工具栏-->
    <div class="mb-1 py-3">
      <v-row style="height: 100%;">
        <v-col cols="12" md="2" class="py-0">
          <v-text-field
            clearable
            v-model="searchData.name"
            dense
            label="姓名(选填)"
            flat
            hide-details
            :height="28"
            @keydown="keyDown"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="py-0">
          <v-text-field
            v-model="company_name"
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
        <v-col cols="12" md="2" class="py-0 d-flex align-end">
          <v-btn depressed :elevation="0" small @click="query_employees(1)">
            <v-icon dark>
              search
            </v-icon>
          </v-btn>
          <v-btn
            v-permission:insert
            class="ml-4"
            color="primary"
            depressed
            :elevation="0"
            small
            @click="createEmp"
          >
            新建
          </v-btn>
          <v-spacer></v-spacer>
        </v-col>
        <v-col cols="12" md="6" class="py-0 d-flex align-end justify-end">
          <!--          v-permission:export_emp-->
          <v-btn
            v-permission:export_emp
            small
            :elevation="1"
            color="success"
            @click="donwload_dialogVisible = true"
          >
            导出excel
          </v-btn>
          <!--          v-permission:import_emp-->
          <v-btn
            v-permission:import_emp
            small
            :elevation="1"
            color="primary"
            class="ml-3"
            @click="upload_dialogVisible = true"
          >
            导入excel
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <!--    表格-->
    <v-data-table
      class="elevation-0"
      show-select
      disable-filtering
      disable-sort
      disable-pagination
      hide-default-footer
      :height="windowInnerHeight - 32"
      :loader-height="3"
      :loading="tableLoading"
      :headers="tableHeader"
      :items="employees"
      :items-per-page="searchData.per_page"
      @input="selectEmps"
    >
      <template v-slot:item.isdimission="{ item }">
        {{ isdimission_formatter(item.isdimission) }}
      </template>
      <template v-slot:item.sex="{ item }">
        {{ sex_formatter(item.sex) }}
      </template>
      <template v-slot:item.safety_fileid="{ item }">
        <v-btn
          v-if="item.safety_fileid"
          depressed
          color="primary"
          small
          @click="downLoadSafefile(item.safety_fileid)"
        >
          下载
        </v-btn>
      </template>
      <template v-slot:item.operate="{ item }">
        <v-btn
          class="mr-1"
          depressed
          fab
          small
          dark
          color="cyan"
          :width="28"
          :height="28"
          @click="editEmpRow(item)"
        >
          <v-icon dark size="15">
            mode_edit
          </v-icon>
        </v-btn>
        <v-btn
          v-permission:delete
          depressed
          fab
          small
          dark
          color="error"
          :width="28"
          :height="28"
          @click="show_delete_one(item)"
        >
          <v-icon dark size="15">
            delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!--    分页栏-->
    <transition name="scale-transition">
      <v-footer
        v-show="!showEdit && pageLen > 1"
        height="50px"
        absolute
        class="font-weight-medium"
      >
        <div>
          <v-btn
            v-permission:delete
            depressed
            color="error"
            :loading="del_all_loading"
            :disabled="del_all_ready === 0"
            @click="del_all_dialog = true"
          >
            删除选中
          </v-btn>
        </div>

        <v-spacer></v-spacer>
        <v-pagination
          light
          v-model="page"
          :length="pageLen"
          :total-visible="10"
          @input="query_employees"
        ></v-pagination>
        <v-spacer></v-spacer>
        <div />
      </v-footer>
    </transition>

    <!--    公司tree-->
    <com-tree
      :visible="com_tree_dialog"
      @set_company="set_company"
      @close_dialog="com_tree_dialog = false"
    />
    <transition name="slide-x-transition">
      <div v-if="showEdit" class="editBox">
        <edit-emp
          :emp_permission="emp_permission"
          :formDatas="employee"
          @updateForm="updateForm"
          @updateIMG="updateIMG"
          @updateFile="updateFile"
          @showCompany="com_tree_dialog = true"
          @back="goback"
        ></edit-emp>
      </div>
    </transition>
  </div>
</template>

<script>
import { removeEmployee, set_approval_perssion } from "@/api/employee.js";
import { mapState } from "vuex";

import UploadFile from "@/components/UploadFile";
import editEmp from "./editEmp";

export default {
  name: "Employee",
  components: {
    UploadFile,
    editEmp
  },
  data() {
    return {
      ExcelValid: false,
      excel_col_number: 0,
      upload_dialogVisible: false,
      uploadReady: false,
      company_name_up: "",
      company_id_up: "",
      showEdit: false,
      donwload_dialogVisible: false,
      com_tree_dialog: false,
      del_all_dialog: false,
      delete_one_dialog: false,
      company_name: "", // 公司篩選框顯示內容
      employee: {}, // 需要編輯或新建的employee
      tableLoading: false,
      del_all_loading: false,
      searchData: {
        companyid: "",
        name: "",
        work_group: "",
        work_area: "",
        per_page: 15
      },
      download_param: {
        companyid: "",
        work_group: "",
        work_area: ""
      },
      total: 0,
      page: 1,
      selectTable_datas: [],
      delete_one_data: {},
      select_emp_cols: [],
      all_emp_cols: [
        {
          label: "ignore",
          value: "ignore"
        },
        {
          label: "姓名（name）",
          value: "name"
        },
        {
          label: "工种（pe）",
          value: "pe"
        },
        {
          label: "代码（code）",
          value: "code"
        },
        {
          label: "所属公司ID（companyid）",
          value: "companyid"
        },
        {
          label: "工区（work_area）",
          value: "name"
        },
        {
          label: "性别（sex）",
          value: "sex"
        },
        {
          label: "电话（mobtelphone）",
          value: "mobtelphone"
        },
        {
          label: "密码MD5（password）",
          value: "password"
        },
        {
          label: "身份证号（identityno）",
          value: "identityno"
        },
        {
          label: "生日（birthday）",
          value: "birthday"
        },
        {
          label: "入职日期（accessiondate）",
          value: "accessiondate"
        },
        {
          label: "是否离职（isdimission）",
          value: "isdimission"
        },
        {
          label: "离职日期（dimissiondate）",
          value: "dimissiondate"
        },
        {
          label: "民族（nation）",
          value: "nation"
        },
        {
          label: "联系人（linkman）",
          value: "linkman"
        },
        {
          label: "联系人电话（linktelphone）",
          value: "linktelphone"
        },
        {
          label: "籍贯（jiguan）",
          value: "jiguan"
        },
        {
          label: "联系地址（address）",
          value: "address"
        },
        {
          label: "职务（remark）",
          value: "remark"
        },
        {
          label: "入场时间（approach_date）",
          value: "approach_date"
        },
        {
          label: "退场时间（departure_date）",
          value: "departure_date"
        }
      ]
    };
  },

  watch: {
    windowInnerHeight(newVal) {
      let p_page;
      p_page = parseInt((this.windowInnerHeight - 32) / 48) - 1;
      if (p_page < 1) {
        p_page = 1;
      }
      this.$set(this.searchData, "per_page", p_page);
      if (!this.showEdit) {
        if (this.employees.length > 0) {
          this.query_employees(1);
        }
      }
    },
    company_name_up(newValue) {
      if (newValue === "") {
        this.company_id_up = "";
      }
    },
    company_name(newValue) {
      if (!newValue) {
        this.searchData.companyid = "";
      }
    },
    "employee.company_name": {
      // 深度检测
      handler: function(newData) {
        if (newData === "") {
          this.employee.companyid = "";
        }
      },
      deep: true
    },
    excel_col_number(newVal, oldVal) {
      if (this.select_emp_cols.length < newVal) {
        let tem_arry = new Array(newVal - this.select_emp_cols.length).fill(
          false
        );
        this.select_emp_cols = this.select_emp_cols.concat(tem_arry);
      } else {
        this.select_emp_cols = this.select_emp_cols.slice(0, newVal);
      }
    }
  },
  computed: {
    ...mapState({
      employees: state => state.employee.employees,
      windowInnerHeight: state => state.app.windowInnerHeight
    }),
    emp_permission() {
      let pmt = this.$route.meta.permissions[0];
      let ops = this.$store.getters.permissions[pmt].ops;
      return {
        edit: ops.indexOf("edit") > -1,
        insert: ops.indexOf("insert") > -1,
        delete: ops.indexOf("delete") > -1
      };
    },
    tableHeader() {
      let basehead = [
        { text: "工种", value: "pe", align: "center" },
        { text: "姓名", value: "name", align: "center" },
        { text: "代码", value: "code", align: "center" },
        { text: "性别", value: "sex", align: "center" },
        { text: "公司名字", value: "company_name", align: "center" },
        { text: "是否离职", value: "isdimission", align: "center" },
        { text: "身份证号", value: "identityno", align: "center" },
        { text: "安全教育信息文件", value: "safety_fileid", align: "center" },
        { text: "操作", value: "operate", align: "center", width: 100 }
      ];
      // let pmt=this.$route.meta.permissions[0]
      // let ops=this.$store.getters.permissions[pmt].ops
      // if(ops.indexOf('edit')>-1||ops.indexOf('delete')>-1){
      //   basehead.push({text: "操作", value: "operate", align: "center", width: 100})
      // }
      return basehead;
    },
    exp_upload_data() {
      if (this.company_id_up) {
        return {
          mapfields: this.select_emp_cols,
          companyid: this.company_id_up
        };
      } else {
        return {
          mapfields: this.select_emp_cols
        };
      }
    },
    pageLen() {
      let lengh;
      if (this.searchData.per_page) {
        lengh = Math.ceil(this.total / this.searchData.per_page);
      } else {
        lengh = 0;
      }
      return lengh;
    },
    del_all_ready() {
      return this.selectTable_datas.length;
    }
  },
  destroyed() {
    this.$store.commit("SetEmployees", []);
  },
  created() {
    this.$set(
      this.searchData,
      "per_page",
      parseInt((this.windowInnerHeight - 32) / 48) - 1
    );
  },
  mounted() {
    this.query_employees(1);
  },
  methods: {
    decrement() {
      if (this.excel_col_number > 0) {
        this.excel_col_number--;
      }
    },
    increment() {
      if (this.excel_col_number < 30) {
        this.excel_col_number++;
      }
    },
    excelColItemChange(e, index) {
      this.select_emp_cols.splice(index, 1, e);
    },
    filer_repear_col(value) {
      let number_col = 0;
      if (value === "ignore") {
        number_col = 1;
      } else {
        for (let i = 0; i < this.select_emp_cols.length; i++) {
          if (number_col >= 2) {
            break;
          }
          if (this.select_emp_cols[i] === value) {
            number_col++;
          }
        }
      }

      return number_col;
    },
    change_appr_permission(e) {
      set_approval_perssion().then(res => {});
    },
    updateForm(data) {
      this.employee = data;
      this.$forceUpdate();
    },
    updateFile(id) {
      this.employee.safety_fileid = id;
    },
    updateIMG(id) {
      this.employee.doc_fileid = id;
    },
    editEmpRow(row) {
      this.showEdit = true;
      this.employee = { ...row };
    },
    createEmp() {
      this.showEdit = true;
    },
    goback() {
      this.showEdit = false;
      this.employee = {};
    },
    downLoadSafefile(id) {
      console.log(`/kong/companymng/v1.0/xview_safety_file?docid=${id}`);
      window.open(`/kong/companymng/v1.0/xview_safety_file?docid=${id}`);
    },
    selectEmps(datas) {
      this.selectTable_datas = datas;
    },
    keyDown(e) {
      if (e.code === "Enter") {
        this.query_employees(1);
      }
    },
    query_employees(page) {
      this.tableLoading = true;
      const params = { page, ...this.searchData };
      this.$store
        .dispatch("GetEmployees", params)
        .then(response => {
          this.total = Number(response.headers["x-total"]);
          this.page = page;
          this.tableLoading = false;
        })
        .catch(err => {
          this.$store.commit("SetEmployees", []);
          this.total = 0;
          this.page = 1;
          this.tableLoading = false;
        });
    },
    export_employee2xls() {
      let index = 0;
      let url = "/kong/companymng/v1.0/export_employee2xls";
      for (let key in this.download_param) {
        if (this.download_param[key] && key !== "company_name") {
          if (index === 0) {
            url = `${url}?${key}=${this.download_param[key]}`;
          } else {
            url = `${url}&${key}=${this.download_param[key]}`;
          }
          index += 1;
        }
      }
      window.open(url);
      this.donwload_dialogVisible = false;
    },
    close_up_xls() {
      this.upload_dialogVisible = false;
    },
    upload_employee2xls() {
      if (this.$refs.excelForm.validate()) {
        this.$refs.uploadexcel.conFirm();
      }
    },
    uploadchange(status) {
      this.uploadReady = status;
    },
    uploadsuccess(e) {
      let me = this;
      setTimeout(() => {
        me.upload_dialogVisible = false;
        me.uploadReady = false;
      }, 1000);
    },
    onsubmit_remove(row) {
      removeEmployee(row.id).then(response => {
        this.$store.commit("RemoveEmployee", row.id);
      });
    },
    show_delete_one(data) {
      this.delete_one_data = {
        id: data.id
      };
      this.$nextTick(() => {
        this.delete_one_dialog = true;
      });
    },
    delete_one_confirm() {
      let del_copy = JSON.parse(JSON.stringify(this.delete_one_data));
      this.onsubmit_remove(del_copy);
      this.delete_one_data = {};
      this.delete_one_dialog = false;
    },
    delete_select_datas() {
      let me = this;
      let del_copys = JSON.parse(JSON.stringify(me.selectTable_datas));
      this.del_all_loading = true;
      for (let i = 0; i < del_copys.length; i++) {
        this.onsubmit_remove(del_copys[i]);
        if (i === del_copys.length - 1) {
          this.del_all_loading = false;
        }
      }
      this.$nextTick(() => {
        me.selectTable_datas = [];
        me.del_all_dialog = false;
      });
    },
    set_company(company) {
      if (!this.showEdit) {
        if (this.donwload_dialogVisible) {
          this.$set(this.download_param, "companyid", company.id);
          this.$set(this.download_param, "company_name", company.name);
          return;
        }
        if (this.upload_dialogVisible) {
          this.company_name_up = company.name;
          this.company_id_up = company.id;
          return;
        }
        this.company_name = company.name;
        this.searchData.companyid = company.id;
        // this.query_employees(1)
      } else {
        this.$set(this.employee, "company_name", company.name);
        this.$set(this.employee, "companyid", company.id);
      }
    },
    isdimission_formatter(cellValue) {
      if (cellValue === true) {
        return this.$t("dataManage.leaved");
      } else if (cellValue === false) {
        return this.$t("dataManage.in-service");
      } else {
        return "";
      }
    },
    sex_formatter(cellValue) {
      if (cellValue === 0) {
        return this.$t("dataManage.male");
      } else if (cellValue === 1) {
        return this.$t("dataManage.female");
      }
    }
  }
};
</script>
<style scoped></style>
