<template>
<div>
  <header_></header_>
  <div class="topic_main">
    <div class="topic_left">
      <el-row>
        <el-col :span="15">
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
              <el-button icon="el-icon-edit" @click="dialogEditorVisible = true">写回答</el-button>

              <el-dialog title="写回答" :visible.sync="dialogEditorVisible" class="dialog">
                <editorBar v-model="detail" :isClear="isClear" @change="change()"></editorBar>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogEditorVisible = false">取消</el-button>
                  <el-button type="primary" @click="postComment()">确定</el-button>
                </div>
              </el-dialog>
              <img src="../assets/discuss.png" alt="discuss.png">
              <span>{{ this.total_len }}条回答</span>
            </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="9" >
          <img :src="this.$store.state.topic_detail.picture" alt="" class="topic_img">
        </el-col>
      </el-row>
    </div>
    <div class="topic_answer">
      <div class="topic_answer_left">
        <div class="answer_temp" v-for="(item, index) in answer_list" :key="index">
          <el-row class="user">
            <el-col :span="3">
              <img :src="item.url" alt="" style="cursor:pointer" @click=toInfo(item.authorId)>
            </el-col>
            <el-col :span="3">
              <span style="cursor:pointer" @click=toInfo(item.authorId)>{{ item.username }}</span>
            </el-col>
            <el-col :span="1" :offset="19">
              <i class="el-icon-delete"
                 v-if="item.authorId === $store.state.user.userId"
                 @click="delete_comment(item.commentId)"></i>
            </el-col>
          </el-row>
          <el-row class="user_answer">
            <div>
              <p v-html="item.text"></p>
            </div>
          </el-row>
          <el-row class="user_like">
            <img :class="{'has_clicked':item.clicked}" src="../assets/like.png" alt="" @click="addLike(item.commentId, index)">
            <span :class="{'has_clicked':item.clicked}">{{ item.likes }}</span>
            <span class="time_">{{ item.created }}</span>
          </el-row>
          <div class="reply_container">
            <el-button @click="doCollapse(index)" class="reply_button">展开回复</el-button>
            <collapse>
              <div v-if="show_content">
                <div v-if="isActive[index]">
                  <el-button  @click="dialogTestVisible = true">添加回复</el-button>
                  <el-dialog title="写回复" :visible.sync="dialogTestVisible" class="dialog">
                    <editorBar v-model="detail2" :isClear="isClear3" @change="change()"></editorBar>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogTestVisible = false">取消</el-button>
                      <el-button type="primary" @click="postReply(item.authorId, item.commentId, index)">确定</el-button>
                    </div>
                  </el-dialog>
                  <div v-if="reply_list[index].length === 0" style="text-align: center;">暂无回复</div>
                  <div v-for="(item2, index2) in reply_list[index]" :key="index2" class="reply_main">
                    <img :src="item2.url" alt="" style="cursor:pointer" @click=toInfo(item2.authorId)>
                    <span class="span_name" style="cursor:pointer" @click=toInfo(item2.authorId)>{{ item2.authorName }}</span>
                    <span style="margin-left:30px;">回复:</span>
                    <span class="span_name" style="cursor:pointer" @click=toInfo(item2.ownerId)>{{item2.ownerName}}</span>
                    <i class="el-icon-delete"
                       v-if="item2.authorId === $store.state.user.userId"
                       @click="delete_reply(item2.replyId, index)"></i>
                    <br/><br/>
                    <p v-html="item2.text" style="margin-left: 60px;"></p>
                    <br/>
                    <span class="addReply" @click="dialogReplyVisible = true">回复</span>

                    <el-dialog title="写回复" :visible.sync="dialogReplyVisible" class="dialog">
                      <editorBar v-model="detail2" :isClear="isClear2" @change="change()"></editorBar>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogReplyVisible = false">取消</el-button>
                        <el-button type="primary" @click="postReply(item2.authorId, item.commentId)">确定</el-button>
                      </div>
                    </el-dialog>
                    <span class="span_time">{{item2.created}}</span>
                    <hr style="height:1px;border:none;border-top:1px dashed #7f7f7f;width:100%;margin-left: -30px"/>
                  </div>
                  <div class="block2" v-if="reply_list[index].length !== 0">
                    <el-pagination
                      @current-change="handleCurrentChange2"
                      :current-page.sync="currentPage2"
                      :page-size="3"
                      layout="prev, pager, next, jumper"
                      :total="total_len2"></el-pagination>
                  </div>
                </div>
              </div>
            </collapse>
          </div>
        </div>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="total_len"></el-pagination>
        </div>
      </div>
      <div class="topic_answer_right">
        <el-row class="author">
          <span>关于作者</span>
        </el-row>
        <hr style="height:1px;border:none;border-top:1px dashed #7f7f7f;"/>
        <el-row class="user" >
          <el-col :span="3">
            <img :src="topic_author.avatar" alt="" @click="toAuthor" style="cursor:pointer">
          </el-col>
          <el-col :span="7" :offset="2">
            <span @click="toAuthor" style="cursor:pointer">{{ topic_author.nickname }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import header_ from '../components/main_header';
  import collapse from '../js/collapse';
  import editorBar from '../components/editor';
    export default {
      name: "forum_detail",
      components: {
        header_,
        collapse,
        editorBar
      },
      data(){
        return {
          answer_list: [],
          topic_author: [],
          like_all: [],
          isActive: [],
          reply_list: [],
          show_content:false,
          isClear: false,
          isClear2: false,
          isClear3: false,
          detail: "",
          detail2: "",
          dialogEditorVisible: false,
          dialogReplyVisible: false,
          dialogTestVisible: false,
          currentPage: 1,
          total_len: 0,
          currentPage2: 1,
          total_len2: 0,
          currentComment: 0
        }
      },

      created: function(){

        this.get_topic_author();
        this.get_user_likes(this.currentPage);
      },
      mounted: function(){

      },

      beforeCreate(){
        document.querySelector('body').setAttribute('style', 'background: #afcae887');
      },

      beforeDestroy(){
        document.querySelector('body').removeAttribute('style');
      },

      watch:{
        answer_list:{
          handler(val, oldVal){
            // console.log(val, oldVal)
          }
        }
      },
      methods:{
        handleCurrentChange: function(val){
          this.get_user_likes(val);
        },
        handleCurrentChange2: function(val){
          this.get_reply_list2(this.currentComment, val)
        },
        change(val){
        },
        delete_comment: function(commentId){
          this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
              method: 'delete',
              url: '/topicComment',
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                commentId: commentId
              }
            }).then((response) => {
              if(response.status === 200){
                alert("删除成功");
                // this.$router.go(0);
                this.get_user_likes(1);
              }
            }).catch(() => {
              alert("删除评论失败，请重新尝试")
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          });
        },
        delete_reply: function(replyId, index){
          this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
              method: 'delete',
              url: `/reply/${replyId}`,
              headers: {
                'Content-Type': 'application/json'
              },
            }).then((response) => {
              if(response.status === 200){
                alert("删除成功");
                // this.$router.go(0);
                this.doCollapse(index);
              }
            }).catch(() => {
              alert("删除评论失败，请重新尝试")
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          });
        },
        get_topic_answer:function(val){
          this.$axios({
            method: 'post',
            url: 'http://180.76.234.230:8080/topicComment/all',
            headers:{},
            data:{
              topicId: this.$route.params.id,
              offset: (val-1)*5,
              limit: 5
            }
          }).then((response) => {
            console.log(response);
            this.answer_list = response.data.result;
            this.total_len = response.data.count;
            for(let i = 0; i < this.answer_list.length; i++){
              this.answer_list[i].created = this.convert_timestamp(this.answer_list[i].created);
              this.answer_list[i].clicked = false;
              this.isActive[i] = false;
            }
            for(let i = 0; i < this.answer_list.length; i++){
              for(let j = 0; j < this.like_all.length; j++){
                if(this.answer_list[i].commentId === this.like_all[j].commentId){
                  this.answer_list[i].clicked = true;
                }
              }
            }
            console.log(this.answer_list);
          }).catch((error) =>{
            alert(error);
          })
        },

        postReply: function(ownerId, commentId, index){
          this.$axios({
            method: 'post',
            url: 'http://180.76.234.230:8080/reply',
            withCredentials:true,
            data: {
              topicId: parseInt(this.$route.params.id),
              commentId: commentId,
              text: this.detail2,
              ownerId: ownerId
            },
          }).then((response) => {
            console.log(response);
            alert("上传成功");
            this.detail2 = "";
            this.dialogReplyVisible = false;
            this.dialogTestVisible = false;
            // this.$router.go(0);
            this.get_reply_list2(index, 1)
          }).catch(() => {
            alert("上传失败，请重试");
          })
        },

        postComment: function(){
          this.$axios({
            method: 'post',
            url: 'http://180.76.234.230:8080/topicComment',
            withCredentials: true,
            data: {
              topicId: parseInt(this.$route.params.id),
              ownerId: parseInt(this.$route.params.ownerId),
              mail: '123456@163.com',
              text: this.detail
            }
          }).then((response) => {
            console.log(response);
            this.dialogEditorVisible = false;
            alert("上传成功");
            // this.$router.go(0);
            this.get_user_likes(1);
          }).catch(() => {
            alert("上传失败，请重试");
          })
        },

        get_reply_list:function(i, val) {
          this.$axios({
            method: 'get',
            url: `/commentReply/${this.answer_list[i].commentId}`,
            params: {
              offset: (val-1)*3,
              limit: 3
            }
          }).then((response) => {
            this.total_len2 = response.data.count;
            this.reply_list[i] = response.data.result;
            for(let k = 0; k < this.reply_list[i].length; k++){
              this.reply_list[i][k].created = this.convert_timestamp(this.reply_list[i][k].created);
            }
            console.log(this.reply_list[i]);
            this.show_content = !this.show_content;
          }).catch(() => {
            console.log('接口异常');
          })
        },

        get_reply_list2:function(i, val){
          this.$axios({
            method: 'get',
            url: `/commentReply/${this.answer_list[i].commentId}`,
            params: {
              offset: (val-1)*3,
              limit: 3
            }
          }).then((response) => {
            console.log(response);
            this.total_len2 = response.data.count;
            this.$set(this.reply_list, i, response.data.result);
            for(let k = 0; k < this.reply_list[i].length; k++){
              this.reply_list[i][k].created = this.convert_timestamp(this.reply_list[i][k].created);
            }
          }).catch(() => {
            console.log('接口异常');
          })
        },

        get_topic_author:function(){
          this.$axios({
            method: 'get',
            url: `/user/selectOne?userId=${this.$route.params.ownerId}`
          }).then((response) => {
            this.topic_author = response.data;
          })
        },

        get_user_likes:function(val){
          this.$axios({
            method: 'get',
            url: 'http://180.76.234.230:8080/like/all',
            headers: {
              'Content-Type': 'text'
            }
          }).then((response2) => {
            this.like_all = [];
            for(let i = 0; i < response2.data.length; i++){
              if(response2.data[i].userId === this.$store.state.user.userId){
                this.like_all.push(response2.data[i]);
              }
            }
            this.get_topic_answer(val);
          }).catch(() => {
            alert("获取用户点赞详情错误");
          })
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
              this.answer_list[index].clicked = true;
              this.answer_list[index].likes++;
            }).catch(()=> {
              alert("点赞接口异常，请重试")
            })
          }
          if(this.answer_list[index].clicked === true){
            this.$axios({
              method: 'delete',
              url: `http://180.76.234.230:8080/like`,
              headers:{
                'Content-Type': 'application/json'
              },
              data:{
                commentId: comment_id
              }
            }).then(() => {
              this.answer_list[index].likes--;
              this.answer_list[index].clicked = false;
            }).catch(() => {
              alert("取消点赞接口异常，请重试")
            })
          }
        },
        doCollapse:function(index){
          this.currentComment = index;
          let status = !this.isActive[index];
          this.$set(this.isActive, index, status);
          if(this.isActive[index]){
            this.get_reply_list(index, 1);
          }else{
            this.show_content = false;
          }
        },
        toAuthor(){
            if (this.topic_author.userId === this.$store.state.user.userId)
            {
              this.$router.push({
                path: `/personInfo/${this.topic_author.userId}/${"0"}`
              })
            }
            else{
              this.$router.push({
                path: `/othersInfo/${this.topic_author.userId}`
              })
            }
        },
        toInfo(userId){
            if (userId === this.$store.state.user.userId)
            {
              this.$router.push({
                path: `/personInfo/${userId}/${"0"}`
              })
            }
            else{
              this.$router.push({
                path: `/othersInfo/${userId}`
              })
            }
        }
      }
    }
