# companyui

#添加新页面的方式：
```
1.有折叠菜单的页面，在路由的asyncRouterMap对象中参照CompanyInformation进行添加
2.没有折叠菜单的页面，按1添加路由后，将path（与children平级）的值设为空，添加no_father_node属性，值为true

路由里的keepAlive为true时，页面的name与meta平级的name一致

如果不需要home页面，即homeRoute，可以在store/modules/permission.js中删除91行    newRoute.unshift(homeRoute);

页面根元素用添加样式class="appBox"，区域刚刚好是空白区域

参考 onePage页面
```
#element-ui框架修改，暴露Scrollbar组件（已用patch-package修改，不需要手动添加）：
```
element-ui/types 下新增scrollbar.d.ts文件，内容
------------------------
import {VNodeDirective} from 'vue';

export interface ElScrollbar extends VNodeDirective {
    name: 'scrollbar',
    value: Function
}
--------------------------
然后在element-ui.d.ts的文件当中引入
import { ElScrollbar } from './scrollbar'
export const Scrollbar : PluginObject<ElScrollbar>
```

#不能用cnpm安装，否则不兼容EDGE浏览器

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

#自定义表单组件
```
src/components/deepComponents
formDate   基本用法
<form-date
    textWidth="150px"         //lable宽度
    inputWidth="230px"         //输入框宽度
    text="生日"
    format="yyyy-MM-dd"
    v-model="value"/>

formItem   基本用法   同formDate类似
formSelect 基本用法 
<form-select
    combox               //是否可搜索   combox为true，可进行搜索
    textWidth="150px"
    itemtext="name"
    itemvalue="value"
    text="请选择"
    :items="items"
    v-model="value"/>
```
