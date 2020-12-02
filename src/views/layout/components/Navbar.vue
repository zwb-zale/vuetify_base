<template>
  <v-navigation-drawer
    permanent
    clipped
    app
    color="rgb(51, 58, 78)"
    dark
    :width="190"
  >
    <vuescroll :ops="ops">
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
    </vuescroll>


  </v-navigation-drawer>
</template>

<script>
import vuescroll from 'vuescroll';
import { mapGetters } from "vuex";
import ItemGroup from "@/components/base/ItemGroup";
import BaseItem from "@/components/base/Item";
export default {
  components: {
    ItemGroup,
    BaseItem,
    vuescroll
  },
  computed: {
    ...mapGetters(["permission_routers"])
  },
  data() {
    return {
      ops: {
        vuescroll: {
          wheelScrollDuration: 200,
          wheelDirectionReverse: false
        },
        rail: {//轨道
          background: '#c3c3c3',//轨道的背景色
          opacity: 0,
          size: '4px',
          gutterOfSide: '0px',//轨道距 x 和 y 轴两端的距离
        },
        bar: {
          showDelay: 500,//在鼠标离开容器后多长时间隐藏滚动条
          onlyShowBarOnScroll: false,//当页面滚动时显示
          background: 'rgb(144, 147, 153)',
          opacity: 1,
          size: '4px',
          keepShow:true
        }
      }
    };
  },
};
</script>

<style scoped>
div>>>.__view{
  min-height: 0 !important;
}
div>>>.__bar-wrap-is-vertical{
  border-radius: 0 !important;
}
</style>
