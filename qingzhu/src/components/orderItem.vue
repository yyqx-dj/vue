<template>
<div class="orderItem">
    <p>
        <span><b>收货人：</b>{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span><b>手机号：</b>{{item.phone}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span><b>收货地址：</b>{{item.address}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
    </p>
    <p>
        <b>总计：</b>{{item.total}}元
     </p>
     <p>
        <!-- <el-button type="primary" round size="mini">新订单</el-button> -->
        <el-button type="success" round size="mini" v-if="item.status=='2'?true:false">已发货</el-button>
        <el-button type="warning" round size="mini" v-if="item.status=='1'?true:false">新订单</el-button>
        <el-button type="danger" round size="mini" v-if="item.status=='3'?true:false">订单完成</el-button>
        <el-button type="danger" round size="mini" v-if="item.status=='2'?true:false" @click="confirm(item._id)">确认收货</el-button>
     </p>
        
   
</div>
</template>
<script>
import API from '../util/API'

export default {
props: ["item"],
components: {},
data(){
return{}
},
methods: {
    init(){},
    confirm(id){
      this.$axios({
          url:API.orderEdit,
          params:{
              id:id
          }
      }).then(res=>{
         
      })
       this.$emit("init")
       this.$router.push("/produce")
    }
},
watch: {},
computed: {},
mounted(){}
}
</script>
<style scoped>
.orderItem{
    border: 1px solid #888;
    padding: 10px;
    margin-bottom: 10px;
}
p{
    margin: 5px 0;
}
</style>