<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
    <el-button @click="submitContent()">提交</el-button>
  </div>
</template>

<script>
import E from "wangeditor";
import plupload from "plupload";
import axios from 'axios'
import {UPLOADER} from '../oss/oss_utils.js'
export default {
    name:'editor',
    data() {
        return {
        editor: null,
        editorContent: '',
        //UPLOADER,
        };
    },
    // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
    //props: ['catchData'], // 接收父组件的方法
    mounted() {
        this.editor = new E(this.$refs.editorElem);
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.customConfig.onchange = html => {
            this.editorContent = html;
            //this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
        };
        this.editor.customConfig.uploadImgHeaders={};
        this.editor.customConfig.uploadFileName='myFileName';
        this.editor.customConfig.uploadImgServer='http://180.76.234.230:8080/saveImg';
        //下面的几句最初是用于wangeditor直传oss的，但没有调通
        //this.editor.customConfig.uploadImgShowBase64 = true;
        //this.editor.customConfig.customUploadInit=UPLOADER(this.editor);
        //console.log(this.editor.customConfig.customUploadInit);
        this.editor.customConfig.uploadImgMaxSize = 20 * 1024 * 1024;//设置图片大小为20M
        this.editor.customConfig.uploadImgMaxLength=9;
        this.editor.customConfig.uploadImgTimeout = 3*60*1000; //图片上传超时限制
        this.editor.withCredentials=true;
        this.editor.customConfig.debug = true;




        
        this.editor.customConfig.menus = [
            // 菜单配置
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            'table', // 表格
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ];
        this.editor.create(); // 创建富文本实例
    },
    methods:{
        submitContent(){
            axios({
            method: 'post',
            url: 'http://180.76.234.230:8080/courseComment',
            data: { courseId: 3056501, ownerId: "123456", text: this.editorContent,score: 3.9 }
             }).then((response) => {
                    console.log(response);
            });
        }
    }
}
</script>


<style lang="less" scoped>
</style>

