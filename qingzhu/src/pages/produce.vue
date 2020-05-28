<template>
  <div class="inner">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>所有产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table">
       <table border="1" cellspacing="0">
         <tr>
           <th>品牌</th>
           <td>
             <a href="#">无印</a>
             <a href="#">博朗</a>
             <a href="#">花印</a>
           </td>
         </tr>
          <tr>
           <th>类别</th>
           <td>
             <a href="#" v-for="item in sort" :key="item._id" @click="tosort(item._id)">{{item.typename}}</a>
            
           </td>
         </tr>
       </table>
    </div>
    <div class="sort">
      <div class="paddingTop">排序：</div>   
      <div class="box" @click="sale">
        <span class="iconfont icon-xiaoliangpaixu"></span>
        销量
      </div>
      <div class="box" @click="price">
        <span class="iconfont icon-qian"></span>
        价格
        <span class="iconfont icon-iconset0414"></span>
      </div>
      <div class="box" @click="time">
        上架时间
        <span class="iconfont icon-shijian"></span>
      </div>
      <div class="paddingTop">
        <el-switch
         v-model="value1"
         inactive-text="仅显示有货">
        </el-switch>
      </div>

    </div>
    <div class="list">
     
      <index-Item v-for="item in produce" :key="item._id" :item="item"></index-Item>
    </div>
  </div>
</template>
<script>
import indexItem from "../components/indexItem";
import { mapGetters } from "vuex";
import API from "../util/API"
export default {
  components: {
    indexItem
  },
  data(){
    return{
       sort:[],
       value1:""
    }
  },
  mounted() {
    this.$store.dispatch("addProduce");

    this.$axios({
      url: API.type,
    }).then(res=>{
      this.sort=res.data
    })
   
  },
 watch:{
  $route(to,from){
    console.log(this.$route.query);
    this.$store.dispatch("sort",this.$route.query.id)

  }
},
  methods:{
    sale(){
      this.produce.sort((a,b)=>{
         return b.num-a.num
      })
    },
    price(){
      this.produce.sort((a,b)=>{
        return a.price-b.price
      })
    },
    time(){
       this.produce.sort((a,b)=>{
        return a.time-b.time
      })
    },
    tosort(id){
     this.$store.dispatch("sort",id)
    }
  },
  computed: {
    ...mapGetters(["produce"])
  }
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.nav {
  margin-top: 40px;
  height: 50px;
  border-bottom: 1px solid #eee;
}

.el-breadcrumb {
  font-size: 18px;
}
table{
  border-color:#eee 
  width: 100%
  margin: 30px 0;
 
}
table tr{
   height: 60px;
  
}
table tr td{
  padding-left: 20px; 
}
table a{
  margin-right: 20px;
}
.sort{
  overflow hidden;
  height 80px;

}
.sort div{
  float: left;
}
.box{
  border: 1px solid black;
  padding: 5px 10px;
  margin-right: 5px;
}
.paddingTop{
  padding-top: 5px;
}

</style>