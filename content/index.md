[toc]

#  校夕夕 前端文档

## 项目运行

1.   使用终端打开项目根目录
2.   执行`npm install`安装依赖
3.   重命名`env`为`.env`
4.   执行`npm run dev`运行项目

## 项目结构

*   [api](/content/01api) 封装对后端通信用的接口，对所有接口的操作在这里进行统一管理，以便维护，当后端接口发生改变时，只需要修改这里的代码即可。
    *   auth.ts 身份验证接口
    *   cart.ts 购物车接口
    *   categoies.ts 商品分类接口
    *   limitProduct.ts 限购接口
    *   order.ts 订单接口
    *   products.ts 商品接口
    *   reviews.ts 评价接口
    *   sales.ts 销售接口
    *   user.ts 用户接口
*   assets 一些代码中的动态资源文件
*   components 公共组件
    *   dashboard 后台的仪表盘组件
    *   product 商品组件
    *   Breadcrumbs.vue 面包屑导航
    *   Modal.vue 封装模态框
    *   PaginationButton.vue 封装分页按钮
*   composables 常用函数
    *   useAxios.ts 封装网络请求框架
*   content 文档目录，就是当前页面的数据来源
*   layout 布局
    *   admin.vue 后台管理布局
    *   default.vue 空白布局
    *   frontend.vue 用户前台布局
*   middleware 路由守卫，在页面跳转前进行的操作
    *   init.global.ts 全局守卫，里面进行了身份判断，未登录的跳转登录页面，非管理员无法访问后台管理页面
*   node_models 前端所有的包
*   pages 前端页面
    *   admin 后台页面
        *   category 分类管理页面
        *   inventory 库存预警页面
        *   limit 限购页面
        *   order 订单管理页面
        *   review 评价返回页面
        *   service 退款和售后页面
        *   userinfo 用户详情页面
        *   index.vue 仪表盘页面
        *   sysTheme.vue 系统主题设置页面
        *   userList.vue 用户列表页面
    *   cart 前台用户购物车页面
    *   content 文档页面
    *   order 前台用户订单页面
    *   products 商品列表页面
    *   index.vue 首页
    *   login.vue 用户登录页面
    *   noPermissions.vue 无权限提示页面
    *   register.vue 注册页面
    *   setting.vue 用户设置页面
*   plugins 插件配置
    *   scrollrevel.ts [scrollrevealjs](https://scrollrevealjs.org/)插件，用于列表滚动[懒加载](https://developer.mozilla.org/zh-CN/docs/Web/Performance/Lazy_loading)
*   prisma 项目没用到，不必理会
*   public 项目的静态资源(图标)
*   server [服务器渲染](https://cn.vuejs.org/guide/scaling-up/ssr)
    *   api 接口，实现了登录人数的统计功能
*   stores 状态管理，使用[Pinia](https://pinia.vuejs.org/zh/)进行全局状态管理
    *   useBreadcrumbStore.ts 面包屑导航状态
    *   useCartStore.ts 统计购物车商品数量
    *   useThemeStore.ts 主题状态
    *   useUserStore.ts 用户状态
*   utils 工具函数
    *   createToast 封装创建Toast功能
*   .env 环境变量，API_BASE_URL指定了后端服务的地址，这个文件不会上传到git仓库
*   env 备份的环境变量，这个文件会上传到仓库，需要手动命名为`.env`
*   .gitignore 忽视的目录或文件，这些文件将不被添加到git仓库
*   app.vue 根组件
*   nuxt.config.ts 整个项目的配置文件
*   tailwind.config.js [TailwindCSS](https://www.tailwindcss.cn/)的配置文件

## 项目中用到的插件

### 框架

*   `Vue3 `[链接](https://cn.vuejs.org/guide/introduction.html)
*   `nuxt`[链接](https://nuxt.com/)

### Nuxt相关

*   `@nuxt/content`：用于管理 Markdown 和 JSON 内容。[链接](https://content.nuxt.com/)
*   `@nuxt/icon`：提供 SVG 和字体图标支持。[链接](https://nuxt.com/modules/icon)
*   `@nuxtjs/device`：检测用户设备类型（移动端、桌面等）。[链接](https://nuxt.com/modules/device)
*   `@nuxtjs/dotenv`：加载 `.env` 环境变量。[链接](https://github.com/nuxt-community/dotenv-module)
*   `@vueuse/nuxt`：集成 VueUse 工具库。[链接](https://nuxt.com/modules/vueuse) [链接2](https://vueuse.org/functions.html#category=State)
*   `@pinia/nuxt`：在 Nuxt 中使用 Pinia 进行状态管理。[链接](https://pinia.vuejs.org/zh/ssr/nuxt.html) [链接2](https://pinia.vuejs.org/zh/)
*   `nuxt-echarts`：在 Nuxt 中使用 ECharts 图表。[链接](https://nuxt.com/modules/echarts) [链接](https://echarts.apache.org/zh/index.html)

### 样式与 UI 相关

*   `tailwindcss`：CSS 框架，提供实用类。[链接](https://www.tailwindcss.cn/)
*   `daisyui`：基于 Tailwind 的 UI 组件库。[链接](https://daisyui.com/docs/install/)
*   `@tailwindcss/typography`：提供文章排版优化。[链接](https://github.com/tailwindlabs/tailwindcss-typography)

### 动画与特效

*   `@hypernym/nuxt-anime`：在 Nuxt 中使用 Anime.js 进行动画。[链接](https://nuxt.com/modules/animejs) [链接2](https://animejs.com/documentation/#JSobject)
*   `scrollreveal`：滚动触发动画效果。[链接](https://scrollrevealjs.org/)

### 数据处理

*   `axios`：HTTP 请求库。[链接](https://axios-http.com/)
*   `dayjs`：轻量级日期处理库。[链接](https://day.js.org/en/)

