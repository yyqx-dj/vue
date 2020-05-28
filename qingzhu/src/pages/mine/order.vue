<template>
  <div>
    <el-tabs type="border-card" v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="one">
         <mine-order v-if="arrOrder.length<0"></mine-order>
         <order-item v-else v-for="item in arrOrder" :key="item._id" :item="item"></order-item>
      </el-tab-pane>
      <el-tab-pane label="待收货" name="two">
      <mine-order v-if="arrOrder.length<=0"></mine-order>
         <order-item v-else v-for="item in arrOrder" :key="item._id" :item="item"></order-item>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="three">
       <mine-order v-if="arrOrder.length<0"></mine-order>
         <order-item v-else v-for="item in arrOrder" :key="item._id" :item="item" @init="init"></order-item>
      </el-tab-pane>
      <el-tab-pane label="待评价" name="four">
       <mine-order v-if="arrOrder.length<0"></mine-order>
         <order-item v-else v-for="item in arrOrder" :key="item._id" :item="item"></order-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mineOrder from "../../components/mineOrder";
import orderItem from "../../components/orderItem";
import API from "../../util/API";

export default {
  props: [],
  components: {
    mineOrder,
    orderItem
  },
  data() {
    return {
      activeIndex: "0",
      arrOrder:[]
    };
  },
  methods: {
    init() {
      let data = {};
      let username = JSON.parse(localStorage.getItem("ReUser")).name;
      if (this.activeIndex == "0") {
        //全部订单
        data = { username };
      } else if (this.activeIndex == "1") {
        //待收货订单
        data = { username, status: "2" };
      } else if (this.activeIndex == "2") {
        data = { username, status: "3" };
      }
      this.$axios({
        url: API.order,
        params: data
      }).then(res => {
        this.arrOrder=res.data
      });
    },
    handleClick(tab,event){
      if(tab.name=="one"){    
        this.activeIndex="0"
        this.init()
      }else if(tab.name=="two"){
        this.activeIndex ="1"
        this.init()
      }else if(tab.name=="three"){
        this.activeIndex ="2"
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  }
};
</script>
<style scoped>
</style>