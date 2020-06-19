<template>
  <div class="tongji">
    <header_></header_>
    <div> 
      <br>
      <div>
        <el-col :span="20">
          <el-autocomplete
          class="inline-input"
          :fetch-suggestions="querySearch"
          placeholder="请输入课程名称"
          @select="handleSelect"
        ></el-autocomplete>
        </el-col>
      </div>
      <br>
      <br>
      <div class="whole">
      <br>
      <h2><center>{{title}}</center></h2>
      <el-table
          :data="listData"
          border
          :span-method="objectSpanMethod"
          class="tableArea"
          style="width: 90%">
          
          <el-table-column
            prop="scoreItem"
            label="评分项目"
            align="center"
            width="250"
            />
          <el-table-column
            prop="scoreContent"
            label="评价内容"
            align="left"
            width="650"
            />
          <el-table-column
            label="测试">
            <template slot-scope="scope2">
              <el-button @click="printIndex(scope2.$index)">查看Index</el-button>
            </template>
          </el-table-column >
          <el-table-column
            label="打分">
            <template slot-scope="scope">
              <el-slider
                v-model="dafen[scope.$index]"
                :step="10">
              </el-slider>
            </template>
          </el-table-column >
      </el-table>
      </div>
      <br>
      <br>
      <p align='left'>&emsp;&emsp;备注（任课教师在授课方面的优点或特色）：</p>
      <el-input v-model="input1" placeholder="请输入内容"></el-input>
      <p align='left'>&emsp;&emsp;备注（任课教师令我不满意的地方）：</p>
      <el-input v-model="input2" placeholder="请输入内容"></el-input>
      </div>
      <br>
      <br>
      <br>
      <div style="text-align:center"> 
        <el-button type="primary" round @click="postScore">提交</el-button>
      </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import header_ from '../components/header'

    export default {
      name: 'myNeedDeal',
  data() {
    return {
      dafen:[],
      input1: '', //备注1
      input2: '', //备注2
      spanArr: [],
      position: 0,
      listData: [],
      courses:[],
      title:"XXX课程评价（课程代码：xxx  |  任课教师：xxx  |  开课学院：xxx）"
    }
  },
 
  methods: {
    querySearch(queryString, cb) {
        var courses_ = this.courses;
        var courseList=[];
        for (let i in courses_){
            courseList.push({
              value : courses_[i].courseName
            })
        }
        var results = queryString ? courseList.filter(this.createFilter(queryString)) : courseList;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
        return (course) => {
          return (course.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
  	queryData(){//查询操作
  		this.listData = [
  		  {
          scoreItem: "教学内容",
          scoreContent: "知识与能力要求符合学生实际",        
        },
        {
          scoreItem: "教学内容",
          scoreContent: "知识与能力要求与课程相关度高",   
        },
        {
          scoreItem: "教学内容",
          scoreContent: "知识讲授正确，具有科学性和系统性",          
        },
        {
          scoreItem: "教学内容",
          scoreContent: "知识容量和密度适中，深浅有度，重点突出",        
        },
        {
          scoreItem: "教学过程",
          scoreContent: "教学日程安排合理，没有平时讲课松懈，期末赶进度，飞速讲课的情况",      
        },
        {
          scoreItem: "教学过程",
          scoreContent: "教学环节安排合理，知识衔接自然",    
        },
        {
          scoreItem: "教学过程",
          scoreContent: "注重理论与实践相结合，学生能切实体会理论的价值",  
        },
        {
          scoreItem: "教学过程",
          scoreContent: "课堂信息反馈及时，处理问题应变能力强",     
        },
        {
          scoreItem: "教师素质",
          scoreContent: "教态自然，语言表述清晰，富有感染力，仪表端庄大方",       
        },
        {
          scoreItem: "教师素质",
          scoreContent: "不把私事带入到课堂教学中",      
        },
         {
          scoreItem: "教学结果",
          scoreContent: "课堂气氛活跃，学生积极主动参与学习的全过程",        
        },
        {
          scoreItem: "教学结果",
          scoreContent: "大多数学生能正确掌握知识，并能运用所学知识解决简单的实际问题",       
        },
  		];
		this.rowspan()
  	},
  	rowspan() {
  		this.listData.forEach((item,index) => {
	    	if( index === 0){
	    		this.spanArr.push(1);
	    		this.position = 0;
	    	}else{
	    		if(this.listData[index].scoreItem === this.listData[index-1].scoreItem ){
	    			this.spanArr[this.position] += 1;
	    			this.spanArr.push(0);
	    		}else{
	    			this.spanArr.push(1);
	    			this.position = index;
	    		}
	    	}
	    })
  	},
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
    	if (columnIndex === 0) {
    		const _row = this.spanArr[rowIndex];
    		const _col = _row>0 ? 1 : 0;
    		return {
    			rowspan: _row,
    			colspan: _col
    		}
        }
    },
    loadAllCourses(){
      axios
        .get('http://180.76.234.230:8080/course/all')
        .then(response => {
          var a=response.data;
          //console.log(a);
          // for (let i in a){
          //   console.log(a[i]);
          // }
          this.courses = response.data;})
    },
    handleSelect(item) {
        console.log(item.value);
        for (let i in this.courses){
            if (item.value==this.courses[i].courseName){
              console.log(i);
              this.title=this.courses[i].courseName+"课程评价（课程代码："+this.courses[i].courseId+"  |  任课教师："+this.courses[i].ownerName+"  |  开课学院："+this.courses[i].academy+"）";
            }
        }
    },
    postScore(){
      //平均得分
      var totalScore=0;
      for (var i=0;i<12;i++){     
        totalScore=totalScore+this.dafen[i];
      }
      var postScore=totalScore/240;
      postScore=postScore.toFixed(2);
      console.log(postScore);
      //其它数据
      var postText=this.input1+"&&"+input2;
      //发送post请求
      axios({
        method: 'post',
        url: 'http://180.76.234.230:8080/courseComment',
        data: { courseId: 3056501, ownerId: "123456", text: "非常好！！",score: 3.9 }
      }).then((response) => {
        console.log(response);
      });
    },
    printIndex(index){
      console.log(index)
    }
  },
  mounted() {
    this.queryData();
    this.courses=this.loadAllCourses();
    for (var i=0;i<12;i++){
      this.dafen[i]=70
    }
  },

  components: {
      header_
  },
}
</script>

<style scoped>
  .whole {
    background-color : rgb(201, 226, 252);
  }
  .tableArea {
    margin-left: 5%;
  }
</style>