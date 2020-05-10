//处理路由的文件:
const express = require('express'),
      {
        showLogin,
        doLogin,
        checkUser
      } = require('../controllers/loginCtrl'),
    //   
    {loginout} = require('../controllers/loginout'), 
    {
        showIndex:sI,
        showList:sL,
        searchStudent:sS,
        exportStudentToExcel:eSTE,
        showAddStudent:sAS,
        addStudent:aS,
        updateStudent:uS,
        deleteStudent:dS
    }= require('../controllers/studentCtrl'),
    {
        showAdminIndex:sAI,
        showAdminList:sAL,
        searchAdmin:sA,
        exportAdminToExcel:eATE,
        showAddAdmin:sAA,
        addAdmin:aA,
        updateAdmin:uA,
        deleteAdmin:dA
    } = require('../controllers/adminCtrl')

//生成路由:
let router = express.Router();

//登录验证: 验证如果没有登陆过不能访问管理界面的任何内容
router.use((req, res, next) => {
    if (!req.session['s_id'] && req.url != '/login') { //没有s_id证明没有登陆过
        res.redirect('/login');
        return;
    }
    next();
});

//路径清单:
router.get('/login', showLogin); //访问登录页面
router.post('/login', doLogin); //访问登录接口 处理登录操作
router.propfind('/login', checkUser); //访问接口 验证用户名是否存在
router.get('/', sI); //访问首页
router.get('/student/msg',sL);//访问接口 处理学生数据 
router.get('/student/search',sS); //访问接口 处理搜索学生
router.get('/student/exportExcel',eSTE);//访问接口 处理学生数据导出
router.get('/student/addStudent',sAS); //访问增加学生页面
router.put('/student/addStudent',aS);//访问接口 处理增加学生
router.post('/student/:sid',uS);//访问接口 处理修改学生数据
// router.delete('/student/:sid', studentCtrl.deleteStudent);//访问接口 处理删除学生
router.delete('/student/del/:sid',dS);// 接口访问,处理删除数据

router.get('/admin', sAI); //访问管理员
router.get('/admin/msg',sAL);//访问接口 处理管理员数据 
router.get('/admin/search',sA); //访问接口 处理搜索管理员
router.get('/admin/exportExcel',eATE);//访问接口 处理管理员数据导出
router.get('/admin/addAdmin',sAA); //访问增加管理员页面
router.put('/admin/addAdmin',aA);//访问接口 处理增加管理员
router.post('/admin/:sid',uA);//访问接口 处理修改管理员数据
// router.delete('/admin/:sid', adminCtrl.deleteadmin);//访问接口 处理删除管理员
router.delete('/admin/del/:sid',dA);// 接口访问,处理删除数据

// 退出
router.get('/Logout',loginout)//访问接口, 处理退出
module.exports = router;