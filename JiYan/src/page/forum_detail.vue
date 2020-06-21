<template>
<div>
  <header_></header_>
  <div class="topic_main">
    <div class="topic_left">
      <el-row>
        <el-col :span="18">
          <el-row>
            <div class="topic_name">
              <span>{{ this.$store.state.topic_detail.topicName }}</span>
            </div>
          </el-row>
          <el-row>
            <div class="topic_detail">
              <span>{{ this.$store.state.topic_detail.description }}</span>
            </div>
          </el-row>
          <el-row>
            <div class="topic_icon">
              <el-button icon="el-icon-edit">写回答</el-button>
              <img src="../assets/discuss.png">
              <span>3条评论</span>
            </div>
          </el-row>
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>
    </div>
    <div class="topic_answer">
      <div class="topic_answer_left">

      </div>
      <div class="topic_answer_right">

      </div>
    </div>
  </div>
</div>
</template>

<script>
  import header_ from '../components/forum/forum_header';
    export default {
      name: "forum_detail",
      components: {
        header_
      },
      props: {
        topicId: {
          type: Number,
          default: 0
        }
      }
    }
</script>

<style lang="less">
  .topic_main{
    background-color: #e8e8e8;
    width: 100%;
    height: 1800px;
    .topic_left{
      width: 100%;
      height: 300px;
      background-color: white;
      position: relative;
      top: 10px;
      .el-row {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        .topic_name{
          /*background-color: #c08b10;*/
          margin-top: 30px;
          margin-left: 30px;
          span{
            font-size: 22px;
          }
        }
        .topic_detail{
          /*background-color: #2b3580;*/
          height: 120px;
          margin-top: 10px;
          margin-left: 30px;
          span{
            font-size: 16px;
            color: #4b4b4b;
            letter-spacing: 2px;
          }
        }
        .topic_icon{
          /*background-color: dodgerblue;*/
          height: 50px;
          margin-left: 30px;
          margin-top: 5px;
          img{
            margin-left: 100px;
            position: relative;
            top: 10px;
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    .topic_answer{
      width: 96%;
      height: 900px;
      margin-top: 20px;
      margin-left: 25px;
      .topic_answer_left{
        width: 73%;
        height: 600px;
        float: left;
        background-color: white;
      }
      .topic_answer_right{
        width: 26%;
        float: right;
        height: 100px;
        background-color: white;
      }
    }
  }

</style>
