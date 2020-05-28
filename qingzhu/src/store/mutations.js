import Vue from "vue"
const state={
    produce:[],//所有产品页数据
    json:{},//详情页数据(购物车)
    article:[],//所有文章
    articleDetail:{},//文章详情
    shoppingcar:[],//购物车数据
    Blogs:[],//博客页数据
    address:{},//收货地址
    collection:[],//收藏
    car:[],//购物车
    addressJson:{}//根据id查询收货地址
}
const mutations={
    // //修改购物车信息
    // updateCar(state,json){
    //    state.updateCar=json
    // },
    addressJson(state,addressJson){
      state.addressJson=addressJson
    },
    //取消收藏
    dele(state,id){
        var index = state.collection.findIndex(item => item.id === id);
        state.collection.splice(index,1)
    },
    //收藏
    collection(state,json){
        state.collection.unshift(json)
    },
    // //删除收货地址
    // shan(state){
    //     state.address={}  
    // },
    // //收货地址
    // addAddress(state,detail){
    //     state.address=detail
    // },
    //商品详情数据
    addDetail(state, detail) {
       state.json=detail
    },
    //所有产品页数据
    addProduce(state,list){
        state.produce=list
    },
    //文章列表
    addArticle(state,article){
        state.article=article
    },
    //文章详情
    addArticleDetail(state,articleDetail){
       state.articleDetail=articleDetail
    },
    //博客页数据
    addBolgs(state,detail){
        state.Blogs=detail
    }
}
export default {
    state,
    mutations
}