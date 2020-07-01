<template>
<div class="banner">
        <div style="position: relative">
          <img src="../assets/background.jpg" class="background_img" alt="">
        </div>
        <div class="title">同济大学课程信息综合系统</div>
        <div class="sub-title">Faster · Easier · Smarter</div>
</div>
</template>

<script>
export default {
    name:'banner_'
}
</script>


<style lang="less">
    .banner{
      height: 340px;
      width: 100%;
      overflow: hidden;
      .background_img {
        position: absolute;
        transform-origin: center;
        transform: scale(1.5, 0.98) translateY(-350px) translateX(170px);
        object-fit: cover;
        z-index:-1;
      }
      .title{
        margin-top: 30px;
        font-size: 42px;
        text-align: center;
        font-family: Weibei SC;
        color: #000044;
        letter-spacing: 10px;
      }
      .sub-title{
        text-align:center;
        color: grey;
        letter-spacing: 6px;
      }
    }
</style>