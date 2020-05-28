<template>
  <div>
    <div class="item" @mouseenter="enter" @mouseleave="leave" @click="todetail(item._id)">
      <img :src="item.goodspic" alt />
      <p>{{item.goodsname}}</p>
      <span>{{item.price}}</span>
      <div class="mask" v-if="isMask">
        <p>查看详情</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:["item"],
    data(){
        return{
          isMask: false
        }
    },
    methods:{
        todetail(id){
          // console.log(id)
          this.$router.push("/detail?id="+id)
        },
        enter(){
            this.isMask=true;
        },
        leave(){
            this.isMask=false;
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.item {
  width: 24%;
  height: 310px;
  background-color: #f9f9f9;
  float: left;
  position: relative;
  margin: 0 0px 5px 8px;
  text-align: center;
}

.item img {
  width: 100%;
}
.item p{
  text-align: center;
//   line-height: 30px;
}
.item span {
  color: orangered;
}
 item:nth-of-type(5n) {
  margin-right: 0;
}
.item .mask {
   width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0;
  top: 0;
 
}
.item .mask p {
  width: 100px;
  height: 40px;
  line-height: 40px;
  background-color: orange;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
}
</style>