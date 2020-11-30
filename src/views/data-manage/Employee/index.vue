<template>
  <div class="appBox">
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
          <v-btn color="error darken-1" text @click="delete_select_datas">
            确定
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="del_all_dialog = false">
            取消
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
          <v-btn color="error darken-1" text @click="delete_one_confirm">
            确定
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="delete_one_dialog = false">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    工具栏-->
    <div class="py-0 mx-2 mb-1 d-flex align-center">
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
      <template v-slot:item.operate="{ item }">
        <v-btn
          v-permission:edit
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
            mdi-pencil
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
          :formDatas="employee"
          @updateForm="updateForm"
          @updateIMG="updateIMG"
          @showCompany="com_tree_dialog = true"
          @back="goback"
        ></edit-emp>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  removeEmployee
} from "@/api/employee.js";
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
      upload_dialogVisible: false,
      uploadReady: false,
      company_name_up: "",
      company_id_up: "",
      showEdit: false,
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
      delete_one_data: {}
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
    }
  },
  computed: {
    ...mapState({
      employees: state => state.employee.employees,
      windowInnerHeight: state => state.app.windowInnerHeight
    }),
    tableHeader(){
      let basehead=[
        { text: "工种", value: "pe", align: "center" },
        { text: "姓名", value: "name", align: "center" },
        { text: "代码", value: "code", align: "center" },
        { text: "性别", value: "sex", align: "center" },
        { text: "公司名字", value: "company_name", align: "center" },
        { text: "是否离职", value: "isdimission", align: "center" },
        { text: "身份证号", value: "identityno", align: "center" }
      ]
      let pmt=this.$route.meta.permissions[0]
      let ops=this.$store.getters.permissions[pmt].ops
      if(ops.indexOf('edit')>-1||ops.indexOf('delete')>-1){
        basehead.push({text: "操作", value: "operate", align: "center", width: 100})
      }
      return basehead
    },
    exp_upload_data() {
      if (this.company_id_up) {
        return {
          mapfields: [
            "ignore",
            "name",
            "sex",
            "identityno",
            "mobtelphone",
            "pe",
            "work_group",
            "work_area"
          ],
          companyid: this.company_id_up
        };
      } else {
        return {
          mapfields: [
            "ignore",
            "name",
            "sex",
            "identityno",
            "mobtelphone",
            "pe",
            "work_group",
            "work_area"
          ]
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
    updateForm(data) {
      this.employee = data;
      this.$forceUpdate();
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
<style scoped>

</style>
