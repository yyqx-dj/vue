<template>
<div class="left">
    <ul>
       <div class="ul">
        <li><span class="iconfont icon-dingdan"></span><h3>订单管理</h3></li>
        <li is='router-link' to='order' active-class="select">我的订单</li>
        <li is='router-link' to='assemble' active-class="select">我的拼团</li>
        <li><span class="iconfont icon-zhanghu"></span><h3> 账户管理</h3></li>
        <li is='router-link' to='coupon' active-class="select">优惠券</li>
        <li is='router-link' to='collection' active-class="select">我的收藏</li>
        <li is='router-link' to='integral' active-class="select">我的积分</li>
        <li><span class="iconfont icon-zhanghu1"></span><h3>个人信息</h3></li>
        <li is='router-link' to='personalDate' active-class="select">个人资料</li>
        <li is='router-link' to='address' active-class="select">收货地址</li>
       </div>
    </ul>
</div>
</template>
<script>
</script>
<style scoped>
ul{
    padding: 10px 0;
    border: 1px solid #eee
}
.ul{
    width: 50%;
    margin: 0 auto;
}
li{
    height: 40px;
    line-height: 40px;
    text-align: center;
}
a{
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.select{
    border-bottom: 2px solid skyblue
}
h3{
    display: inline-block;
}
.iconfont{
    font-size: 15px;
    color: black
}
</style>