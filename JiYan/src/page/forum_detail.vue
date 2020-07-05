<template>
<div>
  <header_></header_>
  <div class="topic_main">
    <div class="topic_left">
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="16">
            <div class="topic_name">
              <span>{{ this.$store.state.topic_detail.topicName }}</span>
            </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
            <div class="topic_detail">
              <span>{{ this.$store.state.topic_detail.description }}</span>
            </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
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
              <img :src="item.url" alt="">
            </el-col>
            <el-col :span="3">
              <span>{{ item.ip }}</span>
            </el-col>
          </el-row>
          <el-row class="user_answer">
            <div>
              <p>{{item.text}}</p>
            </div>
          </el-row>
          <el-row class="user_like">
            <img src="../assets/like.png" alt="" @click="addLike(item.commentId, index)">
            <span :class="{'has_clicked':item.clicked}">{{ item.likes }}</span>
            <span class="time_">{{ item.created }}</span>
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
            <img :src="topic_author.avatar" alt="">
          </el-col>
          <el-col :span="7" :offset="2">
            <span>{{ topic_author.nickname }}</span>
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
          answer_list: [],
          add_like_result: [],
          topic_author: []
        }
      },
      created: function(){
        console.log(this.$store.state.user);
        this.get_topic_answer();
        this.get_topic_author();
        this.get_user_likes();
      },
      mounted: function(){

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
            for(let i = 0; i < this.answer_list.length; i++){
              this.answer_list[i].created = this.convert_timestamp(this.answer_list[i].created);
              this.answer_list[i].clicked = false;
            }
            console.log(response);
          }).catch((error) =>{
            alert(error);
          })
        },

        get_topic_author:function(){
          this.$axios({
            method: 'get',
            url: `/user/selectOne?userId=${this.$route.params.ownerId}`
          }).then((response) => {
            console.log(response);
            this.topic_author = response.data;
          })
        },

        get_user_likes:function(){
          this.$axios({
            method: 'get',
            url: '/like/all'
          }).then((response) => {
            console.log(response);
          }).catch(() => {
            alert("获取用户点赞详情错误");
          })
        },

        convert_timestamp: function(timestamp) {
          let date = new Date(timestamp * 1000);
          let year = date.getFullYear() + '-';
          let month = (date.getMonth() + 1 > 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          let day = date.getDate() + '-';
          let hour = date.getHours() + ':';
          let minutes = date.getMinutes() + ':';
          let seconds = date.getSeconds();
          return year + month + day + hour + minutes + seconds;
        },

        addLike(comment_id, index){
          if(this.answer_list[index].clicked === false){
            this.$axios({
              method: 'post',
              url: 'http://180.76.234.230:8080/like',
              data: {
                commentId: comment_id
              }
            }).then((response) => {
              let liked = {};
              liked.index = index;
              liked.likeId = response.data.likeId;
              this.add_like_result.push(liked);
              this.answer_list[index].clicked = true;
              this.answer_list[index].likes++;
            }).catch(()=> {
              alert("点赞接口异常，请重试")
            })
          }
          if(this.answer_list[index].clicked === true){
            for(let i = 0; i < this.add_like_result.length; i++){
              console.log(index);
              if(index === this.add_like_result[i].index){
                this.$axios({
                  method: 'delete',
                  url: `http://180.76.234.230:8080/like?likeId=${this.add_like_result[i].likeId}`,
                  headers:{
                    'Content-Type': 'text'
                  }
                }).then(() => {
                  this.answer_list[index].likes--;
                  this.answer_list[index].clicked = false;
                }).catch(() => {
                  // alert("取消点赞接口异常，请重试")
                })
              }
            }

          }
        }
      }
    }
</script>

<style lang="less" scoped>
  .topic_main{
    background-color: #afcae887;
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
          margin-top: 30px;
          margin-left: 30px;
          span{
            font-size: 22px;
          }
        }
        .topic_detail{
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
        /*background-color: #afcae887;*/
        .answer_temp{
          height: 280px;
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
            img:hover{
              cursor: pointer;
            }
            span{
              position: relative;
              top: -6px;
            }
            .has_clicked{
              color: #cc0000;
              font-weight: bolder;
              font-size: 18px;
            }
            .time_{
              float: right;
              top: 10px;
              color: #b4b4b4;
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
