<template>
<div class="item" @click="toArticleDetail(item.id)">
    <div class="item-left">
        <img :src="item.img" alt="">
    </div>
    <div class="item-right">
        <h2>{{item.title}}</h2>
        <span>{{item.time}}</span>
        <p>{{item.con}}</p>

    </div>
</div>
</template>
<script>
export default {
    props:["item"],
    methods:{
        toArticleDetail(id){
            this.$router.push("/articleDetail?id="+id)
        }
    }

}
</script>
<style lang="stylus" scoped>
@import "../stylus/index.styl"
.item{
    display flex
    padding: 20px
    border-bottom: 1px solid #999
    
}
.item-left{
    width 200px
    height 200px
    
}
.item-left img{
    display inline-block
    width 90%
    height 80%
    margin 0 auto
}
.item-right{
    flex 1
}
.item-right span{
    line-height 30px
}
.item-right p{
     height 100px
     overflow hidden
}
</style>