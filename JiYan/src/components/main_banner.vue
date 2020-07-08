<template>
<div>
  <el-container class="header_container">
    <el-header style="height: 35px;">
      <el-dropdown @command="handleClick">
        <span><i class="el-icon-user"></i>{{ this.$store.state.user.name }}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="login" v-if="!this.$store.state.user.name">登录</el-dropdown-item>
          <el-dropdown-item command="user" v-if="this.$store.state.user.name">个人信息</el-dropdown-item>
          <el-dropdown-item command="forum" v-if="this.$store.state.user.name">论坛</el-dropdown-item>
          <el-dropdown-item command="main" v-if="this.$store.state.user.name">主页</el-dropdown-item>
          <el-dropdown-item command="logout" v-if="this.$store.state.user.name">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </el-container>
</div>
</template>

<script>
export default {
    name:'banner_',

  methods: {
    handleClick: function(command){
      console.log(command);
      if(command === 'logout'){
        this.$store.state.user = {};
        this.$cookies.remove(this.$store.state.user.userId);
        this.$axios({
          method: 'post',
          url: '/logout'
        }).then(() => {
          alert("退出成功！");
          this.$router.push({
            path: '/'
          })
        }).catch(() => {
          alert("接口错误，请重试！");
        });
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
      }else if(command === 'user'){
        this.$router.push({
          path: `/personInfo/${this.$store.state.user.userId}/1`
        })
      }

    }
  }
}
</script>


<style lang="less" scoped>
  .header_container {
    .el-header {
      height: 35px;
      background-color: #2b3580;

      .el-dropdown {
        display: inline;
        float: right;

        span {
          padding-top: 7px;
          color: white;
          float: right;
        }

        span:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
