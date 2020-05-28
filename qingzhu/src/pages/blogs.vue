<template>
  <div class="inner">
    <div class="edit">
      <el-input placeholder="请输入内容" v-model="input" clearable class="input"></el-input>
      <el-button type="primary"  class="button" @click="publish">发表</el-button>
    </div>
    <div class="content">
    <blog-card v-for="item in arr" :key="item._id" :item="item"></blog-card>
    </div>
  </div>
</template>
<script>
// import {mapGetters} from "vuex"
import blogCard from "../components/blogCard"
import API from '../util/API';
export default {
  components:{
   blogCard
  },
  data(){
     return{
       input:"",
       nickname:"",
       arr:[],
       tag: localStorage.getItem("tag")
     }
  },

  mounted() {
    // this.$store.dispatch("addBolgs")
    let username = JSON.parse(localStorage.getItem("ReUser")).name
    this.$axios({
      url:API.sBefore,
      params:{
        phone:username
      }
    }).then(res=>{
       this.nickname=res.data[0].nickname
    })

    this.init()

  },
    methods:{
    publish(){
      if(!this.tag){
            this.$message({
            message: "要先登录才能发表哦！！",
            type: "warning"
              });
          this.input=""
          return;
       }
       this.$axios({
         url:API.commentAdd,
         params:{
           input: this.input,
           nickname: this.nickname,
           currentTime: Date.parse(new Date()),
           username: JSON.parse(localStorage.getItem("ReUser")).name
         }
       }).then(res=>{
          if(res.data.n){
            this.$message({
            message: "发布成功！",
            type: "success"
        });
        this.input=""
        this.init()
          }
       })
    },
    init(){
      this.$axios({
        url:API.comment
      }).then(res=>{
         this.arr=res.data
      })
    }
  },
  computed: {
    // ...mapGetters(["blogs"])
  }
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';
.content{
  overflow hidden;
  padding: 20px 0;
}
.edit{
  display flex
}
.input{
  width 30%
}
.button{
  margin-left: 10px;
}
.inner {
  padding: 20px 10px;
}

ul {
  overflow: hidden;
}

li {
  width: 50%;
  float: left;
  padding: 20px 0;
}

.wrap {
  width: 95%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #eee;
  cursor: pointer;
}

li .img {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

li img {
  width: 100%;
}

.left {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  left: 20px;
  bottom: 8px;
}

.right {
  position: absolute;
  right: 20px;
  bottom: 8px;
}

.bottom {
  height: 50px;
  position: relative;
}

.span {
  position: absolute;
  left: 60px;
  top: 15px;
}

h3 {
  line-height: 40px;
}

p {
  line-height: 20px;
}
</style>