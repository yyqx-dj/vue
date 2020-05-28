let { app, port, multiparty, MongoClient, DBurl, fs, ObjectId, apiport,bodyParser} = require('../config.js');

//小轮播图
app.get("/getsmallbanners", (req, res) => {
    res.send({
        isok: true,
        status: 200,
        code: 0,
        smallbanners: [

            {
                "id": 11,
                "img": "http://asset.ibanquan.com/image/588082c50dd76c1c9700001b/s_w330h330.png?v=1484817093",
                "title": "便携简约清扫扫帚",
                "price": "580.00"
            },
            {
                "id": 12,
                "img": "http://asset.ibanquan.com/image/58807aa19bedc40992001525/s_w330h330.png?v=1484815009",
                "title": "简约多拼接彩色木制积木"
                , "price": "300.00"
            },
            {
                "id": 13,
                "img": "http://asset.ibanquan.com/image/5880828b9bedc407dc000014/s_w330h330.png?v=1484817035",
                "title": "黑陶自然花香蜡烛",
                "price": "580.00"
            },
            {
                "id": 14,
                "img": "http://asset.ibanquan.com/image/5880813fb1b9571423000015/s_w330h330.png?v=1484816703",
                "title": "简约时尚水泥花瓶",
                "price": "450.00"
            },
            {
                "id": 15,
                "img": "http://asset.ibanquan.com/image/588083460dd76c1c93000027/s_w330h330.png?v=1484817223",
                "title": "简约木制餐盘",
                "price": "300.00"
            },
            {
                "id": 16,
                "img": "http://asset.ibanquan.com/image/5880808e3f8f900988000005/s_w330h330.png?v=1484816526",
                "title": "不锈钢咖啡水壶",
                "price": "400.00"
            },
            {
                "id": 17,
                "img": "http://asset.ibanquan.com/image/588082640dd76c1c97000018/s_w330h330.png?v=1484816996",
                "title": "经典系列计算机",
                "price": "580.00"
            }
        ]
    })
})



// 类别显示  type/index  aaa 
app.get('/types', (req, res) => {
    let where=req.query
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('type').find(where).toArray((err, types) => {
            res.send(types)   
        })
        db.close()  //关闭数据库
    })
})

   // 获取商品列表
app.get('/getAllList', (req, res) => {
    let where=req.query
    if(where.tag=="detail"){
        delete where.tag
        where._id=ObjectId(where._id)
    }
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('goods').find(where).toArray((err, goods) => {
            goods.map((item,index)=>{
                goods[index].goodspic="http://localhost:3000/"+item.goodspic.replace("\\","/")
            })
        res.send(goods)
        })
        db.close()  //关闭数据库
    })
})

   // 加入购物车
   app.get('/addCar', (req, res) => {
    let {goodsId,username}=req.query
    console.log(goodsId,username)
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('goods').find({
            _id:ObjectId(goodsId)
        }).toArray((err, goods) => {
           let {goodsname,goodspic,price}=goods[0]
            let num =1,check=true
            //插入购物车
            db.collection('cart').find({
                goodsname,
                username
            }).toArray((errorC, carts) => {
                  console.log(carts.length)
                  if(carts.length){
                    //已经存在，直接修改数量
                    // res.send("已经存在了")
                    let oldnum=carts[0].num;
                    oldnum++;
                    db.collection('cart').updateOne({
                        goodsname,
                        username
                    }, {
                        $set: {
                            num:oldnum
                        }
                    }, (e, r) => {
                        res.send(r)
                    })
                  }else{
                   //不存在，直接插入
                 
                   db.collection('cart').insertOne({goodsname,goodspic,price,num,check,username},(e,r)=>{
                     res.send(r)
                   })
                  }
                
            })

        })
        // db.close()  //关闭数据库
    })
})

//购物车商品展示
app.get('/car', (req, res) => {
    let where=req.query
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('cart').find(where).toArray((err, cart) => {
            cart.map((item,index)=>{
                cart[index].goodspic="http://localhost:3000/"+item.goodspic.replace("\\","/")
            })
            res.send(cart)   
        })
        db.close()  //关闭数据库
    })
})
//更改购物车信息
app.get('/updateCar', (req, res) => {
//    let{_id,check}=req.query
   let where=req.query
   let check=JSON.parse(where.check)

   if(where.tag=="one"){
      where._id=ObjectId(where._id)
   }else if(where.tag=="many"){
    
   }
   delete where.tag
   delete where.check
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('cart').updateMany(where,{
            $set:{
                check,
            }
        },(error,result)=>{
            res.send(result)
        })
        db.close()  //关闭数据库
    })
})


