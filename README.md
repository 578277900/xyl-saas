# xyl-saas
校友录saas系统

## 一、相关配置

```
# 1.数据库配置
数据库地址：101.43.125.38
数据库：xyl
字符集：utf8mb4
用户名：xyl
密码：TiwyWTJPDAHkzKHk
mysql版本：8.0.36

# 2.redis配置
redis: {
    client: {
    port: 6379,
    host: '101.43.125.38',
    password: 'hgy@#2024!!',
    db: 8,
    },
},

# 3.oss配置
ossConfig: {
    regionId: 'z0',
    oss: 'qiniuyun',
    bucket: '3d-app',
    domain: 'https://3d-app-qiniu.dlmu.cc',
    qiniuConfig: {
    accessKey: 'XY7NulclFTE8ff15ORUTq-zRFhrfnSOxwnrGF6e7',
    secretKey: '3Pqaeoh1JmmSdhfpONLE3LcH6HJsl3Y2vl8lT-0D',
    },
    catePathSplit: '/xyl-saas/',
}

# 4. 微信测试号

- 小程序AppID：wxeb615e2808763b71
- 小程序AppSecret：f8af8ee848c22e54055e2462fc688994

# 5. 其他配置
vue版本：3.3.4
node版本：22.20.0
npm依赖安装创建一个 .npmrc 文件，绑定 https://registry.npmmirror.com
尽可能详细的写好文档
创建.gitignore文件，忽略node_modules等目录
```

## 二、功能信息

### 2.1 简单介绍

本系统是校友录saas系统，提供校友录的管理功能。包含以下功能：

- 校友录管理：包括校友录的创建、修改、删除、查询等操作。
- 用户管理：包括用户的注册、登录、权限管理等操作。
- 校友活动管理：包括校友活动的创建、修改、删除、查询等操作。
- 校友交流管理：包括校友之间的交流、沟通、分享等操作。
- 系统管理：包括系统的配置、监控、维护等操作。

子项目分为以下几个部分：

- 前端项目（微信小程序端，xyl-saas-mini）：负责提供用户界面和交互功能。
- API接口项目（Node.js端，xyl-saas-api）：负责处理业务逻辑、数据存储和接口调用。
- 后台管理项目（Vue.js端，xyl-saas-admin）：负责设计和管理数据库结构。

### 2.2 功能详细介绍

xyl-saas-mini
- 框架：微信原生开发 + vant-weap组件库（https://vant-ui.github.io/vant-weapp/#/home）

xyl-saas-api
- 框架：Node.js + Koa框架（https://koa.bootcss.com/）
- 数据库：MySQL数据库（https://www.mysql.com/）
- 缓存：Redis缓存（https://redis.io/）
- 接口文档：使用Swagger自动生成接口文档（https://swagger.io/）

xyl-saas-admin
- 框架：Vue.js + Element-Plus组件库（https://element-plus.org/zh-CN/）
- 数据库：MySQL数据库（https://www.mysql.com/）
- 缓存：Redis缓存（https://redis.io/）
- 接口文档：使用Swagger自动生成接口文档（https://swagger.io/）

### 2.3 产品原型

参考“产品原型”文件夹的图片

### 2.4 核心模块

saas功能
- 可以在管理后台配置多个微信小程序，分别存储在不同的oss目录下（如/xyl-saas/mini1、/xyl-saas/mini2等）。
- 多个小程序共同一个数据库，但数据要根据小程序某个字段（如appId）进行区分
- 每个小程序有自己的用户登录系统，用户登录后可以在小程序内进行操作。
- 每个小程序可以配置不同的功能模块，如校友录、校友活动、校友交流等。
- 每个功能模块都有自己的数据库表，用于存储相关数据。
- 等等

### 2.5 其它补充

```
# 核心功能实现：
首页 (Home)：包含校园风光轮播图、功能金刚区（8个核心入口）、最新的校园资讯以及快捷预约入口。
校园资讯 (News)：展示母校动态、校庆公告等。
校友查询 (Search)：支持按姓名、班级、城市搜索校友，并查看电子名片。
教师风采 (Faculty)：展示各学院名师及教授信息。
英才录 (Talents)：收录杰出校友事迹与成就。
校友班级 (Classes)：按年级和班级聚合校友，方便寻找同窗。
云祝福 (Blessings)：校友可以发布对母校的祝福，支持点赞互动。
校友捐赠 (Donations)：展示捐赠项目进度、累计金额及鸣谢名单。
各地校友会 (Associations)：
交互式地图：使用 D3.js 开发的中国地图，支持鼠标滚轮/双指缩放和拖拽查看。
悬浮提示：鼠标移动到地图上的红点（校友会坐标）时，会弹出悬浮框显示该校友会的负责人及成员规模。
列表视图：地图下方同步展示各地区校友会的详细列表。
建言献策 (Feedback)：提供留言反馈功能，支持文字和图片上传。
校庆日预约 (Appointment)：支持在线选择回校日期、同行人数及联系方式。

# 技术亮点：
响应式设计：采用微信小程序风格的移动端 UI 布局。
流畅动画：使用 motion 库实现页面切换和交互动画。
数据可视化：通过 D3.js 实现了动态地图渲染，满足了您对地图交互的特殊需求。
主题定制：使用了深红色（校徽红）作为主色调，营造庄重亲切的校园氛围。

# 各地校友上的地图没有显示。

# 另外，每个小程序可以独立配置主色调和图标。
```




