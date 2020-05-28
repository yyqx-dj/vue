const baseUrl="/api";
const bigbanners=baseUrl+"/getbigbanners";
const smallbanners=baseUrl+"/getsmallbanners";
const type=baseUrl+"/types"//商品类别
const allList=baseUrl+"/getAllList"//列表页
const articles=baseUrl+"/getarticles"//文章列表
const articlesDetail=baseUrl+"/getarticlesDetail"//文章详情
const blogs=baseUrl+"/getBlogs"
const addCar=baseUrl+"/addCar"//加入购物车
const car = baseUrl+"/car"//查询购物车
const updateCar = baseUrl+"/updateCar"//更改购物车信息(选择)
const addUser = baseUrl+"/addUser"
const updateCarNum = baseUrl+"/updateCarNum"//更改购物车信息(选择)
const delCar = baseUrl+"/cart/del"//删除购物车商品
const sBefore =  baseUrl+"/beforeUser"//查询用户资料
const beforeUserAdd = baseUrl+"/beforeUser/doAdd"//用户添加
const beforeUserEdit = baseUrl+"/beforeUserEdit/doEdit" //修改用户资料
const addAddress = baseUrl+"/address/doAdd"//添加收货地址
const address = baseUrl+"/address"//查询收货地址
const addressId = baseUrl+"/addressId"//根据id查询收货地址
const addressEdit = baseUrl+"/addressEdit/doEdit"//修改收货地址
const addressDel = baseUrl+"/address/doDel"//删除收货地址
const orderAdd = baseUrl+"/order/doAdd"//添加订单
const order = baseUrl+"/order"//查询订单
const orderEdit = baseUrl+"/order/doEdit"//修改订单
const commentAdd = baseUrl+"/comment/doAdd"//添加留言
const comment = baseUrl+"/comment"//查看留言
export default{
    bigbanners,
    smallbanners,
    allList,
    articles,
    articlesDetail,
    blogs,
    type,
    addCar,
    car,
    updateCar,
    addUser,
    updateCarNum,
    delCar,
    beforeUserAdd,
    sBefore,
    beforeUserEdit,
    addAddress,
    address,
    addressEdit,
    addressId,
    addressDel,
    orderAdd,
    order,
    orderEdit,
    commentAdd,
    comment


}

