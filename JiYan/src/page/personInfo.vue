<template>
<div class="main">
    <header_></header_>
    <el-row>
        <el-col :span="18" :offset="3">
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
                                <!--这边需要换成动态的！！！！！-->
                                <img class="Avatar Avatar--large UserAvatar-inner" width="160" height="160"
                                    src="../assets/user.png" >
                            </div>
                        </div>
                        <div class="ProfileHeader-content">
                            <div class="ProfileHeader-contentHead">
                                <h5 class="ProfileHeader-title">
                                    <span class="ProfileHeader-name">
                                        {{this.$route.params.name}}
                                    </span>
                                    <span class="ztext ProfileHeader-headline">
                                    </span>
                                </h5>
                            </div>
                            <div class="ProfileHeader-contentBody" style="overflow: hidden; transition: height 300ms ease-out 0s; height: 43px;">
                            <div>
                                <div class="ProfileHeader-detail">
                                    <div class="ProfileHeader-detailItem">
                                        <span class="ProfileHeader-detailLabel">
                                            ?????
                                        </span>
                                        <div class="ProfileHeader-detailValue">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="18" :offset="3">
            <div style="min-height:600px;display:block;">
                <el-tabs type="border-card" v-model="activeTab">
                <!--TODO:这边要动态得到某用户所有回答和提问！！！-->
                <el-tab-pane label="提问" name="1">

                </el-tab-pane>
                <el-tab-pane label="回答" name="0">

                </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import header_ from '../components/main_header'
export default {
    name:'personInfo',
    data(){
        return {
            activeTab:"1"
        };
    },
    methods:{
        handleSelect(key,keyPath){
            console.log(key,keyPath);
        }
    },
    components:{
        header_
    },
    mounted(){
        console.log("userId  "+this.$route.params.userId);
        this.activeTab=this.$route.params.offset;
        console.log("offset  "+this.$route.params.offset);
    }
}
</script>

<style lang="less" scoped>
    .main{
        background-color: #e8e8e8;
    }
    .card{
        background:#fff;
        overflow:hidden;
        border-radius:2px;
        box-shadow:0 1px 3px rgba(26,26,26,.1);
        box-sizing:border-box;
        display:block;
        height:260px;
    }
    .card .div{
        display:block;
    }
    .UserCoverEditor{
        position:relative;
    }
    .UserCover--colorBlock{
        height:132px;
        background:#aaa;
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
        cursor:pointer;
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
</style>
