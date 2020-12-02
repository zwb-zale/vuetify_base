<template>
  <v-dialog
    :value="visible"
    @click:outside="close_dialog"
    width="350"
    scrollable
  >
    <v-card
      flat
      class="mx-auto"
      width="500"
      height="70vh"
      :loader-height="3"
      :loading="loading"
    >
      <v-sheet color="#87CEFA" class="pa-4 lighten-2">
        <v-text-field
          v-model="filterText"
          label="搜索公司"
          dense
          dark
          flat
          solo-inverted
          hide-details
          clearable
        ></v-text-field>
      </v-sheet>
      <v-card-text class="px-3">
        <v-treeview
          v-if="show_tree"
          transition
          return-object
          item-children="companys"
          dense
          activatable
          :open-all="showAll&&show_tree"
          :items="companys_node"
          :search="filterText"
          :filter="filter"
          @update:active="handleNodeClick"
        >
          <template v-slot:label="{ item }">
            <div
              @dblclick.stop="selected(item)"
              class="noselect d-flex align-center"
              style="height: 40px"
            >
              {{ item.name }}
            </div>
          </template>
        </v-treeview>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small depressed @click="close_dialog">
          取消
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn small depressed color="primary" @click="set_company">
          确认
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getCompanyTree } from "@/api/company-tree.js";

export default {
  name: "index",
  props: {
    showAll: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show_tree: false,
      loading: false,
      filterText: null,
      companys_node: [],
      checked_company: ""
    };
  },
  computed: {
    filter() {
      (item, search, textKey) => item[textKey].indexOf(search) > -1;
    }
  },
  watch: {
    filterText(newValue) {
      this.show_tree = false;
      this.$nextTick(() => {
        this.show_tree = true;
      });
    },
    visible(newValue) {
      this.loading = true;
      if (newValue === true) {
        getCompanyTree()
          .then(response => {
            this.companys_node = response.data;
            this.loading = false;
            this.$nextTick(() => {
              this.show_tree = true;
            });
          })
          .catch(err => {
            this.loading = false;
          });
      } else {
        this.filterText = "";
        this.show_tree = false;
      }
    }
  },
  methods: {
    close_dialog() {
      this.$emit("close_dialog");
    },
    handleNodeClick(node) {
      if (node.length > 0) {
        this.checked_company = node[0];
      }
    },
    selected(node) {
      this.checked_company = node;
      this.set_company();
    },
    set_company() {
      this.$emit("set_company", this.checked_company);
      this.close_dialog();
    }
  }
};
</script>

<style scoped>
div >>> .v-treeview-node {
  cursor: pointer;
}
</style>
