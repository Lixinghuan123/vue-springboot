<template>
    <!-- action="https://jsonplaceholder.typicode.com/posts/"指定上传图片的接口 -->
    <!--  name="good"上传图片的名称，后端使用这个名称接受图片 -->
    <!--el-upload是element组件所以也存在跨域问题  -->
    <!-- multiple可以上传多张图片 drag表示可以拖拽上传-->
    <div>
    <el-upload
    
        class="upload-demo"
        drag
        name="good"
        action="/api/v1/element/upload/img"
        multiple
        :on-success="imgSuccess"
        >
        <template #trigger>
            <div v-if="value">
                <el-image :src="`http://47.94.210.129:9999${value}`"></el-image>
            </div>
            <div v-else>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </div>
        </template>
        <template #tip>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </template>  
    </el-upload>
</div>
</template>
<script>
    export default{
        name:"ImgUpload",
        props:{
            value:{
                type:String,
                default:""
            }
        },
        data(){
            return {

            };
        },
        methods:{
            imgSuccess(response){
                if(response&&response.data.img){
                    let img=response.data.img;//拿到图片路径
                    this.$emit("input",img);//子传父组件，需要父组件有input事件,自动触发父组件的input事件
                }

            }
        },
    };
</script>
<style lang="scss" scoped></style>