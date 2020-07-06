<template>
  <div>
    <header_></header_>

    <div class="form__style">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="课程代码" prop="courseId">
          <el-input v-model="ruleForm.courseId"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="ruleForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="学历层次" prop="level">
          <el-select v-model="ruleForm.level" value="">
            <el-option label="本科" value="undergraduate"></el-option>
            <el-option label="硕士" value="postgraduate"></el-option>
            <el-option label="博士" value="phd"></el-option>
          </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="开课院系" prop="department">
          <el-input v-model="ruleForm.department"></el-input>
        </el-form-item>
        <el-form-item label="课程性质" prop="kind">
          <el-select v-model="ruleForm.kind" value="">
            <el-option label="必修" value="compulsory"></el-option>
            <el-option label="选修" value="elective"></el-option>
            <el-option label="重修" value="rebuild"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任课教师" prop="teacher">
          <el-input v-model="ruleForm.teacher"></el-input>
        </el-form-item>
        <el-button class="form__button" type="primary" @click="submitForm('ruleForm')">查询</el-button>
      </el-form>
    </div>

    <div class="course_info">
      <el-row :gutter="24" v-for="(item,key) of course_item" :key="key">
          <el-col :span="5" v-for="(_item,index) of item" :key="index" :offset="index>0?2:1">
            <el-card class="course_container" :body-style="{ padding: '0px' }">
              <div class="course_image" :class="card_dynamic_bkg[key*3 + index]" @click="toDetail(course_list[key*3 + index].courseId)">
                <img src="../assets/more.png" alt="">
              </div>
              <br/>
              <div class="container_span" :class="card_dynamic[key*3 + index]" @click="toDetail(course_list[key*3 + index].courseId)">
                <span>{{ course_list[key*3 + index].courseName }}</span>
                <span>{{ course_list[key*3 + index].courseId }}</span>
              </div>
              <div class="container_span_2">
                <span>{{ course_list[key*3 + index].courseName }}
                  <span>{{ course_list[key*3 + index].courseId }}</span>
                </span>
                <br/>
                <span style="font-size:14px;">2019-2020</span>
              </div>
              <div class="span_icon">
                <span @click="toComment(course_list[key*3 + index].courseId)"><i class="el-icon-edit-outline"></i>课程评价</span>
              </div>
            </el-card>
          </el-col>
      </el-row>
      <el-row>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="6"
            layout="prev, pager, next, jumper"
            :total="total_len"></el-pagination>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  import header_ from '../components/header'

  export default {
    name: 'CourseInfo',

    computed: {
      course_item() {
        let items = [];
        this.course_list.forEach((i, key) => {
          let item = Math.floor(key/3);
          if(!items[item]) {
            items[item] = []
          }
          items[item].push(item);
        });
        return items;
      }
    },

    data () {
      return {
        ruleForm: {
          courseId: '',
          courseName: '',
          level: '',
          department: '',
          kind: '',
          teacher: ''
        },
        course_list: [],
        course_len:0,
        rules: {
          courseName: [
            // { required: true, trigger: 'blur' }
          ]
        },
        currentPage: 0,
        total_len: 0,
        card_dynamic: [],
        card_dynamic_bkg: []
      }
    },

    components: {
      header_
    },

    created: function() {
      this.get_course_all();
      this.getTopicById();
      this.get_total_len();
    },

    mounted: function() {
      setTimeout(() => {
        this.random_color();
      }, 1000);
    },

    methods: {
      handleCurrentChange(val){
        this.$axios({
          method: 'post',
          url: '/course/matchAll',
          headers: {},
          data: {
            academy: this.ruleForm.department,
            courseId: this.ruleForm.courseId,
            courseName: this.ruleForm.courseName,
            ownerName: this.ruleForm.teacher,
            offset: (val-1)*6,
            limit: 6
          }
        }).then((response) => {
          console.log(response);
          this.course_list = response.data.result;
          this.course_len = response.data.result.length;
        }).catch(() => {
          alert("无法获取课程信息，请刷新重试");
        })
      },
      get_total_len: function(){
        this.$axios({
          method: 'get',
          url: '/course/all',
        }).then((response) => {
          this.total_len = response.data.length;
        }).catch(() => {
          alert("无法获取课程信息，请刷新重试");
        })
      },
      get_course_all: function() {
        this.$axios({
          method: 'post',
          url: '/course/matchAll',
          headers: {},
          data: {
            offset: 0,
            limit: 6
          }
        }).then((response) => {
          this.course_list = response.data.result;
          this.course_len = response.data.result.length;
        }).catch(() => {
          alert("无法获取课程信息，请刷新重试");
        })
      },

      random_color: function() {
        for(let i = 0; i < this.course_len; i++){
          this.card_dynamic.push('card' + i);
          this.card_dynamic_bkg.push('card_bkg' + i);
        }
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.$axios({
              method: 'post',
              url: '/course/matchAll',
              data: {
                academy: this.ruleForm.department,
                courseId: this.ruleForm.courseId,
                courseName: this.ruleForm.courseName,
                ownerName: this.ruleForm.teacher,
                offset: 0,
                limit: this.total_len
              }
            }).then((response) => {
              this.total_len = response.data.result.length;
              this.course_list = response.data.result;
            }).catch(() => {
              alert("接口异常，请更换搜索条件")
            })
          }else {
            alert("请输入任意条件");
            return false;
          }
        });
      },
      getTopicById(){
            var userId=this.$store.state.user.userId;
            axios({
                method: 'post',
                url: 'http://180.76.234.230:8080/topic/all',
                data: { "ownerId":userId, "offset":0,"limit":10 }
            }).then((response) => {
                // console.log(response.data.result);
                this.$store.state.topic_detail = response.data;
            });

            axios({
                method: 'get',
                url: 'http://180.76.234.230:8080/topicComment/all',
            }).then((response) => {
                // console.log(response.data);
                this.$store.state.review_detail = response.data;
            });
        },

      toDetail(courseId){
        this.$store.state.courseId = courseId;
        this.$router.push({
            path: `/course_detail/${courseId}`
          })
      },

      toComment(courseId){
        this.$router.push({
          path: `/comment/${courseId}`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .form__style {
    margin-top: 30px;
  }
  .form__style /deep/ .el-input__inner{
    border-radius: 0;
    height: 30px;
    width: 150px;
    border-color: #7f7f7f;
  }
  .form__button{
    background-color: #a7a7a7;
    height: 30px;
    margin-left: 30px;
    margin-top: 5px;
    border-color: #7f7f7f;
    vertical-align: middle;
    text-align: center;
    line-height: 5px;
  }
  .form__button:hover{
    background-color: #d9d9d9;
    border-color: #7f7f7f;
  }
  .course_container {
    width: 330px;
  }
  .course_info {
    width: 100%;
    margin: 0 auto;
  }
  .el-row {
    margin-top: 30px;
  }
  .course_image {
    width: 100%;
    height: 150px;
    display: block;
    background-color: #2b3580;
    img {
      float: right;
      margin-top: 10px;
      width: 30px;
      height: 30px;
      color: white;
    }
    img:hover{
      cursor: pointer;
    }
  }
  .course_image:hover{
    cursor: pointer;
  }
  .container_span {
    width: 90%;
    margin: 0 auto;
    span {
      font-weight: bolder;
    }
    span:hover{
      cursor: pointer;
    }
  }
  .container_span_2 {
    width: 90%;
    margin: 0 auto;
    span {
      color: #b4b4b4;
      font-size: 16px;
      display: inline;
    }
  }
  .span_icon {
    width: 90%;
    margin: 0 auto;
    height: 40px;
    padding-top: 10px;
    span {
      margin-right: 40px;
    }
    span:hover{
      cursor: pointer;
      color: #409EFF;
    }
  }
  .card0{
    color: #2b3580;
  }
  .card_bkg0{
    background-color: #2b3580;
  }
  .card1{
    color: #e24868;
  }
  .card_bkg1{
    background-color: #e24868;
  }
  .card2{
    color: darkslategray;
  }
  .card_bkg2{
    background-color: darkslategray;
  }
  .card3{
    color: #7f7f7f;
  }
  .card_bkg3{
    background-color: #7f7f7f;
  }
  .card4{
    color: antiquewhite;
  }
  .card_bkg4{
    background-color: antiquewhite;
  }
  .card5{
    color: #409EFF;
  }
  .card_bkg5{
    background-color: #409EFF;
  }
  .block{
    width: 30%;
    margin: 0 auto;
    height: 100px;
  }

</style>
