const mongoose = require('mongoose'),
        md5 = require('md5-node'),
        fs = require('fs'),
        path = require('path'),
        nodeXlsx = require('node-xlsx');

//1.声明schema
let adminSchema = new mongoose.Schema({
    sid:Number,//用户ID号
    username : String, //用户名
    password : String, //密码
    posttime : Number, //注册时间
    lastLoginTime : Number //最后一次登录时间
});
//处理登录:
adminSchema.statics.checkLogin = function (json,callback){
    this.checkUser(json.username,function (torf){
        //{username:xxxx,password:23ssfsa,posttime:234234,lastLoginTime:234234}
        if( torf.t ){ //用户名对了
            if( md5(json.password) == torf.val.password ){
                callback(1); //登录成功;
                //实例调用的方法是动态方法
                torf.val.changelastLoginTime();
                return;
            }
            callback(-1); //密码输入错误
        }else{
            callback(-2); //用户名不存在
        }
    })
}
//验证用户名是否存在
adminSchema.statics.checkUser = function (user,callback){
    this.find({'username':user},(err,results)=>{
        if( err ){
            callback({t:false,val:null});
            return;
        }
        if( results.length != 0 ){
            callback({t:true,val:results[0]});
            return;
        }
        callback({t:false,val:null});
    })
}
//修改用户登录成功以后的登录时间
adminSchema.methods.changelastLoginTime = function (){
    var timeStemp = new Date().getTime();
    this.lastLoginTime = timeStemp;
    this.save();
}

// 获取某一页管理员的数据
adminSchema.statics.findPageData = async function (page,callback){
    //分页:
    let pageSize = 4; //一页4条数据
    let start = (page - 1) * pageSize; //起始位置
    let count = await this.find().countDocuments(); //获取数据总条数
    this.find({}).sort({'sid':-1}).skip(start).limit(pageSize).exec(function (err,results){
        if( err ){
            callback(null);
            return;
        }
        callback({
            results,
            count,
            length : Math.ceil(count / pageSize), //一共多少页
            now : page // 当前在那一页
        });
    })
}

// 修改一个管理员的方法
adminSchema.statics.changeAdmin = function(sid,data,callback){
    this.find({sid},(err,results)=>{
        // console.log(sid);
        var somebody = results[0];
        // console.log(somebody);
        // console.log(data);
        
        somebody.username = data.username;
        somebody.save((err)=>{
            if(err){
                callback(-1);//修改失败
                return;
            }
            callback(1)//修改成功
        });
    });
}

// 删除一条管理员信息
adminSchema.statics.deleteAdmin = function(sid,callback){
    console.log(sid);
    
    this.deleteOne({sid},(err,results)=>{
        console.log(results);
        if(err){
            callback(-1);
            return;
        }
        callback(1);
    });
}

// 通过正则做模糊搜索
adminSchema.statics.findAdminNames = function(reg,callback){
    this.find(
        {username:{$regex:reg,$options:'$g'}},
        (err,results)=>{
            console.log(results);
            if(err){
                callback({error:0,data:null});
                return;
            }
            callback({error:1,data:results});
        }
    )
}

//将学生输出导出为excel表
adminSchema.statics.exportExcel = function (callback){
    //查询所有学生数据:
    this.find({},(err,results)=>{
        if(err){
            callback({error:0,msg:'数据查询失败'});
            return;
        }
        var datas = [
            // ['_id','sid','name','sex','age'],
            // ['sdfsd','100001','sdfs','女',19],
            // ['sdfsd','100001','sdfs','女',19]
        ]; //存储excel表的格式
        var col = ['_id','sid','username','password']; //俗称列
        datas.push(col);
        //内容
        
        results.forEach(function (item){
            var arrInner = [];
            arrInner.push(item._id);
            arrInner.push(item.sid);
            arrInner.push(item.username);
            arrInner.push(item.password);  
            datas.push(arrInner);
        })
      
        
        //数组数据转换为底层excel表的二进制数据
        var buffer = nodeXlsx.build([
            {name:'1906',data:datas}, // 1个sheet
            // {name:'1906',data:datas} //可以有多个sheet
        ]);
        let urlLib = path.join(__dirname,'../');
        console.log(`${urlLib}public/excel/guanli.xlsx`);
        fs.writeFile(`${urlLib}public/excel/guanli.xlsx`,buffer,{'flag':'w'},function (err){
            if(err){               
                callback({error:0,msg:'excel导出失败'});
                return;
            }
            callback({error:1,msg:`guanli.xlsx`});
        });
    })
}

// 增加学生的一个方法
adminSchema.statics.saveAdmin = function(data,callback){
    this.find({},{sid:1}).sort({sid:-1}).limit(1).exec(function(err,results){
        // console.log(results);
        let sid  = results.length >0 ? Number(results[0]['sid'])+1 : 1; //设置id号
        let pwd = md5(data.password);
        // console.log(pwd);
        
        let timeStemp1 = new Date().getTime();
        let admin = new Admin({
            ...data,
            'password': pwd,
            'sid':sid,
            'posttime':timeStemp1,
            'lastLoginTime':timeStemp1
        });
        admin.save(
            err=>{if(err){
                callback({error:0,msg:'保存失败'});
                return;
            }
            callback({error:1,msg:'保存成功'})
        })
    })
}
//2.初始化Admin类 该类会声明一个名为admins的集合
let Admin = mongoose.model('Admin',adminSchema);

//3.导出集合
module.exports = Admin;
