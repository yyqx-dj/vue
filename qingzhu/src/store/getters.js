const getters={
    //根据id查询收货地址
    addressJson(state){
        return state.addressJson
    },
    //收藏
    collection(state){
        return state.collection
    },
    //收货地址
    address(state){
        return state.address
    },
    //购物车详情
    json(state){
       return state.json
    },
    produce(state){
        return state.produce
    },
    article(state){
    return state.article
  },
  articleDetail(state){
      return state.articleDetail
  },
  shoppingcar(state){
      return state.shoppingcar
  },
  blogs(state){
      return state.Blogs
  }


}
export default getters;