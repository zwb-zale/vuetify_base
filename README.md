# companyui

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
