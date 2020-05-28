<template>
  <div class="index">
    <div class="banner">
      <el-carousel>
        <el-carousel-item v-for="item in images" :key="item">
          <img :src="item" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="activity inner">
      <h2>专题活动，限时促销</h2>
      <p class="p">严选材质，精心设计，精致家居生活</p>
      <div class="inner">
        <div class="left">
          <img src="../assets/images/index_global3_pic_1.jpg" alt />
        </div>
        <div class="right">
          <div class="top">
            <img src="../assets/images/index_global3_pic_2.jpg" alt />
          </div>
          <div class="bottom">
            <img src="../assets/images/index_global3_pic_3.jpg" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="liangpin inner">
      <h2>青竹良品，你的家居首选</h2>
      <p class="p">天然之源，诚挚之礼，严格质检</p>
      <div class="inner">
         <div class="left">
           <div class="img1">
               <img src="http://asset.ibanquan.com/s/30611/727/index_global2_pic_1?v=1568268246_1582015991" alt="">
           </div>
           <div class="img2">
              <img src="http://asset.ibanquan.com/s/30611/727/index_global2_pic_2?v=1568268246_1582015991" alt="">
           </div>
         </div>
         <div class="right">
           <index-Item v-for="item in list" :key="item.id" :item="item"></index-Item>
         </div>
        
      </div>
    </div>
    <div class="global inner">
      <h2>全球大牌优选，选手用心挑选</h2>
      <p class="p">全球好货，原装正品，海外直邮，自有保税仓</p>
      <div class="left">
        <img src="../assets/images/index_global1_pic_1.jpg" alt />
      </div>
      <div class="middle">
        <div class="top">
          <img src="../assets/images/index_global1_pic_2.jpg" alt />
        </div>
        <div class="bottom">
          <img src="../assets/images/index_global1_pic_8.jpg" alt />
        </div>
      </div>
      <div class="right">
        <img src="../assets/images/index_global1_pic_9.jpg" alt />
      </div>
    </div>
    <div class="support inner">
      <ul>
        <li>
          <div>
            <img src="../assets/images/index_global1_pic_3.png" alt />
          </div>
          <p>自然生活，精选用料</p>
        </li>
        <li>
          <div>
            <img src="../assets/images/index_global1_pic_4.png" alt />
          </div>
          <p>自然生活，精选用料</p>
        </li>
        <li>
          <div>
            <img src="../assets/images/index_global1_pic_5.png" alt />
          </div>
          <p>自然生活，精选用料</p>
        </li>
        <li>
          <div>
            <img src="../assets/images/index_global1_pic_6.png" alt />
          </div>
          <p>自然生活，精选用料</p>
        </li>
        <li>
          <div>
            <img src="../assets/images/index_global1_pic_7.png" alt />
          </div>
          <p>自然生活，精选用料</p>
        </li>
      </ul>
    </div>
    <div class="experience">
        <div class="inner">

       
      <h2>良品体验</h2>
      <p class="p">用户反馈，是我们改进的目标</p>
      <ul>
        <li v-for="item in experience" :key="item.img">
          <img :src="item.img" alt />
          <div>
            <p class="p1">
              <span>{{item.title}}</span>
              <em>{{item.price}}</em>
            </p>
            <p class="p2">{{item.detail}}</p>
            <p class="p3">
              <span>{{item.frontname}}</span>
              <span>{{item.data}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
     </div>
  </div>
</template>
<script>
import indexItem from "../components/indexItem";
import API from "../util/API";
export default {
  components: {
    indexItem
  },

  data() {
    return {
      list: [],
      experience: [
        {
          img:
            "//asset.ibanquan.com/s/30611/727/index_global4_pic_1?v=1568268246_1578390281",
          title: "天草陶石咖啡杯套装",
          price: "¥299",
          detail:
            "使用了粉碎高品质的天草陶石后提炼而成的土，制作了泛着淡青色的白瓷。用餐时可以记住食品名称、体会新鲜口味···可对颜色和口味、气味、口感逐个品味，从中感受用餐的乐趣，同时还可自然而然地了解日本饮食文化",
          frontname: "alice",
          date: "2016-12-16 09:59"
        },
        {
          img:
            "//asset.ibanquan.com/s/30611/727/index_global4_pic_2?v=1568268246_1578390281",
          title: "骨瓷印花餐具",
          price: "¥699",
          detail:
            "使用了粉碎高品质的天草陶石后提炼而成的土，制作了泛着淡青色的白瓷。用餐时可以记住食品名称、体会新鲜口味···可对颜色和口味、气味、口感逐个品味，从中感受用餐的乐趣，同时还可自然而然地了解日本饮食文化",
          frontname: "王先生",
          date: "2016-12-17 09:59"
        },
        {
          img:
            "//asset.ibanquan.com/s/30611/727/index_global4_pic_3?v=1568268246_1578390281",
          title: "黑色帆布双肩包",
          price: "¥299",
          detail:
            "挺好的，尺码真的很正！背部拉链设计，放心出行，为短途商旅贴心设计。防水尼龙与牛皮的优雅结合，轻便小巧，简约百搭，防水尼龙，可折叠双肩背包",
          frontname: "爱丽丝",
          date: "2016-12-10 07:59"
        },
        {
          img:
            "//asset.ibanquan.com/s/30611/727/index_global4_pic_4?v=1568268246_1578390281",
          title: "桌面书籍收纳组合套装",
          price: "¥199",
          detail:
            "挺好的，特别暖，尺码真的很正！就是靴口太小了，要提着穿，心好累哦，本来都是一脚蹬来着，不过看在你这么暖的份上就原谅你了哈哈哈。真的可以媲美油叽叽，很开心。------三石是我男神",
          frontname: "小蚂蚁",
          date: "2016-12-15 08:00"
        }
      ],
      images: [
        "http://asset.ibanquan.com/s/30611/727/index_slide_3?v=1568268246_1582015991",
        "http://asset.ibanquan.com/s/30611/727/index_slide_2?v=1568268246_1582015991",
        "http://asset.ibanquan.com/s/30611/727/index_slide_1?v=1568268246_1582015991"
      ]
    };
  },
  mounted() {
    this.$axios({
      url: API.allList,
      params:{
        status:"1"
      }
    }).then(res => {
      this.list = res.data;
    });
  }
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.banner {
  height: 409.06px;
}

.banner img {
  width: 100%;
}

.el-carousel--horizontal>>>.el-carousel__container {
  height: 409.06px !important;
}

.banner .el-carousel--horizontal {
  height: 409.06px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.newproduce {
  text-align: center;
}

h2 {
  margin-top: 80px;
  text-align: center;
}

.p {
  line-height: 33px;
  text-align: center;
}

.activity div {
  overflow: hidden;
}

.activity div .left {
  width: 680px;
  height: 380px;
  float: left;
}

.activity div .left img {
  width: 650px;
  height: 380px;
}

.activity div .right {
  float: right;
}

.activity div .right img {
  width: 420px;
  height: 180px;
}

.activity div .right .top {
  margin-bottom: 20px;
}

.global {
  min-width: 320px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  background-color: #fff;
}

.global h2 {
  margin-top: 80px;
}

.global .p {
  line-height: 33px;
}

.global img {
  width: 100%;
}

.global .left {
  float: left;
  width: 492px;
}

.global .middle {
  float: left;
  width: 391px;
  margin: 0 10px;
}

.global .middle .top {
  margin-bottom: 19px;
}

.global .right {
  float: left;
  width: 192px;
}

.support {
  text-align: center;
}

.support ul {
  overflow: hidden;
  margin-top: 20px;
}

.support ul li {
  width: 200px;
  float: left;
  margin-right: 25px;
}

.support ul li div {
  border: 1px solid #888;
}

.support ul li p {
  line-height: 34px;
}

.support ul li:nth-of-type(5n) {
  margin-right: 0;
}

.experience {
  background-color: #f4f0ea;
  padding: 3px 0 50px 0;
}

.experience h2 {
  margin-top: 45px;
  text-align: center;
}

.experience .p {
  line-height: 33px;
  text-align: center;
}

.experience ul {
  overflow: hidden;
}

.experience ul li {
  float: left;
  width: 270px;
  height: 432px;
  margin-right: 6px;
  background-color: #fff;
}

.experience ul li img {
  width: 100%;
}

.experience ul li div {
  padding: 10px;
}

.experience ul li div .p1 {
  position: relative;
  height: 40px;
  line-height: 40px;
}

.experience ul li div .p1 span {
  position: absolute;
  left: 0;
}

.experience ul li div .p1 em {
  color: orange;
  position: absolute;
  right: 0;
}

.experience ul li div .p2 {
  height: 60px;
  line-height: 20px;
  margin: 5px 0;
  overflow: hidden;
}

.experience li:nth-of-type(4n) {
  margin-right: 0;
}
.liangpin{
    overflow hidden
}
.liangpin .left{
    float: left;
    width: 20%;
}
.liangpin .right{
    float: left;
    width: 80%;
}
</style>