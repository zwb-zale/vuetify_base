<template>
  <div class="appBox">
    <div style="width: 100%;height: 100%;display: flex">
<!--      PYTHONUNBUFFERED=1;IS_DEVELOPMENT=True;sql=mssql+pymssql://sa:111@192.168.101.238:1433/gxtest-->
      <video width="50%" height="100%" autoplay="true" muted="muted" controls>
        <source src="http://localhost:8888/media-contentmng/v1.0/media_file?id=8">
      </video>
    </div>

  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2
      },
      decoder: null,
      src: '',
      player: null,
      videoOptions: {
                autoplay: 'muted',//自动播放
                controls: true,//用户可以与之交互的控件
                loop:true,//视频一结束就重新开始
                muted:false,//默认情况下将使所有音频静音
                aspectRatio:"16:9",//显示比率
                fullscreen:{
                    options: {navigationUI: 'hide'}
                },
                sources: [
                    {
                        src: 'http://localhost:8888/media-contentmng/v1.0/media_file?id=8',
                        type: "video/mp4"
                    }
                ]
            }
    }
  },
  mounted() {
      // this.player = this.$video(this.$refs.videoPlayer, this.videoOptions, function onPlayerReady() {
      //       console.log('onPlayerReady', this);
      //   })
    }
};
</script>

<style scoped>
div >>> .active-ring-name {
  color: #000 !important;
  font-size: 0.75rem !important;
  font-weight: bold;
}

div >>> .v-stepper {
  box-shadow: none;
}
</style>
