let { app, port, multiparty, MongoClient, DBurl, fs, ObjectId,bodyParser} = require('./config.js');

// 1-4 设置路由
app.get('/', (req, res) => {
    res.redirect('/type/index')

})
// ===============用户模块开始======================
// 管理员登录页面显示
app.get('/user/index', (req, res) => {
    res.render('user/index', {})
})
//管理员登录
app.post('/user/doAdd', (req, res) => {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        let username = fields.username[0];
        let password = fields.password[0];
        MongoClient.connect(DBurl, (error, db) => {
            console.log(username)
            console.log(password)
            db.collection('admin').find({
                username,
                password
            }).toArray((err, result) => {
                console.log(result)
                if(result[0].username=="admin"&&result[0].password==123){
                    res.send("<script>alert('登录成功！！');location.href='/goods/index';</script>")
                }else{
                    console.log(result.username,result.password)
                    res.send("<script>alert('登录失败！！');history.back();</script>")
                }
              
            })
            db.close()  //关闭数据库
        })
    });
})

// ================用户模块结束====================
// =============类别模块操作start===============
// 1.类别显示  type/index  aaa 
app.get('/type/index', (req, res) => {
    // res.send("123")
    // 获取类别列表
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('type').find({}).toArray((err, types) => {
            // res.send(types)
            res.render('type/index', {
                types,
            })
        })

        db.close()  //关闭数据库
    })



})

// 2.加载类别添加页面
app.get('/type/add', (req, res) => {
    // res.send("123")
    res.render('type/add', {})
})
// 2-1执行添加操作
app.post('/type/doAdd', (req, res) => {
    // console.log('执行添加操作')
    // 获取form对象
    var form = new multiparty.Form();
    // 执行上传的参数获取
    form.uploadDir = "upload"  // 存放所有的上传图片
    form.parse(req, function (err, fields, files) {
        // req 就是请求对象
        // fields    普通的post上传内容
        // files     上传文件的信息
        // console.log(fields)
        // console.log(files)
        let typename = fields.typename[0];// 获取类别名称
        let typepic = files.typepic[0].path;// 获取图片地址
        let size = files.typepic[0].size;// 获取上传图片的大小

        if (size <= 0) {
            //没有上传文件
            fs.unlink(typepic, () => { })  //删除垃圾文件
            typepic = ""; // 将图片路径设置为空
        }

        // 链接数据库，执行添加操作
        MongoClient.connect(DBurl, (error, db) => {
            // db 数据库的引用 -- 类似于云开发
            let data = { typename, typepic }  //需要插入的数据
            db.collection('type').insertOne(data, (err, result) => {
                // console.log(result)
                if (result.insertedId) {
                    //插入成功
                    res.send("<script>alert('类别添加成功！！');location.href='/type/index';</script>")
                } else {
                    //插入失败,删除上传的图片  fs 
                    // 判断就是为了阻止，没有添加图片，然后数据也添加失败，导致此段代码报错
                    if (typepic) fs.unlink(typepic, () => { })
                    res.send("<script>alert('类别添加失败！！');history.back();</script>")
                }
            })

            db.close()  //关闭数据库
        })



    });

})
// 3.加载类别修改页面

app.get('/type/edit', (req, res) => {
    // 根据id获取对应的要修改的数据
    let _id = ObjectId(req.query.id);  //处理条件id
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('type').findOne({ _id }, function (err, type) {
            res.render('type/edit', {
                type,
            })
        })

        db.close()  //关闭数据库
    })
})

