const   Admin = require('../models/Admin'),
        formidable = require('formidable');

        // 渲染首页(包括管理员的信息)
exports.showAdminIndex = function(req,res){
    //给前台渲染管理员数据
    let page = req.query.page ?req.query.page : 1; //获取页数
    Admin.checkUser(req.session.s_id,function(adminR){
        res.render('Admin',{
            adminData:adminR,
        });
    });
}

//访问接口 获取管理员某一页数据
exports.showAdminList = function(req,res){
    let page = req.query.page?req.query.page:1;//获取页数
    Admin.findPageData(page,function(results){
        res.json(results)
    })
}

//访问接口 处理修改管理员数据
exports.updateAdmin = function(req,res){
    let sid = req.params.sid;
    let form = formidable();
    form.parse(req,(err,fields)=>{
     //    console.log(fields);
        Admin.changeAdmin(sid,fields,(results)=>{  
            res.json({error:results});

        })
    })
    // delete req.session['s_id'];
    // res.redirect('/login')
 }

 // 删除管理员数据
exports.deleteAdmin = function(req,res){
    let sid = req.params.sid;


    Admin.deleteAdmin(sid,(results)=>{
        res.json({error:results});
        // console.log(results);
    })

}



//通过学生姓名做模糊搜索
exports.searchAdmin = function(req,res){  
    let search = req.query.search;
    console.log(search);
    
    Admin.findAdminNames(search,(results)=>{
      res.json(results);
    })
}
//访问增加学生页面
exports.showAddAdmin = function(req,res){  
   Admin.checkUser(req.session.s_id,function(adminR){
        res.render('addAdmin',{
            adminData:adminR,
        });
    });
}
// 增加一个管理员
exports.addAdmin = function(req,res){  
   let form = formidable();
   form.parse(req,(err,fields)=>{
    //    console.log(fields);
        Admin.saveAdmin(fields,(results)=>{
            res.json(results);
        })       
    })
}
//访问接口 处理学生数据导出
exports.exportAdminToExcel = function(req,res){  

    Admin.exportExcel((data)=>{
        res.send(data);
    });
}


