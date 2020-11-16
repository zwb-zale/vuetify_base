<template>
  <v-list-group
    :value="showall"
    :prepend-icon="item.meta.icon"
    append-icon="mdi-menu-down"
    color="indigo"
  >
    <template v-slot:activator>

      <v-list-item-content>
        <v-list-item-title v-text="item.meta.title" />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in item.children">

      <base-item
        :base_path="item.path"
        :key="`item-${i}`"
        :item="child"
        text
      />
    </template>
  </v-list-group>
</template>

<script>
import BaseItem from '@/components/base/Item'
  export default {
    name: 'ItemGroup',
    components: {
    BaseItem
  },

    props: {
      showall:{
        type:Boolean,
        default:false
      },
      item: {
        type: Object,
      },
    },

    computed: {

    },

    methods: {

    },
  }
</script>

<style>

</style>
