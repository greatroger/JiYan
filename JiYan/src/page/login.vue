<template>
<body class="login">
    <div class="main" role="main">
        <div class="main_wrap">
            <div class="wrap">
                <h1>
                    <strong>统一身份认证</strong>
                </h1>
                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
<!--                    <p id="error" class="error"></p>-->
                  <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名" type="text" id="username" name="username" style="width: 130%; border-radius: 0"></el-input>
                  </el-form-item>
                  <br/><br/>
                  <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="口令" type="password" id="password" name="password" style="width: 130%; border-radius: 0"></el-input>
                  </el-form-item>
                  <p style="padding:2px 10px 0; "></p>
                  <p class="form_submit">
                      <button @click="postLogin('ruleForm')" type="button" style="display: block;text-align: center;color: #fff;font-size: 16px;background-color: #48c6e7;border: none;margin: 30px 0 0 0;padding: 11px 10px 12px;box-sizing: border-box;width: 100%;cursor: pointer;-webkit-appearance: none;text-decoration: none;user-select: none;white-space: pre;align-items: flex-start;">登录</button>
                  </p>
                  <p style="padding:11px 10px 12px; "></p>
                </el-form>
            </div>
        </div>
    </div>
</body>
</template>

<script>
import axios from 'axios'
export default {
    name:'login',
    data () {
      return {
        ruleForm: {
          username:'',
          password:'',
        },

        rules: {
          username: [
            { required: true, message: '请输入学号', trigger: 'blur'},
            { len: 7, message: '学号长度为7个数字', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods:{
        postLogin(name){
          this.$refs[name].validate((valid) => {
            if(valid) {
              axios({
                method: 'post',
                url: 'http://180.76.234.230:8080/login',
                data: {
                  name:this.ruleForm.username,
                  password:this.ruleForm.password
                }
              }).then((response) => {
                console.log(response);
                this.$store.state.user = response.data.result;
                console.log(this.$store.state.user);
                if(response.data.status === 404){
                  alert(response.data.msg);
                }else if(response.status === 200){
                  alert("登录成功");
                  this.$router.push({
                    path: `/courseInfo`
                  })
                }
              }).catch(() => {
                alert("接口异常，请重试");
              });
            }else{
              return false;
            }
          })

        }
    }
}


</script>

<style lang="less" scoped>
    body.login{
        margin:0;
        padding:0;
        background:url(../assets/login_background.jpg) no-repeat center
            center fixed;
        -webkit-background-size:cover;
        -moz-background-size:cover;
        -o-background-size:cover;
        background-size:cover;
        font-family:Arial,Helvetica,sans-serif;
    }
    @media only screen and (max-width:480px){
        div.main{
            position:static;
            top:0;
            margin:0;
        }
        div.main_warp{
            width:auto;
            margin:0;
        }
    }
    div.main{
        position:absolute;
        top:50%;
        left:0px;
        width:100%;
        margin:-265px auto 0 auto;
    }
    div.main_wrap {
        border: 12px solid rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        width: 318px;
        max-width: 100%;
        margin: 0 auto;
    }
    div.wrap{
        background:#414749 url(../assets/login_logo_250x76.png) no-repeat 28px 50px;
        height:500px;
        padding:0 25px;
    }
    div{
        display:block;
    }
    el-form{
        display: block;
        margin-top: 0em;
        margin-block-end: 1em;
    }
    h1 {
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        margin: 0;
        padding: 150px 0 40px 0;
        color: #fff;
        font-size: 22px;
        font-weight: 100;
    p.error {
        color: #cccccc;
        font-size: 13px;
        margin: 0;
        padding: 0 0 18px;
        padding-top: 0px;
        padding-right: 0px;
        padding-bottom: 18px;
        padding-left: 0px;
    }
    p {
        margin: 0;
        padding: 0;
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    button{
        display: block;
        text-align: center;
        color: #fff;
        font-size: 16px;
        background-color: #48c6e7;
        border: none;
        margin: 30px 0 0 0;
        padding: 11px 10px 12px;
        box-sizing: border-box;
        width: 100%;
        cursor: pointer;
        -webkit-appearance: none;
        text-decoration: none;
        user-select: none;
        white-space: pre;
        align-items: flex-start;
    }
    #password, #username {
        color: #000 !important;
        background-color: #f0ffff;
        font-size: 13px;
        line-height: 20px;
        margin: 0 0 3px 0;
        padding: 11px 10px 12px;
        width: 160%;
        box-sizing: border-box;
        border: none;
        border-radius: 0;
    }
    #Txtidcode {
        width: 180px;
    }
    #Txtidcode {
        color: #000 !important;
        background-color: #f0ffff;
        font-size: 13px;
        line-height: 20px;
        margin: 0 0 3px 0;
        padding: 11px 10px 12px;
        box-sizing: border-box;
        border: none;
        border-radius: 0;
    }
    #idcode {
        color: #000 !important;
        font-size: 13px;
        line-height: 20px;
        margin: 0 0 3px 18px;
        box-sizing: border-box;
        border: none;
        border-radius: 0;
    }

}
</style>
