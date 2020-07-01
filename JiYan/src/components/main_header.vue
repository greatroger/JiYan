<template>
<div>
    <el-container class="nev-container">
        <el-header :inline=true>
            <el-menu :default-active="$route.path" :collapse="isCollapse" :inline=true router:false overflow-y: scroll
            class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="#"><img src="../assets/tongji_badge.png" alt="" class="badge"></el-menu-item>
              <el-menu-item index="/courseInfo">主页</el-menu-item>
              <el-menu-item index="/forum/main">论坛</el-menu-item>
              <el-submenu style="float:right">
                <template slot="title"><img :src="this.$store.state.user.avatar" alt="" class="user"></template>
                <!--TODO:改成动态的-->
                <el-menu-item index="#personInfo" >个人主页</el-menu-item>
                <!--<el-menu-item v-bind:index="'/personInfo/'+this.$store.state.user.userId">个人主页</el-menu-item>-->
                <el-menu-item index="/">注销</el-menu-item>
                <!-- 如何去掉选中时候的下面的蓝色？-->
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
      console.log(key,keyPath);
      if (key=="/courseInfo")
      {
        this.$router.push({
            path: `/courseInfo`
          });
      }
      else if (key=="/forum/main")
      {
         this.$router.push({
            path: `/forum/main`
          });
      }
      else if (key=="/")
      {
          this.$router.push({
            path: `/`
          });
      }
      else if (key=="#personInfo"){
        this.$router.push({
            path: `/personInfo/${this.$store.state.user.userId}/${0}`
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
