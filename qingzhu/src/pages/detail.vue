<template>
  <div class="inner" v-if="json">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>所有产品</el-breadcrumb-item>
        <el-breadcrumb-item>{{json.goodsname}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="inner1">
      <div class="left">
        <img :src="json.goodspic" alt />
       
      </div>

      <div class="right">
        <h3>{{json.goodsname}}</h3>
        <p class="info">{{json.desc}}</p>
        <div class="price">
          <span>售价：</span>
          <i>{{json.price}}</i>
        </div>

        <div class="num">
          <p>选择数量</p>
          <el-button-group>
            <!-- <el-button type="info">-</el-button> -->
            <el-button>{{num}}</el-button>
            <!-- <el-button type="info">+</el-button> -->
          </el-button-group>
          <span>(库存{{json.num}}件)</span>
        </div>
        <div class="buy">
          <el-button type="warning" class="button" plain @click="addShoppingcar(json._id)">加入购物车</el-button>
          <!-- <el-button type="warning" class="button" plain>立即购买</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import API from '../util/API';
export default {
  beforeRouteEnter(to,from,next){
        if(from.path=="/index"||from.path=="/produce"){
             document.documentElement.scrollTop=0
             document.body.scrollTop=0
             next()
        }
    },
  data() {
    return {
      ReUser:JSON.parse(localStorage.getItem("ReUser")),
      num: 1,
    };
  },
  methods: {
    //加入购物车
    addShoppingcar(id){
       console.log(id)
       if(this.ReUser){
          this.$axios({
            url:API.addCar,
            params:{
              goodsId:id,
              username:this.ReUser.name
            }
          }).then(res=>{
             if(res.data.n){
                 this.$message({
                 message: "成功加入购物车",
                 type: "success"
        });
             }else{
                 this.$message({
                 message: "网络开小差儿啦",
                 type: "warning"
        });
             }
          })
         
         
       }else{
         this.$message({
          message: "您还未登录，请先登录",
          type: "warning"
        });
        this.$router.push("/login")
       }
    }
  },
  mounted() {
    this.$store.dispatch("addDetail", this.$route.query.id);//vuex
  },
  computed: {
    ...mapGetters(["json"])
  }
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.inner1 {
  display: flex;
  padding: 40px;
  border-bottom: 1px solid #999;
  margin-bottom: 40px;
}

.nav {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.left {
  width: 453px;
  height: 453px;
  background-color: skyblue;
}

.left img {
  width: 100%;
  height: 100%;
}

.right {
  box-sizing: border-box;
  padding-left: 50px;
  flex: 1;
}

.info {
  padding: 5px 0;
}

.price {
  width: 100%;
  background: #f7f6f4;
  height: 90px;
  line-height: 90px;
  padding-left: 10px;
}

.price i {
  color: #E6A23C;
}

.buy, .num {
  padding: 15px 0;
}

.price {
  margin-top: 10px;
}

.num p {
  padding: 5px;
}

.button {
  width: 45%;
}

</style>