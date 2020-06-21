<template>
  <div>
    <div class="top_header">
      <img src="../../assets/tongji_badge.png" alt="" class="badge">
      <div class="user">
        <el-dropdown>
          <img src="../../assets/user.png" alt="" class="user">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>登录</el-dropdown-item>
            <el-dropdown-item>注册</el-dropdown-item>
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-input
      class="select_input"
      placeholder="请输入搜索内容"
      suffix-icon="el-icon-search"
      v-model="select_input"></el-input>
  </div>
</template>

<script>
    export default {
      name: "forum_header",
      data() {
          return {
            select_input: ''
          }
      }
    }
</script>

<style lang="less">
  .top_header {
    background-color: #ffffff;
    height: 100px;
    .badge {
      width: 220px;
      height: 50px;
      margin-top: 25px;
    }
    .user {
      width: 35px;
      height: 35px;
      float: right;
      margin-top: 17px;
      margin-right: 20px;
    }
    .user:hover{
      cursor: pointer;
    }
  }
  .select_input {
    position: absolute;
    top: 30px;
    left: 600px;
    width: 300px;
  }
</style>
