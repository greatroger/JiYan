<template>
  <div>
    <el-container class="header_container">
      <el-header style="height: 35px;">
        <el-dropdown @command="handleClick">
          <span><i class="el-icon-user"></i>{{ this.$store.state.user.name }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="login" v-if="!this.$store.state.user.name">登录</el-dropdown-item>
            <el-dropdown-item command="forum" v-if="this.$store.state.user.name">论坛</el-dropdown-item>
            <el-dropdown-item command="logout" v-if="this.$store.state.user.name">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="header2">
        <div style="position: relative">
          <img src="../assets/background.jpg" class="background_img" alt="">
        </div>
        <div class="title">同济大学课程信息综合系统</div>
        <div class="sub-title">Faster · Easier · Smarter</div>
        <div class="header__button">
          <el-button id="button_1" @click="toCourseInfo()">查看课程信息</el-button>
          <el-button id="button_2" @click="toComment()">教师评价</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'header_',
    inject: ['reload'],
    data() {
      return {

      }
    },
    methods: {
      toCourseInfo:function(){
        this.$router.push({
          path: '/courseInfo'
        })
      },
      toComment:function(){
        this.$router.push({
          path: '/comment'
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
        border-radius: 0;
        background: transparent;
        border: 2px solid #c08b10;
        width: 140px;
        opacity: 0.7;
        color: black;
      }
      #button_1:hover{
        background-color: #c08b10;
        opacity: 0.7;
      }
      #button_2{
        border-radius: 0;
        border: 2px solid #c08b10;
        background: transparent;
        float: right;
        color: black;
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
