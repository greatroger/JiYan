<template>
  <div>
    <main_banner></main_banner>
    <el-container class="header_container">
      <div class="side_bar" style="position: fixed">
        <!-- <el-button id="button_1" icon="el-icon-house" type="warning" @click="toCourseInfo()">课程信息系统</el-button>  -->
        <!-- <el-button id="button_2" icon="el-icon-edit"  type="primary" @click="toComment()">论坛系统</el-button>  -->
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
        </el-menu>
      </div>
      <el-main class="header2">
        <div style="position: relative">
          <img src="../assets/background.jpg" class="background_img" alt="">
        </div>
        <div class="title">同济大学课程信息综合系统</div>
        <div class="sub-title">Faster · Easier · Smarter</div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import main_banner from './main_banner'
export default {
  name: 'header_',
  inject: ['reload'],
  data () {
    return {

    }
  },
  components: {
    main_banner
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
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key === '1') {
        this.toCourseInfo()
      } else if (key === '2') {
        this.toComment()
      }
    }
  }
}
</script>

<style lang="less">
  .header_container{
    .side_bar {
      left: 0px;
      top:65px;
    }
    .el-main{
      height: 180px;
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
        transform: scale(1.8, 0.98) translateY(-350px) translateX(165px);
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
  }

</style>
