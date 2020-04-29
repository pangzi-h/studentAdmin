/* 启动入口文件(主文件)*/
const express = require("express"),
    mongoose = require("mongoose"),
    cookieSession = require('cookie-session');

    //连接数据库
    mongoose.connect('mongodb://loaclhost/sm',{useUnifiedTopology:true,useNewUrlParser:true})

    app.set('view engine','ejs');

    //使用session
    app.use(cookieSession({
        name:'sess_id',
        keys:['key1'],
        maxAge:30*60*1000//30min
    }))
    //路由清单

    //处理静态资源请求
    app.use(express.static('public'))
    //起服务
    let app = express();
    app.listen(3000,function(){
         console.log("running...."); 
    });
  
    