// 3-1执行修改
app.post('/type/doEdit', (req, res) => {
    // 获取form对象
    var form = new multiparty.Form();
    // 执行上传的参数获取
    form.uploadDir = "upload"  // 存放所有的上传图片
    form.parse(req, function (err, fields, files) {
        let typename = fields.typename[0];// 获取类别名称
        let id = fields.id[0];// 获取类别id
        let oldpic = fields.oldpic[0];// 获取类别图片 （old）
        let typepic = files.typepic[0].path;// 获取图片地址  (new)
        let size = files.typepic[0].size;// 获取上传图片的大小（new）
        if (size <= 0) {

            // 没有新的上传图片，就要使用原来的图片作为头像
            fs.unlink(typepic, () => { })
            MongoClient.connect(DBurl, (error, db) => {
                // db 数据库的引用 -- 类似于云开发
                db.collection('type').updateOne({
                    _id: ObjectId(id)
                }, {
                    $set: {
                        typename,
                    }
                }, (errs, result) => {
                    // console.log(result)
                    if (result.modifiedCount >= 1) {
                        //插入成功
                        res.send("<script>alert('类别修改成功！！');location.href='/type/index';</script>")
                    } else {
                        res.send("<script>alert('类别修改失败！！');history.back();</script>")
                    }

                })
                db.close()  //关闭数据库
            })
        } else {
            //新上传了图片，证明原来的图片就没有意义了，直接删除
            MongoClient.connect(DBurl, (error, db) => {
                // db 数据库的引用 -- 类似于云开发
                db.collection('type').updateOne({
                    _id: ObjectId(id)
                }, {
                    $set: {
                        typename,
                        typepic
                    }
                }, (errs, result) => {
                    // console.log(result)
                    if (result.modifiedCount >= 1) {
                        //插入成功
                        // 删除老的图片
                        fs.unlink(oldpic, () => { })
                        res.send("<script>alert('类别修改成功！！');location.href='/type/index';</script>")
                    } else {
                        // 删除新的图片
                        fs.unlink(typepic, () => { })
                        res.send("<script>alert('类别修改失败！！');history.back();</script>")
                    }

                })
                db.close()  //关闭数据库
            })

        }

    });

})

// 4.执行删除
app.get('/type/del', (req, res) => {
    // 接受get方式传参   req.query  
    // console.log(req.query)
    let { id, typepic } = req.query;  // 获取条件id，以及图片名称
    MongoClient.connect(DBurl, (error, db) => {

        // 去goods表中查询，当前类别id下，是否有对应的商品
        db.collection('goods').find({
            typeid: id  // 不需要加ObjectId()，俩边都是普通的字符串
        }).toArray((goodserr, goodsresult) => {
            // res.send(goodsresult)
            if (goodsresult.length >= 1) {
                //证明里面有商品不能删除，给一个提示信息即可
                res.send("<script>alert('当前类别下有商品，请先处理商品！！！');history.back();;</script>")
                return false;

            }
            db.collection('type').deleteOne({
                _id: ObjectId(id)  //处理id的数据格式
            }, (err, result) => {
                // console.log(result)
                // deletedCount
                if (result.deletedCount >= 1) {
                    //删除成功
                    // 删除成功，需要把对应的商品图片也要删除掉
                    if (typepic) { fs.unlink(typepic, () => { }) }
                    res.send("<script>alert('类别删除成功！！');location.href='/type/index';</script>")
                } else {
                    res.send("<script>alert('类别删除失败！！');history.back();</script>")
                }
            })
            db.close()  //关闭数据库
        })



    })

})
// =============类别模块操作结束end============
// =============商品模块操作开始start==========
// 1.商品的显示
app.get('/goods/index', (req, res) => {
    // 获取类别列表
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('goods').find({}).toArray((err, goods) => {
            //  ind 索引  0  1
            // item  数据 每一个商品数据的对象
            goods.map((item, ind) => {
                db.collection('type').findOne({
                    // 只要是_id作为条件，那么值都需要使用ObjectId进行处理
                    _id: ObjectId(item.typeid)
                }, function (e, r) {
                    //r 就是获取到的类别
                    // console.log(r.typename)
                    goods[ind].typename = r.typename
                    // 判断，当循环都已经完毕之后，再去进行发送渲染
                    if (ind >= goods.length - 1) {
                        // res.send(goods)
                        res.render('goods/index', {
                            goods,
                        })
                    }

                })
            })

            db.close()  //关闭数据库
        })


    })
})
// 2.商品添加页面
app.get('/goods/add', (req, res) => {
    // 获取所有的类别，让商品进行选择
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('type').find({}).toArray((err, types) => {
            // res.send(types)
            res.render('goods/add', {
                types,
            })
        })

        db.close()  //关闭数据库
    })
})

