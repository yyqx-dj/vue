import axios from "axios"
import API from "../util/API"
const actions={
    dele(context,id){
        context.commit("dele",id)
    },
    //收藏
    collection(context,id){
        axios({
            url:API.articlesDetail,
            params:{
                id:id
            }
        }).then(res=>{
           context.commit("collection",res.data.d)
        })
    },
    shan(context){
        context.commit("shan")
    },
    // addAddress(context,detail){
    //     context.commit("addAddress",detail)
    // },

    addressJson(context,addressJson){
        context.commit("addressJson",addressJson)
    },
    //用户注册
    addReUser(context,json){
        context.commit("addReUser",json)
    },
    //详情页面（购物车）
    addDetail(context,id) {
         axios({
             url:API.allList,
             params:{
                 _id:id,
                 tag:"detail"
             }
         }).then(res=>{
            context.commit("addDetail",res.data[0])
         })
    },
    //列表页所有商品
    addProduce(context,list){
        axios({
            url:API.allList,
        }).then(res=>{
           context.commit("addProduce",res.data)
        })
    },
  //商品分类
  sort(context,id){
      axios({
          url:API.allList,
          params:{
              typeid:id,
             
          }
      }).then(res=>{
        context.commit("addProduce",res.data)
      })
  },


  //文章列表
    addArticle(context,article){
        axios({
            url:API.articles,
        }).then(res=>{
            context.commit("addArticle",res.data.articles)
        })
    },
    //文章详情页
    addArticleDetail(context,id){
        axios({
            url:API.articlesDetail,
            params:{
                id:id
            }
        }).then(res=>{
            context.commit("addArticleDetail",res.data.d)
        })
    },
    //博客页面
    addBolgs(context,detail){
        axios({
            url:API.blogs
        }).then(res=>{
            context.commit("addBolgs",res.data.list)
        })
        
    }

}

export default actions