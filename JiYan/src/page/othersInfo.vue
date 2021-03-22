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
                    <el-button @click="getTopicDetail"> ta创建的话题</el-button>
                    <el-button @click="getReviewDetail">ta的回答</el-button>
                </el-tabs>
                <div v-if="QuesVisible">
<!--                    <el-container class="main_left_topic" v-for="(item,index) in topic_list" :key="index">-->
<!--                        <el-col :span="3">-->
<!--                            <span class="span_num">{{ index }}</span>-->
<!--                        </el-col>-->
<!--                        <el-col :span="3" class="span_2">-->
<!--                            <span class="span_name" :class="zero_style[index]">{{ item.topicName  }}</span>-->
<!--                            <br/>-->
<!--                            <span class="span_des">{{ item.description }}</span>-->
<!--                            <br/>-->
<!--                            <span class="span_time">{{ item.created }}</span>-->
<!--                        </el-col>-->
<!--                        <el-col :span="5" class="img_3">-->
<!--                        </el-col>-->
<!--                    </el-container>-->
                </div>

                 <div v-if="ReviewVisivle">
<!--                    <el-container class="main_left_review" v-for="(item,index) in reviewList" :key="index">-->
<!--                        <el-col :span="3">-->
<!--                            <span class="span_num">{{ index }}</span>-->
<!--                        </el-col>-->
<!--                        <el-col :span="3" class="span_2">-->
<!--                            <span class="span_name" :class="zero_style[index]">{{ item.topicId  }}</span>-->
<!--                            <br/>-->
<!--                            <span class="span_des" @click="alert1(index)" v-html="item.text"></span>-->
<!--                            <br/>-->
<!--                            <span class="span_time">点赞数：{{ item.likes }}</span>-->
<!--                        </el-col>-->
<!--                    </el-container>-->
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
    name:'othersInfo',
    data(){
        return {
            userId:'',
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
        };
    },
    methods:{
        getTopicDetail(){
            this.QuesVisible=true;
            this.ReviewVisivle=false;
            //this.topic_list=this.$store.state.topic_detail.result;
            this.$axios({
                method: 'get',
                url: 'http://8.136.208.55:8080/topic/user/'+this.userId,
                headers: {},
                params: {},
            }).then((response) => {
                console.log(response);
                this.topic_list=response.data;
            }).catch((error) => {
                alert(error);
            });
            for (let i=0;i<this.topic_list.length;i++){
                var time_str=this.topic_list[i].created.toString();
                if (time_str.indexOf("-") == -1 ){
                    this.topic_list[i].created=this.convert_timestamp(this.topic_list[i].created);
                }
            }
            console.log(this.topic_list);
        },
        getReviewDetail(){
            this.ReviewVisivle=true;
            this.QuesVisible=false;
            //this.reviewList=this.$store.state.review_detail;
            this.$axios({
                method: 'get',
                url: 'http://8.136.208.55:8080/topicComment/user/'+this.userId,
                headers: {},
                params: {},
            }).then((response) => {
                console.log(response);
                this.reviewList=response.data;
            }).catch((error) => {
                alert(error);
            });
            for (let i = 0; i < this.reviewList.length; i++) {
                this.oriText[i]=this.reviewList[i].text;
                for (let j = 0; j < this.topic_list_all.length; j++){
                    if (this.reviewList[i].topicId===this.topic_list_all[j].topicId){
                        this.reviewList[i].topicId=this.topic_list_all[j].topicName;
                    }
                }
                if (this.reviewList[i].text.length>30){
                    this.reviewList[i].text=this.reviewList[i].text.substring(0,25)+"...";
                }
            }
            console.log(this.reviewList);
        },
        getAllTopic(){
            this.$axios({
            method: 'get',
            url: 'http://8.136.208.55:8080/topic',
            params: {
              offset: 0,
              limit: 10
            }
          }).then((response) => {
            this.topic_list_all = response.data.result;
            for(let i = 0; i < this.topic_list_all.length; i++) {
              this.topic_list_all[i].created = this.convert_timestamp(this.topic_list_all[i].created);
            }
            console.log(response);
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
        alert1(index){
            //alert("完整回答："+this.oriText[index]);
            this.$alert(this.oriText[index], '完整回答', {
                confirmButtonText: '确定'
            });
        },
    },
    components:{
        mainheader_
    },
    mounted(){

        this.userId=this.$route.params.userId;
        this.$axios({
            method: 'get',
            url: 'http://8.136.208.55:8080/user/selectOne?userId=' + this.userId,
            headers: {},
            params: {},
        }).then((response) => {
            console.log(response);
            this.userName=response.data.name;
            this.nickName=response.data.nickname;
            this.mail=response.data.mail;
            this.avatarUrl=response.data.avatar;
        }).catch((error) => {
            alert(error);
        });
        this.getTopicDetail();
        this.getAllTopic();
    }
}
</script>

<style lang="less" scoped>
    .main{
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
        position:relatvie;
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
    .UserAvatarEditor{

    }
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
           width: 90%;
          margin: 0 auto;
              padding-top: 20px;
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

    .main_left_review {
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
        .span_des {
          height: 20px;
          font-size: 16px;
          color: rgb(185, 159, 109);
        }
        .span_time {
          height: 20px;
          position: relative;
          top: 50px;
          font-size: 13px;
          color: rgb(201, 199, 199);
        }
      }
    }
</style>