// 3.执行添加操作
app.post('/goods/doAdd', (req, res) => {
    var form = new multiparty.Form();
    // 执行上传的参数获取
    form.uploadDir = "upload"  // 存放所有的上传图片
    form.parse(req, function (err, fields, files) {
        // console.log(fields)
        // console.log(files)
        let goodsname = fields.goodsname[0];// 获取商品名称
        let goodspic = files.goodspic[0].path;// 获取图片地址
        let price = fields.price[0];// 获取商品价格
        let num = fields.num[0];// 获取商品库存
        let desc = fields.desc[0];// 获取商品描述
        let status = fields.status[0];// 获取商品状态
        let typeid = fields.typeid[0];// 获取商品类别

        let size = files.goodspic[0].size;// 获取上传图片的大小

        if (size <= 0) {
            //没有上传文件
            fs.unlink(goodspic, () => { })  //删除垃圾文件
            // typepic = ""; // 将图片路径设置为空
            res.send("<script>alert('商品图片不能为空');history.back();</script>")
            return false;
        }

        // 链接数据库，执行添加操作
        MongoClient.connect(DBurl, (error, db) => {
            // db 数据库的引用 -- 类似于云开发
            let data = { goodsname, goodspic, price, num, desc, status, typeid }  //需要插入的数据
            db.collection('goods').insertOne(data, (err, result) => {
                // console.log(result)
                if (result.insertedId) {
                    //插入成功
                    res.send("<script>alert('商品添加成功！！');location.href='/goods/index';</script>")
                } else {
                    //插入失败,删除上传的图片  fs 
                    // 判断就是为了阻止，没有添加图片，然后数据也添加失败，导致此段代码报错
                    if (goodspic) fs.unlink(goodspic, () => { })
                    res.send("<script>alert('商品添加失败！！');history.back();</script>")
                }
            })

            db.close()  //关闭数据库
        })



    });
})

// 4.商品修改页面

app.get('/goods/edit', (req, res) => {
    // 根据id获取对应的要修改的数据
    let _id = ObjectId(req.query.id);  //处理条件id
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('goods').findOne({ _id }, function (err, good) {
            // res.send(good)
            // 获取所有的类别
            db.collection('type').find({}).toArray((e, types) => {
                // res.send(types)
                res.render('goods/edit', {
                    good,
                    types
                })
            })


            db.close()  //关闭数据库
        })


    })
})

// 5.执行修改
app.post('/goods/doEdit', (req, res) => {
    // 获取form对象
    var form = new multiparty.Form();
    // 执行上传的参数获取
    form.uploadDir = "upload"  // 存放所有的上传图片
    form.parse(req, function (err, fields, files) {
        let id = fields.id[0];// 获取类别id
        let oldpic = fields.oldpic[0];// 获取类别图片 （old）

        let goodsname = fields.goodsname[0];// 获取商品名称
        let goodspic = files.goodspic[0].path;// 获取图片地址 (new )
        let price = fields.price[0];// 获取商品价格
        let num = fields.num[0];// 获取商品库存
        let desc = fields.desc[0];// 获取商品描述
        let status = fields.status[0];// 获取商品状态
        let typeid = fields.typeid[0];// 获取商品类别

        let size = files.goodspic[0].size;// 获取上传图片的大小  (new)

        if (size <= 0) {

            // 没有新的上传图片，就要使用原来的图片作为头像
            fs.unlink(goodspic, () => { })
            MongoClient.connect(DBurl, (error, db) => {
                // db 数据库的引用 -- 类似于云开发
                db.collection('goods').updateOne({
                    _id: ObjectId(id)
                }, {
                    $set: {
                        goodsname, price, num, desc, status, typeid
                    }
                }, (errs, result) => {
                    // console.log(result)
                    if (result.modifiedCount >= 1) {
                        //插入成功
                        res.send("<script>alert('商品修改成功！！');location.href='/goods/index';</script>")
                    } else {
                        res.send("<script>alert('商品修改失败！！');history.back();</script>")
                    }

                })
                db.close()  //关闭数据库
            })
        } else {
            //新上传了图片，证明原来的图片就没有意义了，直接删除
            MongoClient.connect(DBurl, (error, db) => {
                // db 数据库的引用 -- 类似于云开发
                db.collection('goods').updateOne({
                    _id: ObjectId(id)
                }, {
                    $set: {
                        goodsname, price, num, desc, status, typeid, goodspic
                    }
                }, (errs, result) => {
                    // console.log(result)
                    if (result.modifiedCount >= 1) {
                        //插入成功
                        // 删除老的图片
                        fs.unlink(oldpic, () => { })
                        res.send("<script>alert('商品修改成功！！');location.href='/goods/index';</script>")
                    } else {
                        // 删除新的图片
                        fs.unlink(goodspic, () => { })
                        res.send("<script>alert('商品修改失败！！');history.back();</script>")
                    }

                })
                db.close()  //关闭数据库
            })

        }

    });
})

