<template>
<div class="main">
    <mainheader_>
    </mainheader_>
    <el-row>
        <el-col :span="16" :offset="4">
            <div class="card">
                <div class="ProfileHeader-userCover">
                    <div class="UserCoverEditor">
                        <div class="UserCover UserCover--colorBlock">

                        </div>
                    </div>
                </div>
                <div class="ProfileHeader-wrapper">
                    <div class="ProfileHeader-main">
                        <div class="UserAvatarEditor ProfileHeader-avatar" style="top:-74px;">
                            <div class="UserAvatar">
                                <img class="Avatar Avatar--large UserAvatar-inner" width="160" height="160"
                                    :src="avatarUrl" >
                            </div>
                        </div>
                    <div class="ProfileHeader-content">
                                            <h2> {{userName}}</h2>
                                            <div>{{nickName}}</div>
                                            <div>{{mail}}</div>
                                            <el-button @click="editInfo" style="float:right">编辑个人信息</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
        <el-col :span="16" :offset="4">
            <div style="min-height:600px;display:block;">
                <el-tabs type="border-card">
                    <el-button @click="getTopicDetail" > 我创建的话题</el-button>
                    <el-button @click="getReviewDetail">我的回答</el-button>
                </el-tabs>
                <div v-if="QuesVisible">
                    <el-container class="main_left_topic" v-for="(item,index) in topic_list" :key="index">
                        <el-col :span="1">
                            <!-- <span class="span_num">{{ index }}</span> -->
                        </el-col>
                        <el-col :span="3" class="span_2">
                            <span class="span_name" :class="zero_style[index]" @click="toTopic(item.topicId, item.ownerId)">{{ item.topicName  }}</span>
                            <!-- <el-button class="delete" size="mini" type="primary" icon="el-icon-delete" @click="deleteTopic(item.topicId,index)"></el-button> -->
                            <br/>
                            <span class="span_des">{{ item.description }}</span>
                            <br/>
                            <br/>
                            <span class="span_time">{{ item.created }}</span>
                        </el-col>
                        <el-col :span="5" class="span_3">

                        </el-col>
                        <el-col :span="1" >
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <el-button class="delete" size="mini" type="primary" icon="el-icon-delete" @click="deleteTopic(item.topicId,index)"></el-button>
                        </el-col>
                    </el-container>
                </div>
                <div class="block" v-if="QuesVisible">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="10"
                        layout="prev, pager, next, jumper"
                        :total="total_len">
                    </el-pagination>
                </div>

                 <div v-if="ReviewVisivle">
                    <el-container class="main_left_review" v-for="(item,index) in reviewList" :key="index">
                        <el-col :span="3">
                            <!-- <span class="span_num">{{ index }}</span> -->
                        </el-col>
                        <el-col :span="3" class="span_2">
                            <span class="span_name" :class="zero_style[index]" @click="toTopic(item.topicId_, item.ownerId)">{{ item.topicId  }}</span>
                            <!-- <el-button class="delete" size="mini" type="primary" icon="el-icon-delete" @click="deleteReview(item.commentId,index)"></el-button> -->
                            <br/>
                            <span class="span_des" @click="alert1(index)" v-html="item.text"></span>
                            <br/>
                            <span class="span_time">点赞数：{{ item.likes }}</span>
                        </el-col>
                        <el-col :span="1" :offset="1">
                            <br>
                            <el-button class="delete" size="mini" type="primary" icon="el-icon-delete" @click="deleteReview(item.commentId,index)"></el-button>
                        </el-col>
                    </el-container>
                </div>
                <div class="block" v-if="ReviewVisivle">
                    <el-pagination
                        @current-change="handleCurrentChange2"
                        :current-page.sync="currentPage2"
                        :page-size="10"
                        layout="prev, pager, next, jumper"
                        :total="total_len2">
                    </el-pagination>
                </div>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import axios from 'axios'
