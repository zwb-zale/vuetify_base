<template>
  <transition name="message-fade">
    <div class="message" :class="typeClass" role="alert" v-show="visible">
      <p class="message__content">
        <v-icon style="margin-right: 8px;" color="#ffffff">{{ icon }}</v-icon>
        &nbsp;{{ message }}
      </p>
    </div>
  </transition>
</template>

<script>
import "vuetify/dist/vuetify.min.css";
export default {
  name: "message",

  data() {
    return {
      visible: false,
      duration: 2000,
      message: "",
      timer: null,
      closed: false,
      color: "",
      icon: "",
      typeClass: ""
    };
  },

  watch: {
    closed(val) {
      if (val) {
        this.visible = false;
        this.$el.addEventListener("transitionend", this.destroyElement);
      }
    }
  },

  methods: {
    destroyElement() {
      this.$el.removeEventListener("transitionend", this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },

    close() {
      this.closed = true;
    }
  },

  mounted() {
    // 开始定时器
    this.startTimer();
  }
};
</script>

<style scoped>
.message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 8px;
  /*border-width: 1px;*/
  /*border-style: solid;*/
  /* border-color: #ebeef5; */
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  /* background-color: #edf2fc; */
  transition: opacity 0.3s, transform 0.4s;
  overflow: hidden;
  padding: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}

.message--success {
  background-color: #4caf50;
  /*border-color: #e1f3d8;*/
  color: #ffffff;
}

.message--error {
  background-color: #ff5252;
  /*border-color: #FFCCFF;*/
  color: #ffffff;
}
.message--alert {
  background-color: #fb8c00;
  color: #ffffff;
}
.message p {
  margin: 0;
}

.message__content {
  padding: 0;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
}

.message-fade-enter,
.message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