//更改购物车数量
app.get('/updateCarNum', (req, res) => {
    console.log("nnnnnnnnnn")
       let{_id,num}=req.query
        MongoClient.connect(DBurl, (error, db) => {
            db.collection('cart').updateOne({
                _id:ObjectId(_id)
            },{
                $set:{
                   num
                }
            },(error,result)=>{
                res.send(result)
            })
            db.close()  //关闭数据库
        })
    })
//删除购物车商品
app.get('/cart/del', (req, res) => {
    // 接受get方式传参   req.query  
    // console.log(req.query)
    let where = req.query;  // 获取条件id，以及图片名称
    console.log(where)
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('cart').deleteOne({
            _id:ObjectId(where._id)
        }, (err, result) => {
            console.log(result)
            res.send('商品删除成功！！')     
        })
        db.close()  //关闭数据库
    })


})

//查询用户
app.get('/beforeUser', (req, res) => {
    let where=req.query
    console.log(where)
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('beforeUser').find(where).toArray((err, beforeUser) => {
            res.send(beforeUser)   
        })
        db.close()  //关闭数据库
    })
})

// 执行用户添加操作
app.post('/beforeUser/doAdd', (req, res) => {
    
    console.log(req.body)
    var data = req.body
   
    let nickname = data.nickname
    let pass=data.pass
    let idx=data.idx
    let email=data.email
    let phone=data.name
    let sex=data.sex

        // 链接数据库，执行添加操作
        MongoClient.connect(DBurl, (error, db) => {
            // db 数据库的引用 -- 类似于云开发
            let data = { nickname,phone,pass,idx,email,sex}  //需要插入的数据
            db.collection('beforeUser').insertOne(data, (err, result) => {
                // console.log(result)
                // if (result.insertedId) {
                //     //插入成功
                //     res.send("<script>alert('商品添加成功！！');location.href='/goods/index';</script>")
                // } else {
                //     //插入失败,删除上传的图片  fs 
                //     // 判断就是为了阻止，没有添加图片，然后数据也添加失败，导致此段代码报错
                //     if (goodspic) fs.unlink(goodspic, () => { })
                //     res.send("<script>alert('商品添加失败！！');history.back();</script>")
                // }
            })
            db.close()  //关闭数据库
        })
})


// 5.执行用户修改
app.post('/beforeUserEdit/doEdit', (req, res) => {
    console.log(req.body)
    var data = req.body

    let phone = data.phone
    let nickname = data.nickname
    let idx=data.idx
    let email=data.email
    let sex=data.sex

        MongoClient.connect(DBurl, (error, db) => {
            // db 数据库的引用 -- 类似于云开发
            db.collection('beforeUser').updateOne({phone:phone}, {
                $set: {
                    nickname,idx,email,sex
                }
            }, (errs, result) => {
              res.send(result)
            })
            db.close()  //关闭数据库
        })

    }
)



//查询收货地址
app.get('/address', (req, res) => {
    let where=req.query
    console.log(where)
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('address').find(where).toArray((err, address) => {
            res.send(address)   
        })
        db.close()  //关闭数据库
    })
})


//根据id查询收货地址
app.get('/addressId', (req, res) => {
    let where=req.query
    console.log(where)
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('address').find({
            _id:ObjectId(where._id)
        }).toArray((err, address) => {
            res.send(address)   
        })
        db.close()  //关闭数据库
    })
})




// 执行收货地址添加操作
app.post('/address/doAdd', (req, res) => {
    
    console.log(req.body)
    var data = req.body
   
    let username = data.username
    let name = data.name
    let phone=data.phone
    let address=data.address
    let value=data.value
        // 链接数据库，执行添加操作
        MongoClient.connect(DBurl, (error, db) => {
            // db 数据库的引用 -- 类似于云开发
            let data = {username, name,phone,address,value}  //需要插入的数据
            db.collection('address').insertOne(data, (err, result) => {
            })
            db.close()  //关闭数据库
        })
})


// 执行收货地址的修改
app.post('/addressEdit/doEdit', (req, res) => {
    console.log(req.body)
    var data = req.body
   
    let id = data.id
    let username = data.username
    let name = data.name
    let phone=data.phone
    let address=data.address
    let value=data.value

        MongoClient.connect(DBurl, (error, db) => {
            // db 数据库的引用 -- 类似于云开发
            db.collection('address').updateOne({
                _id:ObjectId(id)
            }, {
                $set: {
                    username,name,phone,address,value
                }
            }, (errs, result) => {
              res.send(result)
            })
            db.close()  //关闭数据库
        })

    }
)

//执行收货地址的删除
app.get('/address/doDel', (req, res) => {

    // 接受get方式传参   req.query  
    // console.log(req.query)
    let id = req.query;  // 获取条件id，以及图片名称
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('address').deleteOne({
            _id: ObjectId(id._id)  //处理id的数据格式
        }, (err, result) => {
            console.log(result)
            res.send('地址删除成功！！')
        })
        db.close()  //关闭数据库
    })


})



