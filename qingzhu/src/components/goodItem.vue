<template>
<div class="goodItem">
    <div class="left">
    <img :src="item.goodspic">
    <span>{{item.goodsname}}</span>
    </div>
   
    <div class="right">
     <span class="floatRight">￥{{item.price}}</span>
     <span >X{{item.num}}</span>
    </div>
   
</div>
</template>
<script>
export default {
props: ["item"],
components: {},
data(){
return{}
},
methods: {},
watch: {},
computed: {},
mounted(){}
}
</script>
<style scoped>

   
.right{
    position: absolute;
    right: 50px;
    top: 75px;
}
img{
    width: 120px;
    height: 150px;
    vertical-align: middle;
}
.goodItem{
    padding: 10px;
    border-bottom: 1px solid #888;
    position: relative;
   
}
.floatRight{
    color: red;
    margin-right: 30px;
}

</style>