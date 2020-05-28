<template>
<div>
 <div>
  <el-tabs type="border-card">
  <el-tab-pane label="全部拼团">
     <mine-assemble></mine-assemble>
  </el-tab-pane>
  <el-tab-pane label="组团中">
      <mine-assemble></mine-assemble>
  </el-tab-pane>
  <el-tab-pane label="组团成功">
      <mine-assemble></mine-assemble>
  </el-tab-pane>
  <el-tab-pane label="组团失败">
      <mine-assemble></mine-assemble>
  </el-tab-pane>
 
  </el-tabs>      
</div>
</div>
</template>

<script>
import mineAssemble from '../../components/mineAssemble'
export default {
props: [],
components: {
    mineAssemble
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