<template>
<div>
  <el-tabs type="border-card">
  <el-tab-pane label="未使用">
      <mine-coupon></mine-coupon>
  </el-tab-pane>
  <el-tab-pane label="已使用">
       <mine-coupon></mine-coupon>
  </el-tab-pane>
  <el-tab-pane label="已过期">
       <mine-coupon></mine-coupon>
  </el-tab-pane>
  </el-tabs>      
</div>
</template>
<script>
import mineCoupon from "../../components/mineCoupon"
export default {
props: [],
components: {
    mineCoupon
},
data(){
return{}
},
methods: {},
watch: {},
computed: {},
mounted(){}
}
</script>
<style scoped>
</style>