// 执行订单添加操作
app.get('/order/doAdd', (req, res) => {
    
    console.log(req.query)
    var data = req.query


        // 链接数据库，执行添加操作
        MongoClient.connect(DBurl, (error, db) => {
            // db 数据库的引用 -- 类似于云开发
            db.collection('order').insertOne(data, (err, result) => {
              console.log(111)

              db.collection('cart').find({
                  username:data.username,
                  check:true
              }).toArray((errCart,resCarts)=>{

                console.log(resCarts)


                resCarts.map((item,index)=>{
                   db.collection('goods').findOne({
                       goodsname: item.goodsname
                   },(errGoods,resGoods)=>{
                    console.log(333)
                       let num = parseFloat(resGoods.num)-parseFloat(item.num)
                       db.collection('goods').updateOne({
                        goodsname: item.goodsname
                       },{
                           $set:{
                               num:num
                           }
                       },(errGoodsUpdate,resGoodsUpdate)=>{
                          console.log("成功")
                          db.collection('cart').deleteMany({
                            username:data.username,
                            check:true
                          },(errDel,resDel)=>{
                            res.send(resDel)
                          })
                       })
                   })
                })
              })
            })
           
        })
})

//查询订单
app.get('/order', (req, res) => {
    let where=req.query
    console.log(where)
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('order').find(where).toArray((err, order) => {
            res.send(order)   
        })
        db.close()  //关闭数据库
    })
})

//修改订单
app.get('/order/doEdit', (req, res) => {
    let _id = ObjectId(req.query.id);  //处理条件id
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('order').updateOne({ _id },{
            $set:{
                status:"3"//发货
            }
        },function (err, result) {
            // if (result.modifiedCount >= 1) {
            //     //插入成功
            //     res.send("<script>alert('商品状态修改成功！！');location.href='/order/index';</script>")
            // } else {
            //     res.send("<script>alert('商品状态修改失败！！');history.back();</script>")
            // }
            res.send(result)
        })

        db.close()  //关闭数据库
    })

})



// 执行留言添加操作
app.get('/comment/doAdd', (req, res) => {
    
    console.log(req.query)
    var nickname = req.query.nickname
    var username = req.query.username
    var input = req.query.input
    var currentTime = req.query.currentTime
        // 链接数据库，执行添加操作

        MongoClient.connect(DBurl, (error, db) => {
            // db 数据库的引用 -- 类似于云开发
            let data = {username,nickname, input,currentTime}  //需要插入的数据
            db.collection('comment').insertOne(data, (err, result) => {
                res.send(result)
            })
            db.close()  //关闭数据库
        })
})


//查看留言
app.get('/comment', (req, res) => {
    let where=req.query
    console.log(where)
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('comment').find(where).toArray((err, comment) => {
            res.send(comment)   
        })
        db.close()  //关闭数据库
    })
})





















