# 这是一个node 开发的后台管理系统
`技术栈: Node+express+Mongodb+mongoose+jquery+es6`

### 项目启动
`cnpm install / cnpm i`
`node app.js`

#### 项目结构说明
* models M:模型,处理数据并呈递视图
* controllers C :控制器,命令模型操作数据
* views V : 视图,
* data :  模拟数据(需要导入到mongodb内 :比如 mongoimport -d sm -c students data/student.txt)
#### 项目功能介绍
* 完成登录,注测的功能
* 完成对内部成员信息的增删改查
* 完成对成员信息的导出成表
* 用echart图表完成对成员信息的数据统计
* 完成管理员信息的增加修改删除.
