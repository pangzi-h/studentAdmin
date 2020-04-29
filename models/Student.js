const mongoose = require('mongoose');

//声明 schema

let studentSchema = new mongoose.Schema({
    sid:Number, //学生的学号
    name:String,//名字
    sex:String, //性别
    age:Number //年龄
});

//初始化 student 该类声明 会自动转小写 后面加s 生成一个名为 students 的集合

let student = mongoose.model("Student",studentSchema);

module.exports = Student;