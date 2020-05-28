<template>
  <div class="inner">
      <h3>提交订单</h3>
     <div class="top">
        <h3>收货地址</h3>
        <div class="spacing"></div>
        <div v-if="user">
          <span>{{user.name}}</span>
          <span>{{user.phone}}</span>
          <span>{{user.address}}</span>
        </div>
        <div v-else @click="toAddress" class="toAddress">请添加收货地址</div>
    </div>
    <div class="goods">
        <good-item v-for="item in order" :key="item._id" :item="item"></good-item>
    </div>
    <div class="top desc">
         <h3>顾客备注</h3>
         <div>
          <el-input placeholder="订单补充说明" v-model="desc"></el-input>
        </div>
    </div>
    <div class="top order">
       <div class="right">
           <span>实付金额：</span>
           <span class="red">￥{{total}}</span>
           <el-button type="danger" @click="toorder">提交订单</el-button>
       </div>
    </div>
  </div>
</template>
<script>
import goodItem from "../components/goodItem"
import API from '../util/API';
import qs from 'qs'
export default {
  props: [],
  components: {
      goodItem
  },
  data() {
    return {
        total:"",
        order:[],
        user:null,
        desc:""
        
    };
  },
  methods: {
      toAddress(){
          this.$router.push("/mine/address")
      },
      toorder(){
        let name= this.user.name
        let phone = this.user.phone
        let address = this.user.address
        let total = this.total
        let status = 1
        let username = JSON.parse(localStorage.getItem("ReUser")).name
        let desc = this.desc
        
        this.$axios({
            url:API.orderAdd,
            params:{name,phone,address,total,status,username,desc}
            }).then(res=>{
               if(res.data.n){
                    this.$message({
                    message: "下单成功",
                    type: "success"
                    });
                    this.$router.push("/produce")
               }else{
                   this.$message({
                    message: "网络开小差儿啦~~~",
                    type: "warning"
                    });
               }
        })
      }
  },
  watch: {},
  computed: {},
  mounted() {
      let username=JSON.parse(localStorage.getItem("ReUser")).name
      this.$axios({
          url:API.car,
          params:{
              username:username,
          }
      }).then(res=>{
        var arr=res.data
        this.order=arr.filter((item,index,arr) => {
            return item.check==true
        })
          console.log(this.order)
      })
      this.$axios({
          url:API.address,
          params:{
              username: username
          }
      }).then(res=>{
          var arrJson = res.data;
          let userArr = arrJson.filter(item=>{
              return item.value==true
          })
          this.user = userArr[0]
          
      })
      this.total=this.$route.query.allPrice
  }
};
</script>
<style scoped>
/* .inner{
    border-left: 1px solid #888;
    border-right: 1px solid #888;
} */
.toAddress{
    cursor: pointer;
}
.red{
    color: red;
    margin-right: 10px;
}
.order{
    overflow: hidden;
}
.right{
    float: right;
}
.spacing {
  height: 1px;
  background-color: #888;
 
}
.top{
    padding: 10px;
    border: 1px solid #888;
}
h3{
    color: #888;
    line-height: 40px;
}
span{
    line-height: 40px;
}
.goods{
    border: 1px solid #888;
    margin: 10px 0;
}
.desc{
    margin: 10px 0;
}
</style>