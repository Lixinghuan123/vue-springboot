<template>
    <div class="good-form">
        <el-page-header @back="$router.back()" content="添加商品">
        </el-page-header>
        <!--//再一个组件上写ref就是为了获取组件实例
        //model是为了绑定数据ruleform
        rules指定校验规则
    -->
    <el-form ref="form" :model="ruleform" :rules="rules" label-width="80px" style="width:520px;">
        <!--prop中的name是指rule中的name-->
        <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleform.name"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="desc">
            <el-input v-model="ruleform.desc"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="cate">
            <CateSelect v-model="ruleform.cate"></CateSelect>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input-number v-model="ruleform.price" :precision="2" :step="1" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="是否热销" prop="hot">
            <el-switch v-model="ruleform.hot">
            </el-switch>
          </el-form-item>
          <el-form-item label="商品图片" >
           <ImgUpload v-model="ruleform.img"></ImgUpload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
    </el-form>
    </div>
</template>
<script>
    import CateSelect from "./components/CateSelect.vue"
    import ImgUpload from "./components/ImgUpload.vue"
    import {submitGood} from "@/api/goods"
    export default{
        name:"goodForm",
        props:[],
        components:{
            CateSelect,
            ImgUpload
        },
        data(){
            return {
                ruleform:{
                    name:"",
                    desc:"",
                    price:0,
                    hot:true,
                    img:"",
                    cate:"",

                },
                rules:{
                    name: [
                        //required: true表示必填项
                        //message提示信息  trigger: 'blur'表示失去焦点时显示提示
                            { required: true, message: '请输入商品名称', trigger: 'blur' },
                            //pattern:/[\u4e00-\u9fa5]{4,8}/为自定义校验规则
                            {pattern:/[\u4e00-\u9fa5]{4,8}/, message: '长度在 4到 8 个中文字符', trigger: 'blur' }
                        ],
                        desc:[
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 20, max: 30, message: '长度在 20 到 30 个字符', trigger: 'blur' }
                        ],
                        cate: [
                        { required: true, message: '请选择商品品类', trigger: 'change' },
                        ],
                        price: [
                        { required: true, message: '请选择商品价格', trigger: 'change' },
                        ],

                }
                    

                

            };
        },
        methods:{
            submitForm(formName) {//这个地方有什么必要传入formName
              this.$refs.form.validate((valid) => {
                if (valid) {
                 // alert('submit!');
                  let data={...this.ruleform};
                  submitGood(data).then(res=>{
                    //console.log(res);
                    if(res.data.info){
                      this.$message({
                        message:`恭喜你，提交成功`,
                        type:"success",
                        duration:1500, //持续多少秒
                        onClose:()=>{
                          this.$router.back();//返回上一页面

                        }
                      })
                    }
                  })

                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            },
            resetForm(formName) {
              this.$refs[formName].resetFields();
            }
              },
    };
</script>
<style lang="scss" scoped>
    .good-form{
        padding: 20px;
        box-sizing:border-box;
    }
</style>