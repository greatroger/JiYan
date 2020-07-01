<template>
<div>
    <el-container class="nev-container">
        <el-header :inline=true>
            <el-menu :default-active="$route.path" :collapse="isCollapse" :inline=true router overflow-y: scroll
            class="el-menu-demo" mode="horizontal" @select="handleSelect" >
              <el-menu-item index="#"><img src="../assets/tongji_badge.png" alt="" class="badge"></el-menu-item>
              <el-menu-item index="/">主页</el-menu-item>
              <el-menu-item index="/forum/main">论坛</el-menu-item>
              <el-submenu style="float:right">
                <!--TODO:这边要变成动态！！！！！-->
                <template slot="title"><img src="../assets/user.png" alt="" class="user"></template>
                <el-menu-item index="/personInfo/1">个人主页</el-menu-item>
                <el-menu-item index="">注销</el-menu-item>
                <!-- 如何去掉选中时候的下面的蓝色？-->
                <!--TODO:这边要变成动态！！！！-->
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
    methods: {

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
