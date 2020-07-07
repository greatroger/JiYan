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
          <span class="topic">话题</span>
          <el-container class="main_right_button">
            <span @click="sort_by_time()" ref="time">按时间排序</span>
            <span style="margin-left: 35px;" @click="sort_by_hot()" ref="hot">按热度排序</span>
            <img src="../assets/refresh.png" alt="" class="sort_img"  @click="sort_normal()">
          </el-container>
        </el-container>
        <div class="main_left_topic" v-for="(item,index) in topic_list" :key="index">
          <el-col :span="3">
            <span class="span_num">{{ index + (currentPage-1)*10 }}</span>
            <br/>
          </el-col>
          <el-col :span="14" class="span_2" >
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
        </div>
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
            <el-form :model="form" :rules="rules" ref="form">
              <el-form-item label="标题名称" :label-width="formLabelWidth" prop="titleName">
                <el-input v-model="form.titleName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="详细描述" :label-width="formLabelWidth" prop="description">
                <el-input v-model="form.description" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="话题图片" :label-width="formLabelWidth">
                <el-upload
                  action="http://jiyan2020.oss-cn-beijing.aliyuncs.com"
                  class="avatar-uploader"
                  style="border: 2px dashed #d9d9d9;"
                  :show-file-list="false"
                  :http-request='handlePicUpload'
                  :before-upload="beforePicUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <div class="dialog-footer">
                  <el-button @click="dialogTableVisible = false">取 消</el-button>
                  <el-button type="primary" @click="uploadTopic('form')">确 定</el-button>
                </div>
              </el-form-item>
            </el-form>
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
  import {client}  from '../js/oss.js'
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
            description: ''
          },
          rules: {
            titleName: [
              { required: true, message: '请输入话题名', trigger: 'blur' },
              { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
            ],
            description: [
              { required: true, message: '请输入话题描述', trigger: 'blur' },
              { min: 1, max: 35, message: '长度在 1 到 35 个字符', trigger: 'blur' }
            ]
          },
          currentPage: 1,
          total_len: 0,
          select_input: "",
          isSearch: false,
          currentType: 0,
          imageUrl: '',
          dataObj: '',
          picture: ''
        }
      },

      created: function(){
        this.get_topic_all(0);
        this.setQuesNum();
        this.setReviewNum();
      },
      methods: {
        handlePicUpload:function(file){
          console.log(file);
          client(this.dataObj).multipartUpload(file.file.name, file.file).then((response) => {
            alert("上传图片成功");
            this.picture = response.res.requestUrls[0];
          }).catch(() => {
            alert("上传图片失败，请重试");
          })
        },
        beforePicUpload:function(){
          const OSSConfig = {
            type: 'scs',
            ossParams: {
              region: 'oss-cn-beijing',
              success_action_status: '200',
              accessKeyId: 'LTAI4Fth4afrtSPEA55FnXfe',
              accessKeySecret: '5SWPdCDJtWNBRkVL9UwsNsHFkzbuG9',
              bucket: 'jiyan2020',
            },
          };
          this.dataObj=OSSConfig.ossParams;
        },
        handleCurrentChange:function(val){
          if(!this.isSearch){
            this.$axios({
              method: 'get',
              url: '/topic',
              params: {
                type: this.currentType,
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

        sort_by_hot:function(){
          this.currentType = 2;
          this.get_topic_all(2);
          this.$refs.hot.style.color="red";
          this.$refs.time.style.color="#b4b4b4";
        },

        sort_by_time:function(){
          this.currentType = 1;
          this.get_topic_all(1);
          this.$refs.time.style.color="red";
          this.$refs.hot.style.color="#b4b4b4";
        },

        sort_normal:function(){
          this.currentType = 0;
          this.get_topic_all(0);
          this.$refs.time.style.color="#b4b4b4";
          this.$refs.hot.style.color="#b4b4b4";
        },

        get_topic_all: function(type) {
          this.$axios({
            method: 'get',
            url: '/topic',
            params: {
              type: type,
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
        uploadTopic:function(form){
          this.$refs[form].validate((valid) => {
            if(valid){
              this.dialogTableVisible = false;
              this.$axios({
                method: 'post',
                url: 'http://180.76.234.230:8080/topic',
                withCredentials: true,
                data: {
                  topicName: this.form.titleName,
                  description: this.form.description,
                  picture: this.picture
                }
              }).then(() => {
                this.$router.go(0);
                alert('上传成功');
              }).catch(() => {
                alert("上传错误，请重试");
              })
            }else{
              return false;
            }

          })
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
    height: 2500px;
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
      .topic {
        font-size: 23px;
        color: #7f7f7f;
        margin-left: 30px;
        height: 80%;
        margin-top: 8px;
      }
      .main_right_button{
        margin-left: 700px;
        margin-top: 15px;
        color: #b4b4b4;
        font-size: 14px;
        span:hover{
          color: red;
          cursor: pointer;
        }
        .sort_img{
          height: 20px;
          width: 20px;
          margin-left: 20px;
        }
        .sort_img:hover{
          cursor: pointer;
        }
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
      height: 180px;
      background-color: white;
      i{
        margin-top: 65px;
      }
      i:hover{
        color: red;
        cursor: pointer;
      }
      .span_num {
        /*margin-left: 30px;*/
        /*margin-top: 15px;*/
        /*float: right;*/
        /*background-color: #409EFF;*/
        /*width:50px;*/
        /*height:50px;*/
        /*border-radius:50%;*/
        /*font-size:26px;*/
        /*color:#fff;*/
        /*line-height: 45px;*/
        /*text-align:center;*/
        /*box-shadow:  2px 2px 2px 3px rgba(0, 0, 0, 0.2)*/
        font-size: 18px;
        font-weight: bolder;
        color: #7f7f7f;
        margin-left: 30px;
      }
      .span_2 {
        /*width: 400px;*/
        /*height: 100px;*/
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
          top: 70px;
          color: #7f7f7f;
        }
      }
      .img_3 {
        img{
          width: 200px;
          height: 130px;
          /*box-shadow:  2px 2px 2px 1px rgba(0, 0, 0, 0.2)*/
        }
        margin-top: 20px;
        /*margin-left: 10px;*/

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
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    margin-left: 180px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .dialog-footer{
    float: right;
  }

</style>
