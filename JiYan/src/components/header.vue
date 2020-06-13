<template>
  <div>
    <el-container class="header_container">
      <el-header style="height: 35px;">

      </el-header>
      <el-main class="header2">
        <div style="position: relative">
          <img src="../assets/background.jpg" class="background_img" alt="">
        </div>
        <div class="title">同济大学课程信息综合系统</div>
        <div class="sub-title">Faster · Easier · Smarter</div>
        <div class="header__button">
          <el-button plain="true" id="button_1">查看课程信息</el-button>
          <el-button plain="true" id="button_2">教师评价</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'header_',
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="less">
  .header_container{
    .el-header {
      height:35px;
      background-color: #2b3580;
    }
    .el-main{
      height: 340px;
      width: 100%;
      overflow: hidden;
      /*background-image: url("../assets/background.jpg");*/
      /*background-position: center ;*/
      /*background-clip: padding-box;*/
      /*background-size: cover;*/
      /*background-attachment: fixed;*/
      .background_img {
        position: absolute;
        transform-origin: center;
        transform: scale(1.5, 0.98) translateY(-330px) translateX(140px);
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
      .header__button{
        width: 40%;
        margin: 100px auto;
      }
      #button_1{
        border-radius: 0;
        border: 2px solid #c08b10;
        width: 140px;
      }
      #button_1:hover{
        background-color: #c08b10;
        color: black;
        opacity: 0.7;
      }
      #button_2{
        border-radius: 0;
        border: 2px solid #c08b10;
        float: right;
        width: 140px;
      }
      #button_2:hover{
        background-color: #c08b10;
        color: black;
        opacity: 0.7;
      }
    }
  }

</style>
