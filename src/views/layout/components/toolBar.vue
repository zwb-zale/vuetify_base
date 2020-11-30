<template>
  <v-toolbar absolute dense height="32" width="100%" :elevation="2">
    <div ref="scrollContainer" class="scroll-list">
      <v-btn
        @click="
          goTag({ path: tag.path, query: tag.query, fullPath: tag.fullPath })
        "
        :height="26"
        :max-width="110"
        :color="isActive(tag) ? 'success' : '#ffffff'"
        v-for="(tag, index) in visitedViews"
        depressed
        small
        class="mr-2 px-1"
        style="border: 1px solid #d8dce5;"
        :key="index"
      >
        <v-icon size="12">
          radio_button_checked
        </v-icon>
        <div class="smalltxt font-weight-light pl-2">
          {{ generateTitle(tag.title) }}
        </div>
        <v-btn
          @click.stop="closeSelectedTag(tag)"
          :elevation="1"
          fab
          color="#ffffff"
          class="ml-1"
          :height="15"
          :width="15"
        >
          <v-icon size="12">
            close
          </v-icon>
        </v-btn>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { generateTitle } from "@/utils/i18n";
export default {
  name: "toolBar",
  data() {
    return {
      // visible: false,
      // top: 0,
      // left: 0,
      selectedTag: {}
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    }
  },
  watch: {
    $route() {
      this.addViewTags();
      // this.moveToCurrentTag()
    }
    // visible(value) {
    //   if (value) {
    //     document.body.addEventListener('click', this.closeMenu)
    //   } else {
    //     document.body.removeEventListener('click', this.closeMenu)
    //   }
    // }
  },
  mounted() {
    let hengxianggundong = this.$refs.scrollContainer;
    hengxianggundong.addEventListener("mousewheel", this.handleScroll, false);
    this.addViewTags();
  },
  methods: {
    generateTitle,
    handleScroll(event) {
      let detail = event.wheelDelta || event.detail;
      let moveForwardStep = -1;
      let moveBackStep = 1;
      let step = 0;
      step = detail > 0 ? moveForwardStep * 100 : moveBackStep * 100;
      this.$refs.scrollContainer.scrollLeft =
        this.$refs.scrollContainer.scrollLeft + step;
    },
    goTag(tag) {
      this.$router.push(tag);
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    addViewTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("addView", this.$route);
      }
      return false;
    },
    closeSelectedTag(view) {
      if (this.visitedViews.length === 1) {
        return false;
      } else {
        this.$store.dispatch("delView", view).then(({ visitedViews }) => {
          if (visitedViews.length === 0) {
            return false;
          }
          if (this.isActive(view)) {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
              this.$router.push(latestView);
            } else {
              this.$router.push("/");
            }
          }
        });
      }
    }
    // closeOthersTags() {
    //   this.$router.push(this.selectedTag)
    //   this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
    //     this.moveToCurrentTag()
    //   })
    // },
    // closeAllTags() {
    //   this.$store.dispatch('delAllViews')
    //   this.$router.push('/')
    // },
    // closeMenu() {
    //   this.visible = false
    // }
  }
};
</script>

<style scoped>
.scroll-list {
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  overflow-y: hidden;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}
.scroll-list::-webkit-scrollbar {
  display: none;
}
</style>
