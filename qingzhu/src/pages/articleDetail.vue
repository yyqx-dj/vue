<template>
  <div class="inner">
    <div class="title">
      <h1>{{articleDetail.title}}</h1> 
      <p>时间：{{articleDetail.time}}</p>
    </div>

    <div class="img">
      <img :src="articleDetail.img" alt />
    </div>
    <div class="con">{{articleDetail.con}}</div>
     收藏：<span class="iconfont icon-xingxing" @click="collect(articleDetail.id)" :class="{active:star===1}"></span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import API from '../util/API';

export default {
   beforeRouteEnter(to,from,next){
        if(from.path=="/article"){
             document.documentElement.scrollTop=0
             document.body.scrollTop=0
             next()
        }
    },
  data() {
    return {
      id: "",
      star:0,
      tag:localStorage.getItem("tag"),
    };
  },
  methods:{
     collect(id){
       console.log(this.tag)
      if(this.tag==null){
         this.$message({
          message: "请先登录！",
          type: "warning"
        });
        return;
      }
      this.star=1
      this.$store.dispatch("collection",id)
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.$store.dispatch("addArticleDetail", this.id);
  },
  computed: {
    ...mapGetters(["articleDetail"])
  }
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.title {
  border-bottom: 1px solid #999;
}

h1 {
  text-align: center;
  line-height: 100px;
}

p {
  text-align: center;
}

.img {
  padding: 20px;
  width: 100%;
  height: 500px;
}

.img img {
  width: 90%;
  height: 100%;
}

.con {
  padding: 20px;
  text-indent: 2em;
  line-height: 40px;
}
.active{
  color: yellow;
}
</style>