# primary-care-client | 社区医疗

## 产品展示
![产品展示](doc/ylicon-view/sqyl_ui_show.png)



## 1.原型设计图(初期)
https://app.mockplus.cn/e/BmPZRrIl7fY


## 2.功能划分

  在线问诊模块
  - 医生查询 | 医生推荐 | 医生列表 | 咨询医生 | 问诊消息列表

  预约挂号模块
   - 医院查询 | 医院信息列表 | 科室选择 | 医生选择 |  提交预约 |  我的预约列表

 
 
  首页
   - 医疗宝典模块 | 健康新闻 | 新闻详情页 |首页社区活动

  药品查询模块
   - 搜索药品 | 药品信息列表 | 跳转百度百科药品详情页

  用药提醒模块
   - 提醒列表 | 添加提醒

  个人信息模块
  - 我的档案栏 | 个人健康数据栏查看和更新 | 地址管理 | 退出账号

  登录注册模块

## 3.运行
  ```sh
  npm i # 首次拉项目时安装依赖
  npm run serve # 运行项目预览
  ```
## 4.部分文件结构说明
```sh
├─doc # 一些说明文档
│  └─ylicon-view # 用到的第三方图标库预览
├─src 
│  ├─assets # 资源文件
│  ├─common # 数据库连接池
│  │  └─base.css # 公共样式
│  ├─components # 封装的公共组件
│  └─http # api接口

```
### 4.1封装的公共组件/工具类/样式
**components/** 下有公共可用的组件:
- ylTitle 标题组件
- ylNavbar 顶部导航条组件
- ylTabbar 底部标签导航条组件
- ylSearch 搜索框组件
- ylEmpty 空状态组件
- ylPersonDoctor 医生信息组件 
- ylToast 全局toast 组件

## 5.使用第三方图标库
 doc/ylicon-view 目录下是项目所用所有图标的预览 ，浏览器打开 **example.html**，可以看到所有图标，包括图标的**命名**。

 在vant中使用
 ```html
  <!-- 方法一 -->
<van-icon class-prefix="yl-icon" name="aixinzhijia" />
   <!-- class-prefix="yl-icon" 字段为固定必填， name 根据图标预览项目的 命名 复制粘贴即可 此方法可以使用van-icon提供的功能 -->

  <!-- 方法二  原生方法 -->
<i class='yl-icon yl-icon-aixinzhijia'></i>
  <!-- yl-icon 字段为固定 ,yl-icon-${图标名称} -->
 ```


## 6.规范说明

  1. 命名尽量使用英文翻译
  2. js尽量写分号
  3. 能使用公共样式的地方尽量使用公共样式，方便后期统一调整样式


## 7.项目后端仓库
<a href='https://gitee.com/zzerx/primary-care-server/stargazers'><img src='https://gitee.com/zzerx/primary-care-server/badge/star.svg?theme=dark' alt='star'></img></a>

https://gitee.com/zzerx/primary-care-server

## 8.协作开发说明
 master为保护分支，创建者进行审核dev代码进行合并， dev分支为公共开发分支，大家创建自己的分支开发，然后合并到该分支


### 8.1大致流程(简化版)
![流程图](./git_step.png)

### 
```sh
# 8.1.1.创建自己的开发分支
git branch dev@mydev # 创建自己的分支 dev@mydev 随便起
git checkout dev@mydev  # 切换到自己的分支

# 8.1.2.提交修改
git add *  # 提交所有修改
git commit -m '你的提交信息' # 提交到本地暂存区

# 8.1.3.将自己的开发分支合并到公共dev分支
git checkout dev # 切换到dev分支
git merge dev@mydev # 将你的dev本地分支和dev合并

# 8.1.4.提交开发分支
git push origin dev # 提交dev分支到远程仓库

# 8.2.其他日常命令
git status # 查看仓库状态（红色已修改未提交/绿色已提交）
git log # 查看当前分支历史提交日志
git branch # 查看所有分支
git branch mydev # 创建名为 `mydev` 的分支
git checkout master # 从当前分支切换到 master 分支
```

## 项目未完善
 医生端
 后台管理系统
