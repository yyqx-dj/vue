import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login=()=>import("../pages/login")
const register=()=>import("../pages/register")
const index=()=>import("../pages/index")
const produce=()=>import("../pages/produce")
const blogs=()=>import("../pages/blogs")
const article=()=>import("../pages/article")
const shoppingcar=()=>import("../pages/shoppingcar")
const payment=()=>import("../pages/payment")
const detail=()=>import("../pages/detail")
const articleDetail=()=>import("../pages/articleDetail")
const mine=()=>import("../pages/mine")
const account=()=>import("../pages/account")


const order=()=>import("../pages/mine/order")
const address=()=>import("../pages/mine/address")
const assemble=()=>import("../pages/mine/assemble")
const coupon=()=>import("../pages/mine/coupon")
const integral=()=>import("../pages/mine/integral")
const personalDate=()=>import("../pages/mine/personalDate")
const collection=()=>import("../pages/mine/collection")
// const sort=()=>import("../pages/sort")

export default new Router({
  routes: [
    {
      path:"/login",
      component:login
    },
    {
      path:"/register",
      component:register
    },
    {
      path:"/index",
      component:index
    },
    {
      path:"/produce",
      component:produce,
      // children:[
      //   {
      //     path:"sort",
      //     component:sort
      //   }
      // ]
    },
    {
      path:"/blogs",
      component:blogs
    },
    {
      path:"/article",
      component:article
    },
    {
      path:"/shoppingcar",
      component:shoppingcar,
    },
    {
      path:"/payment",
      component:payment
    },
    {
      path:"/detail",
      component:detail
    },
    {
      path:"/articleDetail",
      component:articleDetail
    },
    {
      path:"/account",
      component:account
    },
    {
      path:"/mine",
      component:mine,
      children:[
        {
          path:"order",
          component:order,
          name:'我的订单'
        },
        {
          path:"address",
          component:address,
          name:'收货地址'
        },
        {
          path:"collection",
          component:collection,
          name:'我的收藏'
        },
        {
          path:"assemble",
          component:assemble,
          name:'我的拼团'
        },
        {
          path:"coupon",
          component:coupon,
          name:'优惠券'
        },
        {
          path:"integral",
          component:integral,
          name:'我的积分'
        },
        {
          path:"personalDate",
          component:personalDate,
          name:'个人资料'
        },
        {
          path:"",
          redirect:"personalDate"
        },
      ]
    },
    {
      path:"*",
      redirect:"/index"
    },

  ]
})
