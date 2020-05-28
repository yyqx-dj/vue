// 配置文件
// 1.express框架操作
// 1.1 引入当前框架
var express = require('express')
var bodyParser = require('body-parser')
var multer  = require('multer');
const upload = multer({storage:
    multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    }, filename: function (req, file, cb) {
        cb(null,Date.now() + '.' + file.originalname.split('.')[1])
    }
})
})
const app = express()    //new  express() 这种方法也可以

// 1-2 设置端口号
const port = 3000;

const apiport=3001;
// 2.ejs操作
// 2-1设置模板引擎/ 默认的视图目录  views /xxx.ejs  文件拓展名为.ejs
app.set('view engine','ejs')

// 3.设置中间件  public为静态文件目录
app.use("/",express.static('public'))
// 
app.use("/upload",express.static('upload'))

// 引入处理post以及文件上传操作的模块
var multiparty = require('multiparty');


// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// 配置数据库
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var DBurl = "mongodb://127.0.0.1:27017/myshop"

const   fs   =require('fs')

module.exports = {
    app,
    port,
    multiparty,
    MongoClient,
    DBurl,
    fs,
    ObjectId,
    apiport,
    bodyParser
}