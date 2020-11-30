<template>
  <v-list-group v-model="showSon" color="#ffffff">
    <template v-slot:activator>
      <v-list-item>
        <v-list-item-icon class="mr-4">
          <v-icon class="smallIcon" v-text="item.meta.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            class="text-button"
            style="color: #ffffff"
            v-text="generateTitle(item.meta.title)"
          />
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-for="(child, i) in item.children">
      <base-item :base_path="item.path" :key="`item-${i}`" :item="child" text />
    </template>
  </v-list-group>
</template>

<script>
import { generateTitle } from "@/utils/i18n";
import BaseItem from "@/components/base/Item";
export default {
  name: "ItemGroup",
  components: {
    BaseItem
  },
  data() {
    return {
      showSon: false
    };
  },

  props: {
    showall: {
      //废弃
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({
        meta: {},
        path: "",
        children: []
      })
    }
  },
  watch: {
    $route() {
      let inClud = this.item.children.some(item => {
        if (item.name === this.$route.name) {
          return true;
        }
      });
      if (inClud) {
        this.showSon = inClud;
      }
    }
  },

  methods: {
    generateTitle
  }
};
</script>

<style scoped>
div >>> .v-list-item {
  padding: 0 6px;
}
</style>
