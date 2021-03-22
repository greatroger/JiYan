<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      @select="handleSelect">
      <el-menu-item index="1" >
        <i class="el-icon-house"></i>
        <span slot="title" >课程信息系统</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-edit"></i>
        <span slot="title">论坛系统</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-user"></i>
        <span slot="title">个人主页</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'side_bar_',
  data () {
    return {

    }
  },
  methods: {
    toCourseInfo: function () {
      this.$router.push({
        path: '/courseInfo'
      })
    },
    toComment: function () {
      this.$router.push({
        path: '/forum/main'
      })
    },
    toPersonPage(){
      this.$router.push({
        path: `/personInfo/${this.$store.state.user.userId}/1`
      })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key === '1') {
        this.toCourseInfo()
      } else if (key === '2') {
        this.toComment()
      } else if (key === '3') {
        this.toPersonPage()
      }
    }
  }
}
</script>

<style scoped>

</style>
