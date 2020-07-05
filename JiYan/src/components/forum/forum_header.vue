<template>
  <div class="top_header">
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
      inject: ['reload'],
      data() {
          return {
            select_input: ''
          }
      },
      methods: {
      }
    }
</script>

<style lang="less">
  .top_header {
    background-color: #afcae887;
    height: 60px;
  }
  .select_input {
    position: absolute;
    top: 80px;
    left: 550px;
    width: 300px;
  }
</style>
