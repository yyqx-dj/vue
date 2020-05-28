<template>
  <div class="mask" @click.self="cancel">
      <div class="con">
          <h3>删除商品</h3>
          <h4>你确定要删除该商品吗?</h4>
          <div class="button">
                <el-button type="info" plain @click="cancel">取消</el-button>
                <el-button type="primary" @click="cancel">确定</el-button>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
      cancel(){
          this.$emit("cancel")
      }
  }
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';
.mask{
    width: 100vw
    height: 100vh
    background: rgba(0,0,0,0.5)
    position: fixed;
    left: 0;
    top: 0
   
}
.con{
    width: 300px
    height 180px
    background-color #fff
    border-radius: 10px
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
     padding: 20px
}
.button{
    position: absolute;
    right: 40px
    bottom: 40px
}
h4{
    margin-top: 20px;
}

</style>