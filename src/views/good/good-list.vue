<template>
  <div class="good-list" style="margin: 20px;">
    <el-row>
      <el-col :span="24">
        
        <el-input placeholder="请输入内容" v-model.trim="name" style="width: 135px;"></el-input>
        <CateSelect clearable v-model="cate"></CateSelect>
        <!-- clearable 默认 为true，如果不想用这个功能让他等于false就行了，这里clearable相当于一个变量，子组件接受这个变量值-->
        <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="$router.push('/good/add')">添加</el-button>
        <el-button type="primary" icon="el-icon-download">访问</el-button>
        <el-checkbox style="margin-left:20px">审核人</el-checkbox>
      </el-col>
    </el-row>
    <!--data="list"指定数据源-->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="id" label="序号" align="center">
        <template slot-scope="{row,$index}">
          <div>{{$index+1}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" align="center">
        <template slot-scope="{row,$index}">
          <img src="`http://47.94.210.129:9999${row.img}`" alt="">
          <div>{{row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center">
        <template slot-scope="{row,$index}">
          <div>{{ `¥${row.price.toFixed(2)}` }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="cate" label="品类" align="center">
        <template slot-scope="{row,$index}">
          <div>{{ row.cate }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="hot" label="是否热销" align="center">
        <template slot-scope="{row,$index}">
          <div>{{ row.hot ? '是':'否' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="发布时间" align="center">
        <template slot-scope="{row,$index}">
          <div>{{ row.create_time }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="check_status" label="商品状态" align="center">
        <template slot-scope="{row,$index}">
          <div>{{ row.check_status?'已上架':'待审核' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button v-if="row.published" type="primary" size=" mini">详情</el-button>
          <el-button v-else type="success" size="mini">审核</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:  20px;" :current-page="page" :page-sizes="[2, 5, 10, 20]" :page-size="size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import CateSelect from "./components/CateSelect.vue"
  import {getGoodList} from "@/api/goods"
  export default {
    name: "goodList",
    components:{
      CateSelect
    },
     props: [], 
     data() {
      return {
        list: [],//显示页面的数据源
        page:1,//第几页
        size:36,//一页几条数据
        total:0,//前端要实现分页必须知道总记录数
        name: "",//用来搜索时模糊查询
        cate: "",//用来筛选分类
      };
    }, 
    created(){
      this.getList();
    },
    methods: {
      
      getList(){
          let params={
          page:this.page,
          size:this.size,
          cate:this.cate,
          name:this.name
        }
        getGoodList(params).then(res=>{
          console.log("res",res);
          if(res.data && res.data.list){
            this.list=res.data.list;
            this.total=res.data.total;
          }
        })

      }
    },
  }; 
  </script>
<style lang="scss">
  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>