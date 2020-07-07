<template>
  <div>
    <header_></header_>
    <div class="top_header">
      <el-input
        class="select_input"
        placeholder="请输入搜索内容"
        v-model="select_input"></el-input>
      <el-button @click="select_topic(1)">搜索</el-button>
    </div>
    <div class="main">
      <div class="main_left">
        <el-container class="main_left_title">
          <span>话题</span>
        </el-container>
        <el-container class="main_left_topic" v-for="(item,index) in topic_list" :key="index">
          <el-col :span="3">
            <span class="span_num">{{ index + (currentPage-1)*10 }}</span>
            <br/>
          </el-col>
          <el-col :span="5" class="span_2" :offset="3">
            <span class="span_name" :class="zero_style[index]" @click="toTopic(item.topicId, item.ownerId)">{{ item.topicName  }}</span>
            <br/>
            <span class="span_des">{{ item.description }}</span>
            <br/>
            <span class="span_time">{{ item.created }}</span>
          </el-col>
          <el-col :span="5" class="img_3">
            <img :src="item.picture" alt="">
          </el-col>
          <el-col :span="1" :offset="1">
            <i class="el-icon-delete"
               v-if="item.ownerId === $store.state.user.userId"
               @click="delete_topic(item.topicId)"></i>
          </el-col>
        </el-container>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total_len"></el-pagination>
        </div>
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
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="toEditor()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="main_right_2">
          <el-row>
            <el-col :span="24" class="row_1" >
              <span @click="toMyTopic"><i class="el-icon-tickets"></i>&nbsp;&nbsp;&nbsp;我的问题</span>
              <span class="count-topic">{{count_topic}}</span>
            </el-col>
          </el-row>
          <br/>
          <hr style="height:1px;border:none;border-top:1px dashed #7f7f7f; margin-top: 50px"/>
          <el-row>
            <el-col :span="24" class="row_2" >
              <span @click="toMyAnswer" ><i class="el-icon-edit"></i>&nbsp;&nbsp;&nbsp;我的回答</span>
              <span class="count-review">{{count_review}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import header_ from '../components/main_header'
    export default {
      name: "forum_main",
      components: {
        header_,
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
          currentPage: 1,
          total_len: 0,
          select_input: "",
          isSearch: false
        }
      },

      created: function(){
        this.get_topic_all();
        this.setQuesNum();
        this.setReviewNum();
      },
      methods: {
        handleCurrentChange:function(val){
          if(!this.isSearch){
            this.$axios({
              method: 'get',
              url: '/topic',
              params: {
                offset: (val-1)*10,
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
          }else if(this.isSearch){
            this.select_topic(val);
          }
        },

        select_topic:function(val){
          this.currentPage = 1;
          if(this.select_input === ""){
            this.isSearch = false;
            this.$router.go(0);
          }else{
            this.isSearch = true;
            this.$axios({
              method: 'post',
              url: '/topic/match',
              data: {
                topicName: this.select_input,
                offset: (val-1)*10,
                limit: 10
              }
            }).then((response) => {
              this.topic_list = response.data.result;
              this.total_len = response.data.count;
              for(let i = 0; i < this.topic_list.length; i++) {
                this.topic_list[i].created = this.convert_timestamp(this.topic_list[i].created);
              }
            }).catch(() => {
              alert("查找错误，请重试");
            });
          }
        },

        get_topic_all: function() {
          this.$axios({
            method: 'get',
            url: '/topic',
            params: {
              offset: 0,
              limit: 10
            }
          }).then((response) => {
            console.log(response);
            this.topic_list = response.data.result;
            this.total_len = response.data.count;
            for(let i = 0; i < this.topic_list.length; i++) {
              this.topic_list[i].created = this.convert_timestamp(this.topic_list[i].created);
            }
          }).catch(() => {
            alert("接口异常");
          })
        },
        delete_topic:function(topicId) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
              method: 'delete',
              url: '/topic',
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                topicId: topicId
              }
            }).then((response) => {
              if(response.status === 200){
                alert("删除成功");
                this.$router.go(0);
              }
            }).catch(() => {
              alert("删除话题失败，请重新尝试")
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          });

        },
        convert_timestamp: function(timestamp) {
          let date = new Date(timestamp * 1000);
          let year = date.getFullYear() + '-';
          let month = (date.getMonth() + 1 > 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          let day = date.getDate() + ' ';
          let hour = date.getHours() + ':';
          let minutes = date.getMinutes() + ':';
          let seconds = date.getSeconds();
          return year + month + day + hour + minutes + seconds;
        },
        toTopic:function(topicId, ownerId) {
          for(let i = 0; i < this.topic_list.length; i++){
            if(topicId === this.topic_list[i].topicId){
              this.$store.state.topic_detail = this.topic_list[i];
            }
          }
          this.$router.push({
            path: `/forum/detail/${topicId}/${ownerId}`
          })
        },
        toEditor:function(){
          this.dialogTableVisible = false;
          this.$router.go(0);

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
    height: 2000px;
  }
  .top_header {
    background-color: #afcae887;
    height: 60px;
  }
  .select_input {
    width: 20%;
    margin-left: 500px;
    margin-top: 20px;
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
    .block{
      width: 50%;
      padding-top: 30px;
      margin: 0 auto;
    }
    .block /deep/ .el-input__inner{
      background-color: #afcae887;
      color: white;
      font-size: 16px;
      border-bottom: 1px solid #ffffff;
      border-top: 0;
      border-left: 0;
      border-right: 0;
    }

    .main_left_topic {
      margin-top: 5px;
      height: 150px;
      background-color: white;
      i{
        margin-top: 65px;
      }
      i:hover{
        color: red;
        cursor: pointer;
      }
      .span_num {
        margin-left: 30px;
        margin-top: 15px;
        float: right;
        background-color: #409EFF;
        width:50px;
        height:50px;
        border-radius:50%;
        font-size:26px;
        color:#fff;
        line-height: 45px;
        text-align:center;
        box-shadow:  2px 2px 2px 3px rgba(0, 0, 0, 0.2)
      }
      .span_2 {
        width: 400px;
        height: 180px;
        margin-top: 20px;
        .span_name {
          font-size: 18px;
          text-decoration:underline;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .span_name:hover {
          color: dodgerblue;
          cursor: pointer;
        }
        .span_des {
          font-size: 14px;
          color: #b8b8b8;
          position: relative;
          top: 10px;
        }
        .span_time {
          height: 20px;
          position: relative;
          top: 50px;
          color: #7f7f7f;
        }
      }
      .img_3 {
        img{
          width: 200px;
          height: 130px;
          box-shadow:  2px 2px 2px 1px rgba(0, 0, 0, 0.2)
        }
        margin-top: 10px;
        margin-left: 60px;

      }
    }
  }

  /*.zero {*/
  /*  color: red;*/
  /*}*/

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
        .count-topic{
          float: right;
          background-color: #409EFF;
          width:30px;
          height:30px;
          border-radius:50%;
          font-size:16px;
          color:#fff;
          line-height: 30px;
          text-align:center;

        }
      }
      .row_1:hover{
        cursor: pointer;
        color: dodgerblue;
      }
      .row_2 {
        position: relative;
        width: 80%;
        top: 20px;
        left: 30px;
        font-size: 20px;
        .count-review{
          float: right;
          background-color: #409EFF;
          width:30px;
          height:30px;
          border-radius:50%;
          font-size:16px;
          color:#fff;
          line-height: 30px;
          text-align:center;
        }
      }
      .row_2:hover{
        cursor: pointer;
        color: dodgerblue;
      }
    }
  }

</style>