import mainheader_ from '../components/main_header'
export default {
    name:'personInfo',
    data(){
        return {
            userName:'',
            nickName:'',
            mail:'',
            avatarUrl:'',
            topic_list_all:[],
            topic_list:[],
            reviewList:[],
            oriText:[],
            zero_style: [
            "zero",
          ],
            QuesVisible: false,
            ReviewVisivle:false,
            currentPage: 1,
            total_len: 0,
            currentPage2: 1,
            total_len2: 0,
        };
    },
    methods:{
        getTopicDetail(){
            this.QuesVisible=true;
            this.ReviewVisivle=false;
            var userId=this.$store.state.user.userId;
            axios({
              method: 'post',
              url: 'http://8.136.208.55:8080/topic/all',
              data: { "ownerId":userId, "offset":0,"limit":30 }
            }).then((response) => {
              console.log(response.data.result);
              this.topic_list = response.data.result;
              this.$store.state.topic_count=response.data.result.length;
              for (let i=0;i<this.topic_list.length;i++){
                var time_str=this.topic_list[i].created.toString();
                if (time_str.indexOf("-") === -1 ){
                  this.topic_list[i].created=this.convert_timestamp(this.topic_list[i].created);
                }
              }
            });

            console.log(this.topic_list);
        },
        getReviewDetail(){
            this.ReviewVisivle=true;
            this.QuesVisible=false;
            // this.reviewList=this.$store.state.review_detail;
            axios({
              method: 'get',
              url: 'http://8.136.208.55:8080/topicComment/all',
            }).then((response) => {
              console.log(response.data);
              this.review_detail = response.data;
              this.$store.state.review_count=response.data.length;
              this.reviewList = this.review_detail;
              for (let i = 0; i < this.reviewList.length; i++) {
                for (let j = 0; j < this.topic_list_all.length; j++){
                  if (this.reviewList[i].topicId===this.topic_list_all[j].topicId){
                    this.reviewList[i].topicId_ = this.reviewList[i].topicId;
                    this.reviewList[i].topicId=this.topic_list_all[j].topicName;
                  }
                }
                if (this.reviewList[i].text.length>25){
                  this.reviewList[i].text=this.reviewList[i].text.substring(0,25)+"...";
                }
              }
            });

            console.log(this.reviewList);
        },
        // getAllTopic(){
        //     this.$axios({
        //     method: 'get',
        //     url: '/topic',
        //     params: {
        //       offset: 0,
        //       limit: 30
        //     }
        //   }).then((response) => {
        //     this.topic_list_all = response.data.result;
        //     for(let i = 0; i < this.topic_list_all.length; i++) {
        //       this.topic_list_all[i].created = this.convert_timestamp(this.topic_list_all[i].created);
        //     }
        //     console.log(response);
        //   })
        // },
        getAllTopic(){
            axios({
                method: 'get',
                url: 'http://8.136.208.55:8080/topic?offset=0&limit=10&type=0'
            }).then((response) => {
                this.topic_list_all = response.data.result;
            });
        },
        handleCurrentChange:function(val){
            this.QuesVisible=true;
            this.ReviewVisivle=false;
            var userId=this.$store.state.user.userId;
            axios({
                method: 'post',
                url: 'http://8.136.208.55:8080/topic/all',
                data: { "ownerId":userId, "offset":(val-1)*10,"limit":10 }
            }).then((response) => {
                this.topic_list = response.data.result;
                for(let i = 0; i < this.topic_list.length; i++) {
                    this.topic_list[i].created = this.convert_timestamp(this.topic_list[i].created);
                }
            });
        },
        handleCurrentChange2:function(val){
            this.QuesVisible=false;
            this.ReviewVisivle=true;
            var userId=this.$store.state.user.userId;
            axios({
                method: 'post',
                url: 'http://8.136.208.55:8080/topicComment/all',
                data: { "authorId":userId, "offset":(val-1)*10,"limit":10 }
            }).then((response) => {
                console.log(response);
                this.review_list = response.data.result;
                for (let i = 0; i < this.review_list.length; i++) {
                    for (let j = 0; j < this.topic_list_all.length; j++){
                        if (this.review_list[i].topicId===this.topic_list_all[j].topicId){
                          this.reviewList[i].topicId_ = this.reviewList[i].topicId;
                            this.review_list[i].topicId=this.topic_list_all[j].topicName;
                        }
                    }
                if (this.review_list[i].text.length>25){
                    this.review_list[i].text=this.review_list[i].text.substring(0,25)+"...";
                }
            }
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
        deleteReview(index,li){
           this.$confirm('此操作将永久删除该回答, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           axios({
                method: 'delete',
                url: 'http://8.136.208.55:8080/topicComment',
                data: { commentId: index }
            }).then((response) => {
                console.log(response);
                this.reviewList.splice(li,1);
                alert("删除回答成功！");
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        },
        deleteTopic(index,li){
           this.$confirm('此操作将永久删除该话题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
                method: 'delete',
                url: 'http://8.136.208.55:8080/topic',
                data: { topicId: index }
            }).then((response) => {
                console.log(response);
                this.topic_list.splice(li,1);
                alert("删除话题成功！");
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        },
        alert1(index){
            this.$alert(this.oriText[index], '完整回答', {
                confirmButtonText: '确定'
            });
        },
        editInfo(){
            this.$router.push({
          path: `/editInfo`})
        },
        toTopic:function(topicId, ownerId) {
          console.log(topicId);
          console.log(ownerId);
          for(let i = 0; i < this.topic_list.length; i++){
            if(topicId === this.topic_list[i].topicId){
              console.log(this.topic_list[i]);
              this.$store.state.topic_detail = this.topic_list[i];
            }
          }
          this.$router.push({
            path: `/forum/detail/${topicId}/${ownerId}`
          })
        },
    },
    components:{
        mainheader_
    },
    mounted(){
        let user=JSON.parse(sessionStorage.getItem("id"));
        console.log(user);
        console.log(this.$store.state.user);
        this.userName= this.$store.state.user.name;
        this.nickName=this.$store.state.user.nickname;
        this.mail=this.$store.state.user.mail;
        this.avatarUrl=this.$store.state.user.avatar;
        //this.getTopicDetail();
        this.total_len=this.$store.state.topic_count;
        this.total_len2=this.$store.state.review_counth;
        console.log(this.total_len);
        console.log(this.total_len2);
        this.getAllTopic();
        this.handleCurrentChange(1);
        this.reviewList=this.$store.state.review_detail;
        for (let i = 0; i < this.reviewList.length; i++) {
            this.oriText[i]=this.reviewList[i].text;
        }
        if (this.$route.params.offset=="1")
        {
            this.getTopicDetail();
        }
        else{
           this.getReviewDetail();
        }
    }
}
</script>

<style lang="less" scoped>
    .main{
        //background-color: #e8e8e8;
        background-color: #afcae887;
    }
    .card{
        background:#fff;
        overflow:hidden;
        border-radius:2px;
        box-shadow:0 1px 3px rgba(26,26,26,.1);
        box-sizing:border-box;
        display:block;
        height:300px;
    }
    .card .div{
        display:block;
    }
    .UserCoverEditor{
        position:relative;
    }
    .UserCover--colorBlock{
        height:132px;
        //background:#aaa;
        background:#99CCFF;
    }
    .UserCover{
        position:relative;
        overflow:hidden;
        border-top-right-radius:1px;
        border-top-left-radius:1px;
        transition:height .3s;
    }
    .ProfileHeader-wrapper{
        position:relative;
        width:100%;
        background:#fff;
        box-sizing:border-box;
    }
    .ProfileHeader-main{
        position:relative;
        margin:0 20px 24px;
    }
    .ProfileHeader-avatar{
        position:absolute;
        left:0;
        z-index:1;
    }
    // .UserAvatarEditor{
    //     cursor:pointer;
    // }
    .UserAvatar{
        display:inline-block;
        overflow:hidden;
        vertical-align:top;
        background-color:#fff;
        border:4px solid #fff;
        border-radius:8px;
    }
    .ProfileHeader-content{
        padding-top:-10px;
        padding-left:32px;
        border-left:164px solid transparent;
    }
    .ProfileHeader-contentHead{
        position:relative;
        padding-right:106px;
        margin-bottom:16px;
    }
    .ProfileHeader-title{
        -webkit-box-flex:1;
        flex:1 1;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        margin-top:15px;
        margin-bottom:15px;
    }
    .ProfileHeader-name{
        font-size:20px;
        font-weight:600;
        line-height:30px;
    }
    .ProfileHeader-contentBody{
        position:relative;
        width:524px;
    }
    .ProfileHeader-detail{
        width:100%;
        font-size:14px;
        line-height:1.8;
        color:#1a1a1a;
    }
    .ProfileHeader-detailItem{
        display:flex;
        margin-bottom:18px;
    }
    .ProfileHeader-detailLabel{
        width:60px;
        margin-right:37px;
        font-weight:600;
    }
    .ProfileHeader-detailValue {
    -webkit-box-flex: 1;
    -ms-flex: 1 1;
    flex: 1 1;
    overflow: hidden;
    }
    .main_left_topic {
      margin-top: 5px;

      background-color: white;
      .span_num {
        font-size: 30px;
        width: 50px;
        height: 50px;
        color: #e51619;
        margin-left: 30px;
      }
      .span_2 {
        width: 600px;
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
    }
    
    .main_left_review {
      margin-top: 5px;
      /*height: 150px;*/
      background-color: white;
      .span_num {
        font-size: 30px;
        width: 50px;
        height: 50px;
        color: #e51619;
        margin-left: 30px;
      }
      .span_2 {
        width: 600px;
        height: 180px;
        margin-top: 20px;
        .span_name {
          font-size: 18px;
        }
        .span_name:hover{
          cursor: pointer;
          color: #409EFF;
        }
        .span_des {
          height: 20px;
          font-size: 16px;
          color: rgb(185, 159, 109);
        }
        .span_time {
          height: 20px;
          position: relative;
          top: 5px;
          font-size: 13px;
          color: rgb(201, 199, 199);
        }
      }
    }
    
</style>
