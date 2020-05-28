<template>
  <div class="app">
    <div class="nav">
      <div class="header inner">
        <div class="left">
          <img src="./assets/images/logo.png" alt />
        </div>
        <div class="middle">
          <el-menu
            :default-active="activeIndex"
             mode="horizontal"
          >
            <el-submenu index="1">
              <template slot="title" > <span @click="sortList">查看所有类别</span> </template>
              <el-menu-item v-for="item in sort" :key="item._id" @click="tosort(item._id)">{{item.typename}}</el-menu-item>
            </el-submenu>
            <el-menu-item index="2" @click="toIndex">首页</el-menu-item>
            <el-menu-item index="3" @click="toProduce">所有产品</el-menu-item>
            <el-menu-item index="4" @click="toBlogs">留言板</el-menu-item>
            <el-menu-item index="5" @click="toArticles">文章列表</el-menu-item>
          </el-menu>
        </div>
        <div class="right">
          <ul>
            <li @click="login" class="hand" v-if="!tag">登录</li>
             <li class="hand" v-else>已登录</li>
             <li class="spacing"></li>
             <li class="register hand" @click="register">注册</li>
            <li v-if="tag">
              <span class="iconfont icon-gouwuchekong" @click="shoppingcar"></span>
            </li>
            <li v-if="tag">
              <router-link to="/mine" class="mine">我的</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
     <div id="bottom">
            <div class="inner">
                <div class="left">
                    <img src="./assets/images/logo.png" alt="">
                    <p>青竹良品原创生活类电商品牌，秉承一贯的严谨态度，我们深入世界各地，从源头全程严格把控商品生产环节，力求帮消费者甄选到最优质的商品，全线采用天然原材料，控制甲醛低量无害，采用进口工艺，国际生产线不断优化，食材保证核心原产地新鲜直供，让你享受品质生活</p>
                </div>
                <div class="middle">
                    <table>
                        <tr>
                            <td>关于我们</td>
                            <td>支付方式</td>
                            <td>相关服务</td>
                        </tr>
                        <tr>
                            <td><a href="#">我的品牌</a></td>
                            <td><a href="#">微信支付</a></td>
                            <td><a href="#">退货政策</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">我的品牌</a></td>
                            <td><a href="#">微信支付</a></td>
                            <td><a href="#">退货政策</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">我的品牌</a></td>
                            <td><a href="#">微信支付</a></td>
                            <td><a href="#">退货政策</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">我的品牌</a></td>
                            <td><a href="#">微信支付</a></td>
                            <td><a href="#">退货政策</a></td>
                        </tr>
                    </table>
                </div>
                <div class="bottom">
                    <table>
                        <tr>
                            <td><a href="#"><img src="./assets/images/footerImgShow_1.png" alt=""></a></td>
                            <td class="td"><a href="#"><img src="./assets/images/footerImgShow_2.png" alt=""></a></td>
                        </tr>
                        <tr>
                            <td>微信公众号</td>
                            <td>微博公众号</td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- <div class="foot">
                <div class="left">
                    <p> 2020 © youhaosuda.com</p>
                    <table>
                        <tr>
                            <td><span class="iconfont ic">&#xe501;</span></td>
                            <td><span class="iconfont ic">&#xe61a;</span></td>
                            <td><span class="iconfont ic">&#xe641;</span></td>
                            <td><span class="iconfont ic">&#xe6fd;</span></td>
                            <td><span class="iconfont ic">&#xe637;</span></td>
                            <td><span class="iconfont ic">&#xe639;</span></td>
                            <td><span class="iconfont ic">&#xe605;</span></td>
                        </tr>
                    </table>
                </div>
                <div class="right">
                    <table>
                        <tr>
                            <td><span class="iconfont ic">&#xe501;</span></td>
                            <td>
                                <p>可信联盟</p>
                                <p>身份验证</p>
                            </td>
                            <td><span class="iconfont ic">&#xe501;</span></td>
                            <td>
                                <p>工商网监</p>
                                <p>电子标识</p>
                            </td>
                            <td><span class="iconfont ic">&#xe501;</span></td>
                            <td>
                                <p>安全联盟</p>
                                <p>实名验证</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div> -->
        </div>
       
  </div>
</template>
<script>
// import {mapGetters} from "vuex"
import API from "./util/API"
export default {
  computed:{
    //  ...mapGetters(["ReUser"])
  },
  data() {
    return {
       activeIndex: "",
      //  ReUserName:JSON.parse(localStorage.getItem("ReUser")).name,
       ReUser:JSON.parse(localStorage.getItem("ReUser")),
       tag:localStorage.getItem("tag"),
       sort:[]
    };
  },
  methods: {
    shoppingcar(){
      console.log(this.ReUser)
      if(this.ReUser==null){
          this.$message({
          message: "请先登录！",
          type: "warning"
        });
        this.$router.push("/login")
      }else{
        this.$router.push("/shoppingcar")
      }
    },
    tosort(id){
      this.$router.push("/produce?id="+id)
    },
    sortList(){
    this.$axios({
      url: API.type,
    }).then(res=>{
      this.sort=res.data
    })
    },
  toIndex(){
   this.$router.push("/index")
  },
  toProduce(){
    this.$router.push("/produce")
  },
  toBlogs(){
    this.$router.push("/blogs")
  },
  toArticles(){
    this.$router.push("/article")
  },
  login(){
    this.$router.push("/login")
  },
  register(){
    this.$router.push("/register")
  },

   }
};
</script>
<style scoped>
.el-menu--popup{
  padding: 0 !important;
}
.app .nav {
  border-bottom: 1px solid #eee;
  width: 100%;
   height: 61px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #fff;
}
.app .header {
  display: block;
  height: 61px;
  line-height: 61px;
  overflow: hidden;
  background-color: #fff;
}
.left {
  width: 142px;
  height: 61px;
  float: left;
}
.left img {
  margin-top: 15px;
}
.middle {
  float: left;
  margin-left: 100px;
}
.right {
  float: right;
  overflow: hidden;
}

.right li {
  float: left;
  font-size: 14px;
  color: #999;
}
.right .spacing {
  width: 1px;
  height: 15px;
  background-color: #666;
  margin: 23px 8px 0 8px;
}
.register {
  margin-right: 20px;
}
 #bottom {
  background-color: #eee;
  font-size: 14px;
}
 #bottom .inner {
  width: 1100px;
  margin: 0 auto;
  overflow: hidden;
  padding: 50px 0 50px 0;
  border-bottom: 1px solid #888;
}
 #bottom .inner .left {
  float: left;
  width: 307px;
}
 #bottom .inner .middle {
  float: left;
  margin-left: 72px;
}
 #bottom .inner .middle table td {
  width: 140px;
  height: 35px;
}
 #bottom .inner .bottom {
  text-align: center;
  float: right;
}
#bottom .inner .bottom table .td {
  padding-left: 5px;
}
 #bottom .foot {
  width: 1100px;
  margin: 0 auto;
  overflow: hidden;
  padding: 40px;
}
 #bottom .foot table .ic {
  font-size: 30px;
  padding: 5px;
}
 #bottom .foot .left {
  float: left;
  width: 300px;
}
 #bottom .foot .right {
  width: 300px;
  margin-top: 15px;
  float: right;
}
.hand{
  cursor: pointer;
}
.mine{
  margin-left:10px;
   cursor: pointer;
}
</style>