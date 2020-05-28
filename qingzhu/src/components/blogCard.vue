<template>
  <div class="blogCard">
    <el-card :body-style="{ padding: '0px' }">
      <div class="img">
         <div class="imgInner">{{item.input}}</div>
      </div>
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <time class="time">{{(item.currentTime)|TimeFilter}}</time>
          <el-button type="text" class="button">{{item.nickname}}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ["item"],
  mounted(){
    
  },
  components: {},
  data() {
   return{
      
   }
  },
};
</script>
<style scoped>
.blogCard{
    float: left;
    width: 346px;
    height: 259px;
    margin: 10px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
.img{
   
    background-image: url("../../static/images/blog.jpg");
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    width: 100%;
    height: 200px;
   
}
.imgInner{
    width: 250px;
    height: 200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px 0;
    text-indent: 2em;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>