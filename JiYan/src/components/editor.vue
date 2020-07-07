<template>
  <div id="editor">
    <div class="editor">
      <div ref="toolbar" class="toolbar"></div>
      <div ref="editor" class="text"></div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
    name:'editor',
    data() {
      return {
      editor: null,
      info_: null
      };
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isClear(val){
        if(val){
          this.editor.txt.clear();
          this.info_ = null;
        }
      },
      value: function(value){
        if(value !== this.editor.txt.html()){
          this.editor.txt.html(this.value);
        }
      }
    },
    mounted() {
        this.set_editor();
        this.editor.txt.html(this.value);
    },
    methods:{

      set_editor(){
        this.editor = new E(this.$refs.toolbar, this.$refs.editor);
        // this.editor.customConfig.uploadImgShowBase64 = true;
        this.editor.customConfig.uploadImgServer = 'http://180.76.234.230:8080/saveImg';
        this.editor.customConfig.uploadImgHeaders = {};
        this.editor.customConfig.uploadFileName = 'myFileName';
        this.editor.customConfig.uploadImgMaxSize = 20 * 1024 * 1024;
        this.editor.customConfig.uploadImgMaxLength = 6;
        this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000;
        // this.editor.withCredentials=true;
        // this.editor.customConfig.debug = true;
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

        this.editor.customConfig.uploadImgHooks = {
          fail: (xhr, editor, result) => {
            // 插入图片失败回调
            alert("上传图片失败");
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
            alert("上传图片成功");
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
            alert("上传图片超时");
          },
          error: (xhr, editor) => {
            // 图片上传错误回调
            alert("图片上传错误");
          },
          customInsert: (insertImg, result, editor) => {
            // 图片上传成功，插入图片的回调
            for(let i = 0; i < result.data.length; i++){
              let url = result.data[i];
              insertImg(url);
            }
          }
        };

        this.editor.customConfig.onchange = (html) => {
          this.info_ = html;
          this.$emit('change', this.info_)
        };

        this.editor.create()
      },
    }
}
</script>


<style lang="less" scoped>
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
  }
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    min-height: 500px;
  }
</style>

