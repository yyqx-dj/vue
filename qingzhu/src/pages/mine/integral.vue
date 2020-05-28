<template>
<div>
    <el-tabs type="border-card">
  <el-tab-pane label="积分明细">
    <mine-integral></mine-integral>
  </el-tab-pane>
  <el-tab-pane label="收入">
    <mine-integral></mine-integral>
  </el-tab-pane>
  <el-tab-pane label="支出">
    <mine-integral></mine-integral>
  </el-tab-pane>
  </el-tabs>  
</div>
</template>
<script>
import mineIntegral from '../../components/mineIntegral'
export default {
props: [],
components: {
    mineIntegral
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