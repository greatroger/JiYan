<template>
<div>
  <header_></header_>
  <div class="topic_main">
    <div class="topic_left">
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="16" :offset="4">
            <div class="topic_name">
              <span>{{ this.$store.state.topic_detail.topicName }}</span>
            </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" :offset="4">
            <div class="topic_detail">
              <span>{{ this.$store.state.topic_detail.description }}</span>
            </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" :offset="4">
            <div class="topic_icon">
              <el-button icon="el-icon-edit">写回答</el-button>
              <img src="../assets/discuss.png">
              <span>{{this.answer_list.length}}条回答</span>
            </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>
    </div>
    <div class="topic_answer">
      <div class="topic_answer_left">
        <div class="answer_temp" v-for="(item, index) in answer_list" :key="index">
          <el-row class="user">
            <el-col :span="3">
<!--              <img src="../assets/default_user.png" alt="">-->
              <img src="https://whitealbum.oss-cn-beijing.aliyuncs.com/album/JW4ybY_@Angelea-アイ_(あなた)とわたし_00 (290).jpg">
            </el-col>
            <el-col :span="3">
              <span>匿名用户</span>
            </el-col>
          </el-row>
          <el-row class="user_answer">
            <div>
              <p>{{item.text}}</p>
            </div>
          </el-row>
          <el-row class="user_like">
            <img src="../assets/like.png" alt="">
            <span>{{ item.likes }}</span>
          </el-row>
        </div>
      </div>
      <div class="topic_answer_right">
        <el-row class="author">
          <span>关于作者</span>
        </el-row>
        <hr style="height:1px;border:none;border-top:1px dashed #7f7f7f;"/>
        <el-row class="user">
          <el-col :span="3">
            <img src="../assets/default_user.png" alt="">
          </el-col>
          <el-col :span="7">
            <span>管理员</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import header_ from '../components/main_header';
    export default {
      name: "forum_detail",
      components: {
        header_
      },
      data(){
        return {
          answer_list: []
        }
      },
      created: function(){
        console.log(this.$route.params.id);
        this.get_topic_answer();
      },
      methods:{
        get_topic_answer:function(){
          this.$axios({
            method: 'post',
            url: '/topicComment/all',
            headers:{},
            data:{
              topicId: this.$route.params.id,
              offset: 0,
              limit: 10
            }
          }).then((response) => {
            this.answer_list = response.data.result;
            console.log(response);
          }).catch((error) =>{
            alert(error);
          })
        }
      }
    }
</script>

<style lang="less" scoped>
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
          span{
            position: relative;
            margin-top: 10px;
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
        background-color: #e8e8e8;
        .answer_temp{
          height: 280px;
          /*background-color: #c08b10;*/
          background-color: white;
          margin-bottom: 20px;
          .user{
            margin-left: 30px;
            height: 60px;
            img{
              width: 50px;
              height: 50px;
              position: relative;
              top: 10px;
            }
            span{
              position: relative;
              top: 25px;
              font-weight: bold;
            }
          }
          .user_answer{
            height: 160px;
            width: 94%;
            margin: 0 auto;
          }
          .user_like{
            height: 50px;
            width: 94%;
            margin: 0 auto;
            img{
              width: 35px;
              height: 35px;
            }
            span{
              position: relative;
              top: -6px;
            }
          }
        }
      }
      .topic_answer_right{
        width: 26%;
        float: right;
        height: 150px;
        background-color: white;
        .author{
          width: 90%;
          margin: 0 auto;
          span{
            font-size: 18px;
            font-weight: bold;
          }
        }
        .user{
          img{
            width: 50px;
            height: 50px;
            position: relative;
            top: 10px;
            left: 20px;
          }
          span{
            position: relative;
            top: 25px;
            left: 40px;
            font-weight: bold;
          }
        }
      }
    }
  }

</style>
