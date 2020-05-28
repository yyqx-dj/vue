<template>
<div class="item">
      
      <div class="middle-left">
        <el-checkbox v-model="checked"></el-checkbox>
        <img :src="item.img" alt />
        <span>{{item.title}}</span>
      </div>
      <div class="middle-right">
        <div class="button">
        <el-button-group>
          <el-button type="info" @click="sub(item.id)">-</el-button>
          <el-button>{{item.num}}</el-button>
          <el-button type="info" @click="add(item.id)">+</el-button>
        </el-button-group>
      </div>
      <div class="price">
          <span>￥{{parseFloat(item.price)*item.num}}</span>
      </div>
      <div class="dele">
          <span>删除</span>
      </div>
      </div>
</div>
</template>
<script>

export default {
    props:["item"],
   
    data(){
        return{
             checked: false,
             num: "1",
        }
    },
    methods:{
       add(id){
           this.$store.dispatch("add",id)
            this.$forceUpdate();
       },
        sub(id){
           this.$store.dispatch("sub",id)
            this.$forceUpdate();
       }
    
   
    }
}
</script>
<style lang="stylus" scoped>
@import "../stylus/index.styl"
.item{
    display flex
    height 100px
    line-height 100px
    border-bottom: 1px solid #eee
    padding: 8px 0
}
.middle-left{
   flex 1

}
.middle-right{
    flex 1
    display flex
}
.middle-left img{
    width 100px
    height 100px
    vertical-align middle
    margin 0 5px
}

.middle-right .button{
   flex 1
   text-align right
}
.middle-right .price,.middle-right .dele{
    width 15%
    text-align right
}
.dele span{
    cursor: pointer
}
</style>