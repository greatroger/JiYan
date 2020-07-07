<template>
  <div>
    <main_banner></main_banner>
    <el-container class="header_container">
      <el-main class="header2">
        <div style="position: relative">
          <img src="../assets/background.jpg" class="background_img" alt="">
        </div>
        <div class="title">同济大学课程信息综合系统</div>
        <div class="sub-title">Faster · Easier · Smarter</div>
        <div class="header__button">
          <el-button id="button_1" icon="el-icon-house" type="warning" @click="toCourseInfo()">课程信息系统</el-button>
          <el-button id="button_2" type="primary" icon="el-icon-edit" @click="toComment()">论坛系统</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import main_banner from './main_banner'
  export default {
    name: 'header_',
    inject: ['reload'],
    data() {
      return {

      }
    },
    components: {
      main_banner
    },
    methods: {
      toCourseInfo:function(){
        this.$router.push({
          path: '/courseInfo'
        })
      },
      toComment:function(){
        this.$router.push({
          path: '/forum/main'
        })
      },
      handleClick: function(command){
        console.log(command);
        if(command === 'logout'){
          this.$store.state.user = {};
          this.reload();
          alert("退出成功！");
        }else if(command === 'login'){
          this.$router.push({
            path: '/'
          })
        }else if(command === 'forum'){
          this.$router.push({
            path: '/forum/main'
          })
        }else if(command === 'main'){
          this.$router.push({
            path: '/courseInfo'
          })
        }

      }
    }
  }
</script>

<style lang="less">
  .header_container{
    .el-header {
      height:35px;
      background-color: #2b3580;
      .el-dropdown{
        display: inline;
        float: right;
        span {
          padding-top: 7px;
          color: white;
          float: right;
        }
        span:hover{
          cursor: pointer;
        }
      }
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
        transform: scale(1.5, 0.98) translateY(-350px) translateX(140px);
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
        width: 140px;
        opacity: 0.7;
      }
      #button_1:hover{
        opacity: 0.7;
      }
      #button_2{
        float: right;
        width: 140px;
        opacity: 0.7;
      }
      #button_2:hover{
        background-color: #c08b10;
        opacity: 0.7;
      }
    }
  }

</style>