//文章列表
app.get("/getarticles", (req, res) => {
    res.send({
        isok: true,
        status: 200,
        code: 0,
        articles: [
            {   
                "id":"100",
                "img": "http://asset.ibanquan.com/image/58808ea39bedc407d80000b3/s_w204h144.jpeg?v=1484820153",
                "title": "9 款高颜值饭盒推荐，总有一款是你的菜",
                "time": "2017-01-19 18:02",
                "con": "这款属于 Bento&amp;co 的 Temahima 系列，这个系列以 24 个节气为设计核心，将季节的特色体现在饭盒的图案上，别有一番情调。除了自用，作为礼物送人也很不错。"
            },
            {
                "id":"101",
                "img": "http://asset.ibanquan.com/image/58808d039bedc407d80000af/s_w204h144.jpeg?v=1484819956",
                "title": "养成七种整理习惯，你值得拥有更好的生活",
                "time": "2017-01-19 17:59",
                "con": "让一切都有一个着落\n\n保持生活井井有条意味着你把它们安排在了合理的地方，有条理的人恰当地安排事物，并给存储空间贴了标签。\n\n把你总是要用的东西放在随手可得的地方，不要混乱了你的存储空间。创造性地为事物寻找存储地方。此外，有一条大禁忌：不要为存储空间贴上“其他”的标签"
            },
            {
                "id":"102",
                "img": "http://asset.ibanquan.com/image/58808c24b1b957142700004e/s_w204h144.jpeg?v=1484819634",
                "title": "年度盘点｜ 2016 大家最爱看的剁手指南 Top20",
                "time": "2017-01-19 17:53",
                "con": "极简的厨房设计。不仅仅是采用现有的隐藏各种厨具、餐具的纯结构优化，更要引导一种现代都市生活的厨房新理念。\n以微波炉、光波炉、电饭锅作为主要烹饪厨具，需要油炒的则限制在极少的范围，用玻璃半封闭小炒锅，设计特殊风道，确保油烟排放系统高效，没有油烟污染室内。"
            }
        ]
    })
})
//文章列表详情
app.get("/getarticlesDetail", (req, res) => {
    var id = req.query.id;
    var json = {
       "100":{
        "id":"100",
        "img": "//asset.ibanquan.com/image/58808e733f8f90098c0000d6/s.jpeg?v=1484820084",
        "title": "9 款高颜值饭盒推荐，总有一款是你的菜",
        "time": "2017-01-19 18:02",
        "con":"它的外形像个胶囊一样，饭盒盖是拱形的，可以在上面放一些有「高度」的美食，比如三角饭团。同时，作为区隔下层饭菜的盖子，密闭性做得也不错，盖好以后汁水不会撒漏。还有绑带方便外出携带，小巧方便。除了推荐款以外，这个牌子的其他选择也很丰富，从圆形到方形，从怀旧的铝制，到现代的树脂，从小巧简单的单层，到大容量的多层统统都有，让人眼花缭乱，好看和实用兼具，绝对能挑到你心仪的那个。这款属于 Bento&co 的 Temahima 系列，这个系列以 24 个节气为设计核心，将季节的特色体现在饭盒的图案上，别有一番情调。除了自用，作为礼物送人也很不错。上层容量 360ml，下层 240ml，日常带饭足够了。需要注意的是，如果放到洗碗机中，记得把盖子拿出来。"
       },
       "101":{
        "id":"101",
        "img": "//asset.ibanquan.com/image/58808dbf0dd76c1c970000c2/s.jpeg?v=1484819903",
        "title": "养成七种整理习惯，你值得拥有更好的生活",
        "time": "2017-01-19 17:59",
        "con":"习惯，是在某种时间、某个地方、某种条件下自然而然地表现出来的一种比较定型的行为。当整理成为一种习惯性的行为，你的家、你的生活自然就变得井井有条。让一切都有一个着落保持生活井井有条意味着你把它们安排在了合理的地方，有条理的人恰当地安排事物，并给存储空间贴了标签。把你总是要用的东西放在随手可得的地方，不要混乱了你的存储空间。创造性地为事物寻找存储地方。此外，有一条大禁忌：不要为存储空间贴上'其他'的标签让一切都有一个着落保持生活井井有条意味着你把它们安排在了合理的地方，有条理的人恰当地安排事物，并给存储空间贴了标签。把你总是要用的东西放在随手可得的地方，不要混乱了你的存储空间。创造性地为事物寻找存储地方。此外，有一条大禁忌：不要为存储空间贴上“其他”的标签"
       },
       "102":{
        "id":"102",
        "img": "//asset.ibanquan.com/image/58808c659bedc407d80000a9/s.jpeg?v=1484819557",
        "title": "年度盘点｜ 2016 大家最爱看的剁手指南 Top20",
        "time": "2017-01-19 17:53",
        "con": "极简的厨房设计。不仅仅是采用现有的隐藏各种厨具、餐具的纯结构优化，更要引导一种现代都市生活的厨房新理念。以微波炉、光波炉、电饭锅作为主要烹饪厨具，需要油炒的则限制在极少的范围，用玻璃半封闭小炒锅，设计特殊风道，确保油烟排放系统高效，没有油烟污染室内。最好把油烟排放系统和新风机风扇整合，以节省空间和降低噪音。在需要排放油烟时，检测到有油烟，新风机风机转速自动提高，以排出油烟。这可以通过烟雾传感器和变频调速来控制。去除油烟后，厨房和其他房间之间就不需要隔离，而提高空间利用率。用刀加工生食时在一个半封闭的凹槽内工作，避免污染其他区域。凹槽下部有排水管和封闭式的厨余垃圾箱。厨具、餐具的配套式设计，所有的厨具餐具可以叠合在一起，放在很小的空间内。餐具材料能同时适用于微波炉、光波炉，甚至在光波炉上油炒，可以用石英玻璃之类的材料。采用易清洁的餐具。简化餐具的结构和类型，设计专门的餐具体系，既可以适应小家庭，也能应付临时聚餐。常用厨具和非常用厨具分开。平时只需要很简单的厨具。折叠式的临时性大桌。平时折叠为不常用厨具柜的一部分，或者墙的装饰，不占空间。厨房和客厅之间有可移动墙体。墙体内厨房一侧可以装各种厨具柜和餐具柜。可以完全隐藏厨房。"
       }



    }
    res.send({
        code: 0,
        status: 200,
        d: json[id]
    })
})

// 1-3 监听服务
app.listen(apiport, () => {
    console.log(`您的服务正在${apiport}端口运行！！！`)
})