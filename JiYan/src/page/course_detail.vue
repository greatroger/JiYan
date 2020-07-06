<template>
<body class="course_detail">
    <header_></header_>

    <div class="course">
        <div class="course_info">
            <div class="course_name">{{this.courseName}} {{this.courseId}}</div>
            <div style="display: flex; height: 300px">
                <div class="course_picture"></div>
                <div style="flex:1;"></div>
                <div style="display: flex; width: 350px; flex-direction: column;">
                    <div class="course_teacher">任课老师：{{this.ownerName}}</div>
                    <div class="course_college">开课院系：{{this.academy}}</div>
                </div>
            </div>
        </div>
        <div class="divide"></div>
        <div style="flex:1;"></div>
        <div class="course_score">
            <div style="height: 50px; margin-top: 120px;font-size: 20px;color: gray;">综合评分</div>
            <div class="course_num">{{this.score}}</div>
            <div class="course_star">
                <el-rate
                v-model="value"
                disabled
                >
                </el-rate>
            </div>
            <div style="display: flex; height:50px;">
                <el-button type="primary" @click=toComment(courseId)>发表评价</el-button>
                <div style="display: flex; flex-direction: column" >
                    <img class="dianzan" src="../assets/dianzan.png">
                    <div style="font-size: 3px; margin-left: 32px;text-align:center">{{this.likes}}</div>
                </div>
            </div>
        </div>
    </div>


    <div class="evaluate">
        <div style="font-size: 20px; color: gray;">{{this.commentsNum}}个评价</div>
        <el-row :span="1" v-for="(item,index) in commentList" :key="index" :offset="1">
            <el-card  shadow="hover" :class="bkg[index%2]">
                <div class="evaluate_content" >
                <div style="width: 300px;display: flex;flex-direction: column;">
                    <div style="display: flex;">
                    <div style="font-size: 20px; margin-top: 20px; margin-left: 20px;">综合评分：</div>
                    <div style="margin-top: 24px;">
                    <el-rate
                    v-model="item.score"
                    disabled
                    >
                    </el-rate>
                    </div>
                    </div>
                    <div style="font-size: 20px; margin-top: 20px; margin-left: 20px;">{{commentUser[index].nickname}}</div>
                    <img v-bind:src="commentUser[index].avatar" class="picture"/>
                </div>
            <div style="display: flex;flex-direction: column;width:510px;margin-left:20px">
                <div style="font-size: 20px; margin-top: 20px;">评价：</div>
                <div style="font-size: 20px; ">{{item.text}}</div>
            </div>
            <div style="font-size: 20px; margin-top: 20px;">{{timestampToTime(item.created)}}</div>
        </div>
            </el-card>
        </el-row>
    </div>

    <div style="height:20px;"></div>
</body>
</template>

<script>
    import header_ from '../components/main_banner'

    export default {
    data() {
            return {
                value: 4.7,
                courseId: 0,
                courseName: '',
                commentsNum:'',
                academy:'',
                likes:'',
                ownerName:'',
                score:'',
                commentList:[],
                bkg:[],
                commentUser:[],
                }
    },
    components: {
        header_,
    },
    created: function(){
        this.courseId = this.$store.state.courseId;
        console.log(this.courseId)
        this.get_all_comments(this.courseId);
        this.get_courseInfo(this.courseId);
        this.bkg[0] = "card0";
        this.bkg[1] = "card1";
    },
    methods:{
        get_user: function(userId) {
            this.$axios({
            method: 'get',
            url: '/user/selectOne?userId=' + this.userId,
            headers: {},
            params: {},
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            alert(error);
        })
        },
        get_all_comments: function(courseId) {
            this.$axios({
            method: 'post',
            url: '/courseComment/allComments',
            headers: {},
            params: {},
            data:{
                courseId: this.courseId,
            }
        }).then((response) => {
            console.log(response.data.result);
            this.commentsNum = response.data.result.length;
            this.commentList = response.data.result;
            for(var i=0; i<this.commentsNum ; i++)
            {
                var id = this.commentList[i].authorId;
                this.$axios({
                method: 'get',
                url: '/user/selectOne?userId=' + id,
                headers: {},
                params: {},
                }).then((response) => {
                this.commentUser.push(response.data)
                console.log(this.commentUser)
                }).catch((error) => {
                alert(error);
                })
            }
            }).catch((error) => {
            alert(error);
            })
        },
        get_courseInfo: function(courseId) {
            this.$axios({
            method: 'get',
            url: '/course/selectOne?courseId=' + this.courseId,
            headers: {},
            params: {},
        }).then((response) => {
            console.log(response);
            this.academy = response.data.academy;
            this.courseName = response.data.courseName;
            this.likes = response.data.likes;
            this.ownerName = response.data.ownerName;
            this.score = response.data.score;
            this.value = this.score;
        }).catch((error) => {
            alert(error);
        })
        },

        timestampToTime: function(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        // let Y = date.getFullYear() + '-';
        // let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        // let D = date.getDate() + ' ';
        // let h = date.getHours() + ':';
        // let m = date.getMinutes() + ':';
        // let s = date.getSeconds();
        // return Y+this.padLeftZero(M)+this.padLeftZero(D)+this.padLeftZero(h)+this.padLeftZero(m)+this.padLeftZero(s);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },

    toComment(courseId){
        this.$router.push({
          path: `/comment/${courseId}`
        })
    }
    }
}
</script>

<style scoped>
.element.style{
    text-align: center;
}

.el-button--primary {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    height: 35px;
    width: 80px;
}

.el-button{
    line-height: 0;
    padding: 0 0;
}

body::before{
	content: ' ';
	position: fixed;
	z-index: -1;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: #afcae887;
	background-size: 100% auto;
    align-items:center;
}


.bar{
    display: flex;
    align-items:center;
    width: 100%;
    height: 50px;
    background-color: #0650a5;
    color: #ffffff;
    font-size: 20px;
}

.logo{
    width: 200px;
    height: 50px;
    position: absolute;
}


.user_img{
    width: 30px;
    margin-left: 92px;
}

.course{
    display: flex;
    width: 900px;
    height: 400px;
    position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        margin-top: 80px;

}

.course_info{

    width: 600px;
    display: flex;
    flex-direction: column;
}
.course_name{
    height: 100px;
    font-size: 30px;
    line-height: 100px;
}
.course_picture{
    background-color: #ffffff;
    width: 200px;
}
.course_teacher{
    height: 50px;
    font-size: 20px;
    line-height: 50px;
}
.course_college{
    height: 50px;
    font-size: 20px;
    line-height: 50px;
}
.course_information{
    height: 200px;
    font-size: 20px;
}

.divide{
    background-color: #707477;
    width: 1px;
    height: 300px;
    margin-top: 70px;
}
.course_score{
    width: 250px;
    display: flex;
    flex-direction: column;
}
.course_num{
    height: 150px;
    font-size: 55px;
}
.course_star{
    height: 100px;
    margin-top: -64px;
}
.dianzan{
    width: 23px;
    margin-left: 30px;
}
.evaluate{
    display: flex;
    flex-direction: column;
    width: 900px;
    position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        margin-top: 450px;
}
.evaluate_content{
    width: 900px;
    height: 300px;
    display: flex;
}
.card0{

}
.card1{
    background-color: #4243444a;
}

.picture{
    width: 64px;
    margin-left: 36px;
}
</style>
