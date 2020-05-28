<template>
 
    <el-button type="text" size="small" @click="del(id)">删除</el-button>

</template>
<script>
export default {
  props: ["id"],
  components: {},
  data() {
    return {};
  },
  methods: {
      del(id){
          
        this.$confirm('确定要删除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$emit("delOne",this.id)
        })
      }
  },
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style>
</style>