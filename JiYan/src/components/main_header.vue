<template>
<div>
    <el-container class="nev-container">
        <el-header :inline=true>
            <el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect">
              <el-menu-item index="#"><img src="../assets/tongji_badge.png" alt="" class="badge"></el-menu-item>
              <el-menu-item index="/courseInfo">主页</el-menu-item>
              <el-menu-item index="/forum/main">论坛</el-menu-item>
              <el-submenu style="float:right" index="">
                <template slot="title"><img src='../assets/user.png' alt="" class="user"></template>
                <el-menu-item index="login" v-if="!this.$store.state.user.name">登录</el-menu-item>
                <el-menu-item index="#personInfo" v-if="this.$store.state.user.name">个人主页</el-menu-item>
                <el-menu-item index="/" v-if="this.$store.state.user.name">注销</el-menu-item>
              </el-submenu>
            </el-menu>
        </el-header>
    </el-container>
</div>
</template>

<script>
  export default {
    name: 'mainheader_',
    data() {
      return {

      }
    },
    methods:{
    handleSelect(key,keyPath){
      if (key ==="/courseInfo")
      {
        this.$router.push({
            path: `/courseInfo`
          });
      }
      else if (key ==="/forum/main")
      {
         this.$router.push({
            path: `/forum/main`
          });
      }
      else if (key ==="/")
      {
        this.$store.state.user = {};
        alert("退出成功");
          this.$router.push({
            path: `/`
          });
      }
      else if (key ==="#personInfo"){
        this.$router.push({
            path: `/personInfo/${this.$store.state.user.userId}/${0}`
          })
      }else if(key === 'login'){
        this.$router.push({
          path: `/`
        })
      }
    }
    }
    }

</script>

<style lang="less">
    .nev-container{
      .badge{
        width: 200px;
        height: 40px;
      }

      .user {
        width: 35px;
        height: 35px;
        float: right;
        margin-top: 17px;
        margin-right: 20px;
      }
      .el-menu{
        border-radius:4px;
      }
    }
</style>
