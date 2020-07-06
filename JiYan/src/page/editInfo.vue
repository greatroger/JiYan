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
                        <div class="UserAvatarEditor" style="top:-74px;">
                            <div class="UserAvatar">
                                <!--<img  width="160" height="160"
                                    :src="avatarUrl" >-->
                                <el-upload
                                    class="avatar-uploader"
                                    action="http://jiyan2020.oss-cn-beijing.aliyuncs.com"
                                    :show-file-list="false"
                                    :before-upload="beforeUpload"
                                    :http-request="upLoad"
                                >
                                <div>
                                <img v-if="avatarUrl" :src="avatarUrl" class="avatar" width="160" height="160">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </div>
                                </el-upload>
                            </div>
                            <br>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点击修改头像</span>
                        </div>
                        <div class="ProfileHeader-content">
                            <span>用户名：&nbsp;&nbsp;&nbsp;</span>
                            <el-input disabled :placeholder="userName" style="width:200px;margin:10px 10px 10px 10px;white-space:nowrap;"></el-input>
                            <br>
                            <span>昵称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <el-input v-model="nickName" style="width:200px;margin:10px 10px 10px 10px"></el-input>
                            <br>
                            <span>邮箱：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <el-input v-model="mail" style="width:200px;margin:10px 10px 10px 10px"></el-input>
                            <el-row>
                                <el-col :offset="3">
                                    <el-button @click="editInfo" style="margin:20px 20px 20px 20px">修改信息</el-button>
                                </el-col>
                            </el-row>
                            

                            <span>新密码：&nbsp;&nbsp;&nbsp;</span>
                            <el-input v-model="password" type="password" style="width:200px;margin:10px 10px 10px 10px;white-space:nowrap;"></el-input>
                            <br>
                            <span>重复密码：</span>
                            <el-input v-model="password2" type="password" style="width:200px;margin:10px 10px 10px 10px"></el-input>
                            <el-row>
                                <el-col :offset="3">
                                    <el-button @click="editPassword" style="margin:20px 20px 20px 20px">修改密码</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import axios from 'axios'
import mainheader_ from '../components/main_header'
import {client}  from '../oss/oss.js'
export default {
    name:'editInfo',
    data(){
        return {
            userName:'',
            nickName:'',
            mail:'',
            avatarUrl:'',
            password:'',
            password2:''
        };
    },
    methods:{
        editInfo(){
            if (this.nickName=="")
            {
                alert("昵称不得为空！");
            }
            else if (this.mail=="")
            {
                alert("邮箱不得为空！");
            }
            else{
            this.$axios({
            method: 'put',
            url: 'http://180.76.234.230:8080/user',
            data:{
                nickname:this.nickName,
                mail:this.mail
            }
          }).then((response) => {
            console.log(response);
            this.$store.state.user.nickname=this.nickName;
            this.$store.state.user.mail=this.mail;
            alert("修改成功");
          }).catch(() => {
            alert("修改信息接口异常");
          })

         }
        },
        editPassword(){
            if (this.password=="")
            {
                alert("密码不得为空！");
            }
            else if (this.password!=this.password2)
            {
                alert("两次密码输入不一致！");
            }
            else{
                this.$axios({
                    method: 'put',
                    url: 'http://180.76.234.230:8080/user',
                    data:{
                        password:this.password
                    }
                }).then((response) => {
                    console.log(response);
                    this.$store.state.user.password=this.password;
                    alert("修改成功")
                }).catch(() => {
                    alert("修改信息接口异常");
                })
            }
        },
        /**
        * [beforeUpload 上传图片前执行获取秘钥]
        * @return {[type]} [description]
        */
        beforeUpload() {
           const OSSConfig = {
	            //uploadHost: 'http://jiyan2020.oss-cn-beijing.aliyuncs.com', //OSS上传地址
	            type: 'scs',
	            ossParams: {
		            region: 'oss-cn-beijing',
		            success_action_status: '200', // 默认200
		            accessKeyId: 'LTAI4Fth4afrtSPEA55FnXfe',
		            accessKeySecret: '5SWPdCDJtWNBRkVL9UwsNsHFkzbuG9',
		            bucket: 'jiyan2020',
	            },
           }
           this.dataObj=OSSConfig.ossParams;
        }, 
        /**
        * [upLoad 自定义上传图片]
        * @param  {[type]} file [上传值]
        * @return {[type]}      [description]
        */
        upLoad(file) {
            const self = this
            let files = file.file,
            point = files.name.lastIndexOf('.'),
            suffix = files.name.substr(point),
            fileName = files.name.substr(0, point),
            date = Date.parse(new Date()),
            fileNames = `${fileName}_${date}${suffix}`;



            //fileNames上传文件的名称
            //file.file上传文件的内容
            client(this.dataObj).multipartUpload(fileNames, file.file).then(result => {
                //下面是如果对返回结果再进行处理，根据项目需要
               //console.log(result)
               //console.log(this.dialogImageUrl);
               console.log(result.name);
               var connectedUrl="http://jiyan2020.oss-cn-beijing.aliyuncs.com/"+result.name;
               console.log(connectedUrl);

                this.$axios({
                    method: 'put',
                    url: 'http://180.76.234.230:8080/user',
                    data:{
                        avatar:connectedUrl
                    }
                }).then((response) => {
                    console.log(response);
                    this.$store.state.user.avatar=connectedUrl;
                    this.avatarUrl=connectedUrl;
                }).catch(() => {
                    alert("修改信息接口异常");
                });
               self.$message({
                   message: '上传成功',
                   type: 'success'
               });
           }).catch(err => {
               self.$message.error('上传失败');
               console.log(err);
            })
            
        }
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
        height:660px;
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
    .UserAvatarEditor{
        cursor:pointer;
        position:absolute;
        left:0;
        z-index:1;
    }
    .UserAvatar{
        display:inline-block;
        overflow:hidden;
        vertical-align:top;
        background-color:#fff;
        border:4px solid #fff;
        border-radius:8px;
    }
    .avatar{
    }
    .ProfileHeader-content{
        padding-top:32px;
        padding-left:32px;
        border-left:164px solid transparent;
    }



     .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>
