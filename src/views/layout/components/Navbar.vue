<template>
  <v-navigation-drawer
     permanent
     clipped
     app
     color="rgba(51, 58, 78,0)"
  >
    <v-list expand>

      <template v-for="(item, i) in computedItem">
        <item-group
          :key="`group-${i}`"
          :item="item"
          :showall="item.alwaysShow"
        ></item-group>
      </template>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import ItemGroup from '@/components/base/ItemGroup'

export default {
  components: {
    ItemGroup
  },
  computed:{
    computedItem(){
      console.log(this.$router.options.routes)
      return this.$router.options.routes
    }
  },
  data(){
    return {
      computedItems:[
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          show:true,
          children:[
            {
              title: 'testPage',
              to: 'test-manage/testPage',
            }
          ]
        },
        {
          icon: 'mdi-account',
          title: 'user',
          children:[
            {
              title: 'testTwo',
              to: 'data-manage/testTwo',
            },
            {
              title: 'testThree',
              to: 'data-manage/testthree',
            }
          ],
        },
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
