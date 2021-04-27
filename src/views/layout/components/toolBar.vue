<template>
  <v-toolbar absolute dense height="32" width="100%" :elevation="2">

    <v-menu
        v-model="showMenu"
        :position-x="menuX"
        :position-y="menuY"
        absolute
        offset-y
        @contextmenu.prevent.native=""
    >
      <v-list dense class="py-0 flex-column">
        <div v-for="(item, index) in menus">
          <v-btn
              block
              :elevation="0"
              @contextmenu.prevent.native="actionMenu(item.type)"
              @click="actionMenu(item.type)"
              tile
              class="justify-start pl-1 pr-2 text-caption"
          >
            <v-icon small left class="ml-1">
              {{ item.icon }}
            </v-icon>
            {{ item.title }}
          </v-btn>
        </div>
      </v-list>
    </v-menu>
    <div ref="scrollContainer" class="scroll-list">
      <v-btn
          @contextmenu.prevent.native="openMenu($event,tag)"
          @click="
          goTag({ path: tag.path, query: tag.query, fullPath: tag.fullPath })
        "
          :height="26"
          :color="isActive(tag) ? 'success' : '#ffffff'"
          v-for="(tag, index) in visitedViews"
          depressed
          small
          class="mr-2 px-1"
          style="border: 1px solid #d8dce5;"
          :key="index"
          :ref="tag.name"
      >
        <v-icon size="12">
          {{ tag.meta.icon }}
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
import {generateTitle} from "@/utils/i18n";

export default {
  name: "toolBar",
  data() {
    return {
      showMenu: false,
      menuX: 0,
      menuY: 0,
      menus: [
          {type: 0, title: '刷新', icon: 'cached'},
        {type: 1, title: '关闭', icon: 'close'},
        {type: 2, title: '关闭其它', icon: 'not_interested'}
      ],
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
      this.$nextTick(() => {
        this.moveToTarget(this.$refs[this.$route.name][0].$el)
      })

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
    actionMenu(type) {
      let view = this.selectedTag
      let checkThisrout=view.name===this.$route.name
      if (type === 1) {
        if (this.visitedViews.length === 1) {
          window.location.reload()
          return false
        } else {
          this.$store.dispatch('delView', view).then(({visitedViews}) => {
            if (this.isActive(view)) {
              const latestView = visitedViews.slice(-1)[0]
              if (latestView) {
                this.$router.push(latestView)
              } else {
                this.$router.push('/')
              }
            }
          })
        }
      } else if (type === 2) {
        if(!checkThisrout){
          this.$router.push(view)
        }
        this.$store.dispatch('delOthersViews', view)
      }
      this.showMenu=false
    },
    openMenu(e, tag) {
      e.preventDefault()
      this.selectedTag = tag
      this.showMenu = false
      this.menuX = e.clientX
      this.menuY = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    moveToTarget(currentTag) {
      currentTag.scrollIntoView({
        behavior: "smooth",  // 平滑过渡
      });
    },
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
      const {name} = this.$route;
      if (name) {
        this.$store.dispatch("addView", this.$route);
      }
      return false;
    },
    closeSelectedTag(view) {
      if (this.visitedViews.length === 1) {
        window.location.reload()
        return false;
      } else {
        this.$store.dispatch("delView", view).then(({visitedViews}) => {
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
  width: 100%;
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
