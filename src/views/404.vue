<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img
          class="pic-404__parent"
          src="@/assets/404_images/404.png"
          alt="404"
        />
        <img
          class="pic-404__child left"
          src="@/assets/404_images/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child mid"
          src="@/assets/404_images/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child right"
          src="@/assets/404_images/404_cloud.png"
          alt="404"
        />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline">
          THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST!
        </div>
        <a href="" class="bullshit__return-home">HOME PAGE</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404"
};
</script>

<!--<style lang="scss" scoped>-->
