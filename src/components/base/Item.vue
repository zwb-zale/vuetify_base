<template>
  <v-list-item
    :class="[haveson ? 'px-8' : 'px-3']"
    exact
    :to="`${base_path}/${item.path}`"
    color="#409eff"
  >
    <v-list-item-icon class="mr-4">
      <v-icon class="smallIcon" v-text="item.meta.icon" />
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title
        class="text-button"
        v-text="generateTitle(item.meta.title)"
      />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import Themeable from "vuetify/lib/mixins/themeable";
import { generateTitle } from "@/utils/i18n";
export default {
  name: "Item",

  mixins: [Themeable],

  props: {
    haveson: {
      type: Boolean,
      default: true
    },
    base_path: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default: () => ({
        icon: undefined,
        title: undefined,
        to: undefined
      })
    },
    text: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle
  }
};
</script>
