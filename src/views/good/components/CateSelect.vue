<template>
    <!-- 数据改变的时候就会触发change事件，并触发父组件的input事件，event就是你的选择项数据 -->
        <el-select :clearable="clearable" placeholder="请选择" :value="value" @change="$emit('input',$event)">
            <el-option v-for="item in cates" :key="item._id" :label="item.cate_zh" :value="item.cate">
            </el-option>
          </el-select>

</template>
<script>
    import { mapActions,mapState} from "vuex"
    export default{
        name:"goodForm",
        props:{
            value:{
                type:String,
                default:""
            },
            clearable:{
                type:Boolean,
                default:false//这样就可以表示父组件有值传递时，为true，有清除功能，否则默认false
            }
        },
        data(){
            return {
          

            };
        },
        created(){
            this.getCates();
        },
        computed:{
            ...mapState("goods",["cates"])
            //goods模块下有个cates数据
        },
        methods:{
            ...mapActions("goods",["getCates"])
        },
    };
</script>
<style lang="less" scoped></style>