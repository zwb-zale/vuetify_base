<template>
  <v-list-item
    exact
    :to="`${base_path}/${item.path}`"
    color="indigo"
  >
    <v-list-item-icon v-if="text"
      class="v-list-item__icon--text"
    />

    <v-list-item-icon v-else>
      <v-icon v-text="item.meta.icon" />
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title v-text="item.meta.title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'Item',

    mixins: [Themeable],

    props: {
      base_path: {
        type: String,
        default: '',
      },
      item: {
        type: Object,
        default: () => ({
          icon: undefined,
          title: undefined,
          to: undefined,
        }),
      },
      text: {
        type: Boolean,
        default: false,
      },
    },
    mounted() {
      console.log(this.base_path)
    }
  }
</script>
