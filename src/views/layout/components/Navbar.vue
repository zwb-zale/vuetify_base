<template>
  <v-navigation-drawer
    permanent
    clipped
    app
    color="rgb(51, 58, 78)"
    dark
    :width="190"
  >
    <v-list expand>
      <template v-for="(item, i) in permission_routers">
        <item-group
          v-if="item.children && !item.haveson"
          :key="`group-${i}`"
          :item="item"
        ></item-group>
        <base-item
          v-else
          :haveson="false"
          :key="`item-${i}`"
          :item="item.children[0]"
        ></base-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import ItemGroup from "@/components/base/ItemGroup";
import BaseItem from "@/components/base/Item";
export default {
  components: {
    ItemGroup,
    BaseItem
  },
  computed: {
    ...mapGetters(["permission_routers"])
  },
  data() {
    return {
      computedItems: [
        {
          icon: "mdi-view-dashboard",
          title: "dashboard",
          show: true,
          children: [
            {
              title: "testPage",
              to: "test-manage/testPage"
            }
          ]
        },
        {
          icon: "mdi-account",
          title: "user",
          children: [
            {
              title: "testTwo",
              to: "data-manage/testTwo"
            },
            {
              title: "testThree",
              to: "data-manage/testthree"
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped></style>
