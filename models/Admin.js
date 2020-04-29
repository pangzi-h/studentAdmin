const mongoose = require('mongoose');

//声明 schema

let adminSchema = new mongoose.Schema({
    username:String,
    password:String,
    posttime:Number,
    lastLoginTime:Number
});

//初始化 admin 该类声明 会自动转小写 后面加s 生成一个名为 admins 的集合

let Admin = mongoose.model("Admin",adminSchema);

module.exports = Student;