# 这是一个node开发的后台管理系统
`技术栈：Node + express + Mongodb + mongoose + jquery + es6`

### 项目启动
`cnpm install / cnpm i`
`node app.js`

#### 项目结构说明
* models M:模型,处理数据并呈递视图
* controllers C :控制器,命令模型操作数据
* views V : 视图,
* data :  模拟数据(需要导入到mongodb内 :比如 mongoimport -d sm -c students data/student.txt)
* public : 存放一些静态的资源(image,css,icon,js)
* route : 路由的处理

#### 项目功能
1.  登陆页面的功能
2.  成员的增删改查 管理员的增删改查.
3.  数据导出成Excel表.
4.  模糊搜索数据库里的内容
5.  用echart图表来观察船员的信息变化