// 6.执行删除操作

app.get('/goods/doDel', (req, res) => {

    // 接受get方式传参   req.query  
    // console.log(req.query)
    let { id, goodspic } = req.query;  // 获取条件id，以及图片名称
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('goods').deleteOne({
            _id: ObjectId(id)  //处理id的数据格式
        }, (err, result) => {
            // console.log(result)
            // deletedCount
            if (result.deletedCount >= 1) {
                //删除成功
                // 删除成功，需要把对应的商品图片也要删除掉
                if (goodspic) { fs.unlink(goodspic, () => { }) }
                res.send("<script>alert('商品删除成功！！');location.href='/goods/index';</script>")
            } else {
                res.send("<script>alert('商品删除失败！！');history.back();</script>")
            }
        })
        db.close()  //关闭数据库
    })


})

// =============商品模块操作结束end============
// =====================购物车模块开始==========
app.get('/cart/index', (req, res) => {
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('cart').find({}).toArray((err, carts) => {
          res.render("cart/index",{
              carts
          })
            db.close()  //关闭数据库
        })


    })
})
// =====================购物车模块结束==========
// ==================用户模块开始==================
app.get('/beforeUser/index', (req, res) => {
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('beforeUser').find({}).toArray((err, beforeUser) => {
          res.render("beforeUser/index",{
            beforeUser
          })
            db.close()  //关闭数据库
        })


    })
})

// ==================用户模块结束==================

// =================收货地址模块开始==================
app.get('/address/index', (req, res) => {
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('address').find({}).toArray((err, address) => {
          res.render("address/index",{
            address
          })
            db.close()  //关闭数据库
        })


    })
})
// ===================收货地址模块结束=================
// ===================订单模块开始=======================
//加载订单页面
app.get('/order/index', (req, res) => {
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('order').find({}).toArray((err, order) => {
          res.render("order/index",{
            order
          })
            db.close()  //关闭数据库
        })


    })
})
//加载订单修改页面
app.get('/order/edit', (req, res) => {
    // 根据id获取对应的要修改的数据
    let _id = ObjectId(req.query.id);  //处理条件id
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('order').findOne({ _id }, function (err, order) {
            res.render('order/edit', {
                order,
            })
        })

        db.close()  //关闭数据库
    })
})

//执行订单修改操作
app.get('/order/doEdit', (req, res) => {
    let _id = ObjectId(req.query.id);  //处理条件id
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('order').updateOne({ _id },{
            $set:{
                status:"2"//发货
            }
        },function (err, result) {
            if (result.modifiedCount >= 1) {
                //插入成功
                res.send("<script>alert('商品状态修改成功！！');location.href='/order/index';</script>")
            } else {
                res.send("<script>alert('商品状态修改失败！！');history.back();</script>")
            }
        })

        db.close()  //关闭数据库
    })

})
// ==========留言模块开始============================
app.get('/comment/index', (req, res) => {
    MongoClient.connect(DBurl, (error, db) => {
        db.collection('comment').find({}).toArray((err, comment) => {
          res.render("comment/index",{
            comment
          })
            db.close()  //关闭数据库
        })


    })
})
// ============留言模块结束==========================

// ===================订单模块结束=======================
// -----------------------------------------


// 1-3 监听服务
app.listen(port, () => {
    console.log(`您的服务正在${port}端口运行！！！`)
})
