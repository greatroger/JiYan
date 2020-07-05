<template>
  <div>
    <header_></header_>
    <forum_header></forum_header>
    <div class="main">
      <div class="main_left">
        <el-container class="main_left_title">
          <span>话题</span>
        </el-container>
        <el-container class="main_left_topic" v-for="(item,index) in topic_list" :key="index">
          <el-col :span="3">
            <span class="span_num">{{ index }}</span>
          </el-col>
          <el-col :span="3" class="span_2">
            <span class="span_name" :class="zero_style[index]" @click="toTopic(item.topicId)">{{ item.topicName  }}</span>
            <br/>
            <span class="span_des">{{ item.description }}</span>
            <br/>
            <span class="span_time">{{ item.created }}</span>
          </el-col>
          <el-col :span="5" class="img_3">
          </el-col>
        </el-container>
      </div>
      <div class="main_right">
        <div class="main_right_1">
          <div class="main_right_1_img" @click="dialogTableVisible = true">
            <img src="../assets/write.png" alt="">
            <br/>
            <span>写问题</span>
          </div>
          <el-dialog title="创建新话题" :visible.sync="dialogTableVisible">
            <el-form :model="form">
              <el-form-item label="标题名称" :label-width="formLabelWidth">
                <el-input v-model="form.titleName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="详细描述" :label-width="formLabelWidth" >
                <el-input v-model="form.description" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="toEditor()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="main_right_2">
          <el-row>
            <!-- <el-col :span="24" class="row_1">
              <span><i class="el-icon-tickets"></i>&nbsp;&nbsp;&nbsp;我的问题</span>
              <span style="float: right;"></span> -->
            <el-col :span="24" class="row_1" >
              <span @click="toMyTopic"><i class="el-icon-tickets"></i>&nbsp;&nbsp;&nbsp;我的问题</span>
              <span style="float: right;">{{count_topic}}</span>
            </el-col>
          </el-row>
          <br/><br/>
          <el-row>
            <el-col :span="24" class="row_2" >
              <span @click="toMyAnswer" ><i class="el-icon-edit"></i>&nbsp;&nbsp;&nbsp;我的回答</span>
              <span style="float:right;">{{count_review}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import header_ from '../components/forum/forum_header'
  // import mainheader_ from '../components/main_header'
  import axios from 'axios'
  import header_ from '../components/main_header'
  import forum_header from '../components/forum/forum_header'
    export default {
      name: "forum_main",
      components: {
        header_,
        forum_header
      },
      data(){
        return {
          topic_list: [],
          zero_style: [
            "zero",
          ],
          count_topic:0,
          count_review:0,
          dialogTableVisible: false,
          formLabelWidth: '120px',
          form: {
            titleName: '',
            description:''
          },
          
        }
      },
      
      created: function(){
        this.get_topic_all();
        this.setQuesNum();
        this.setReviewNum();
      },
      methods: {
        get_topic_all: function() {
          this.$axios({
            method: 'get',
            url: '/topic',
            params: {
              offset: 0,
              limit: 10
            }
          }).then((response) => {
            this.topic_list = response.data.result;
            for(let i = 0; i < this.topic_list.length; i++) {
              this.topic_list[i].created = this.convert_timestamp(this.topic_list[i].created);
            }
          }).catch(() => {
            alert("接口异常");
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
        toTopic:function(topicId) {
          for(let i = 0; i < this.topic_list.length; i++){
            if(topicId === this.topic_list[i].topicId){
              this.$store.state.topic_detail = this.topic_list[i];
            }
          }
          this.$router.push({
            path: `/forum/detail/${topicId}`
          })
        },
        toEditor:function(){
          // this.$router.push({
          //   path: `/editor`
          // })
          this.dialogFormVisible = false;
          axios({
            method: 'post',
            url: 'http://180.76.234.230:8080/topic',
            withCredentials: true,
            data: { topicName: this.form.titleName, description: this.form.description }
          }).then((response) => {
            console.log(response);
          });
          
        },
        setQuesNum:function(){
          this.count_topic=this.$store.state.topic_detail.count;
        },
        setReviewNum:function(){
          this.count_review=this.$store.state.review_detail.length;
        },
        toMyTopic(){
          console.log("userId  "+this.$store.state.user.userId);
          this.$router.push({
            path: `/personInfo/${this.$store.state.user.userId}/${"1"}`
          });

        },
        toMyAnswer(){
           console.log("userId  "+this.$store.state.user.userId);
          this.$router.push({
            path: `/personInfo/${this.$store.state.user.userId}/${"0"}`
          });

        }
      }
    }
</script>

<style lang="less" scoped>
  .main{
    background-color: #afcae887;
    width: 100%;
    height: 1500px;
  }
  .main_left {
    float: left;
    width: 70%;
    margin-left: 20px;
    margin-top: 20px;
    .main_left_title{
      height: 50px;
      background-color: #ffffff;
      span {
        font-size: 23px;
        color: #7f7f7f;
        margin-left: 30px;
        height: 80%;
        margin-top: 8px;
      }
    }
    .main_left_topic {
      margin-top: 5px;
      height: 150px;
      background-color: white;
      .span_num {
        font-size: 30px;
        width: 50px;
        height: 50px;
        color: #e51619;
        margin-left: 30px;
      }
      .span_2 {
        width: 400px;
        height: 180px;
        margin-top: 20px;
        .span_name {
          font-size: 18px;
        }
        .span_name:hover {
          color: dodgerblue;
          cursor: pointer;
        }
        .span_des {
          font-size: 14px;
          color: #b8b8b8;
        }
        .span_time {
          height: 20px;
          position: relative;
          top: 50px;
          color: #7f7f7f;
        }
      }
      .img_3 {
        background-color: #dadada;
        width: 200px;
        height: 130px;
        position: relative;
        margin-top: 10px;
        margin-left: 250px;
        
      }
    }
  }

  .zero {
    color: red;
  }

  .main_right{
    float: right;
    width: 25%;
    margin-top: 20px;
    margin-right: 20px;
    .main_right_1 {
      background-color: #ffffff;
      height: 120px;
      .main_right_1_img {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        position:relative;
        top: 25px;
        img {
          width: 50px;
          height: 50px;
        }
        img:hover{
          cursor: pointer;
        }
      }

    }
    .main_right_2 {
      margin-top: 20px;
      background-color: #ffffff;
      height: 200px;
      .row_1 {
        position: relative;
        width: 80%;
        top: 50px;
        left: 30px;
        font-size: 20px;
      }
      .row_1:hover{
        cursor: pointer;
        color: dodgerblue;
      }
      .row_2 {
        position: relative;
        width: 80%;
        top: 50px;
        left: 30px;
        font-size: 20px;
      }
      .row_2:hover{
        cursor: pointer;
        color: dodgerblue;
      }
    }
  }

</style>
