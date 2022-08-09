# 后台管理系统

## Build Setup

```bash
# 克隆项目
git clone http://gitlab.dossen.com/java/dosssen-framework-frontend.git

# 进入项目目录
cd dosssen-framework-frontend/vue2+webpack+element-Template

# 东呈前端工具库（先安装工具库，再安装依赖）
npm install --save dossen-utils --registry https://npm.dossen.com/
或 yarn add dossen-utils --registry https://npm.dossen.com/

# 安装依赖（使用内部私有npm库）
npm install --registry https://npm.dossen.com/
# 或
npm install

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix

# 下载 （主要是指定私有库下载d）
yarn --registry https://npm.dossen.com/
```