</script>

<style lang="less" scoped>
  .topic_img{
    width: 380px;
    height: 220px;
    margin-top: 30px;
  }
  .topic_main{
    width: 100%;
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
      margin-top: 20px;
      margin-left: 25px;
      .topic_answer_left{
        width: 73%;
        float: left;
        .answer_temp{
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
              left: -30px;
              font-weight: bold;
            }
            i{
              float: right;
            }
            i:hover{
              color: red;
              cursor: pointer;
            }
          }
          .user_answer{
            width: 85%;
            margin: 0 auto;
            p{
              width: 90%;
              margin: 0 auto;
              padding-top: 20px;
            }
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
      .block{
        width: 40%;
        margin: 0 auto;
      }
    }
  }
  .reply_button{
    width: 100%;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
  .reply_container{
    .reply_main{
      width: 80%;
      margin-top: 20px;
      margin-left: 100px;
      img{
        width: 50px;
        height: 50px;
      }
      .span_name{
        margin-left: 30px;
        font-weight: bold;
        font-size: 16px;
      }
      .span_time{
        color: #b4b4b4;
        margin-bottom: 10px;
        margin-right: 30px;
        float: right;
      }
      .addReply{
        color: #b4b4b4;
      }
      .addReply:hover{
        color: #409EFF;
        cursor: pointer;
      }
      i{
        float: right;
      }
      i:hover{
        color: red;
        cursor: pointer;
      }
    }
    .block2{
      margin-left: 50px;
    }
  }
  .dialog{
    width: 1600px;
    margin-left: -100px;
  }

</style>
