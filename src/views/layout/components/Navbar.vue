<template>
  <v-navigation-drawer
    permanent
    clipped
    app
    color="rgb(51, 58, 78)"
    dark
    :width="190"
  >
    <el-scrollbar style="height: 100%">
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
    </el-scrollbar>

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
/*vuescroll样式*/
/*div>>>.__view{*/
/*  min-height: 0 !important;*/
/*}*/
/*div>>>.__bar-wrap-is-vertical{*/
/*  border-radius: 0 !important;*/
/*}*/
div>>>.el-scrollbar__wrap{
  overflow-x: hidden;
}
div>>>.is-horizontal{
  height: 0;
  display: none;
}
div>>>.el-scrollbar__bar.is-vertical{
  width: 4px;
}
div>>>.el-scrollbar__bar{
  right: 0;
  border-radius:0
}
div>>>.el-scrollbar__thumb{
  background-color: rgba(144,147,153,1);
}
</style>
