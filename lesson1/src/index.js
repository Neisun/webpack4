// import Header from './header'
// import Content from './content'
// import Siderbar from './siderbar'
// new Header();
// new Content();
// new Siderbar();
// import test from './test.jpg';
// // 如果开启了css module那么，这么引入是无效的
// // import './test.less'
// // import style from './index.less';
// import style from './index.less'
// console.log(style)
// // import './index.less'
// // 你会发现其实引入的test图片就是一个图面的name
// // console.log(test)



// var root = document.getElementById('root');
// var img = new Image();
// img.src = test;
// img.classList.add(style.img);
// root.append(img);
// // iconfont部分
// var div = document.createElement('div');
// var classList = div.className.split("");
// classList.push(style["iconfont"]+" "+style["icon-fangshai"]);
// div.className = classList;
// root.append(div)

// 为了验证ES6语法，所以写了比较新的ES6语法
// 需要加入polly，按需进行ES6语法转化
// const arr = [
//     new Promise(() => {

//     }),
//     new Promise(() => {

//     })
// ]
// arr.map(item => {
//     console.log("neisun");
//     console.log(item);
// })
// import {add} from './math';
// add(1,2);

// code splitting
// 静态引入
// import _ from 'lodash';
// import $ from 'jquery';
// // 自己写的一个模块，文件大小不满足30000字节，于是不会做代码分割，而是打包到了index.js文件中
// import test from './test'
// console.log(_.VERSION);
// console.log($.VERSION);
// console.log(test.name);

// code splitting
// 动态引入的模块，会自动打包
// 可以加入魔法注释来修改动态引入模块的命名，改写成我们自己想要的名字
// function getComponent() {
//     return import( /* webpackChunkName:"lodash"*/ 'lodash').then(({default:_}) => {
//         var ele = document.createElement('div');
//         ele.innerHTML = _.join(["hello","world"],",");
//         return ele;
//     })
// }
// getComponent().then(ele => {
//     document.getElementById('root').appendChild(ele);
// })


// prefetch
// const btn1 = document.createElement('button');
// const btn2 = document.createElement("button");
// let myDialog;
// btn1.innerHTML = "打开";
// btn2.innerHTML = "关闭";
// document.getElementById("root").append(btn1);
// document.getElementById("root").append(btn2);
// btn1.addEventListener("click",() => {
//     import(
//         // 魔法注释 模块名字
//         /* webpackChunkName:'dialog' */ 
//         // 魔法注释 预加载
//         /* webpackPrefetch:true */ 
//         "./diglog")
//     .then(({default:Dialog}) => {
//         myDialog = new Dialog(document.getElementById("root"));
//         myDialog.open();
//     })
// })
// btn2.addEventListener("click",() => {
//     myDialog.close();
// })

// 抽离css文件 css文件的代码分割
// 在webpack4中，官方推出了抽离css的文件的插件
// 而且抽离css一般是在生产环境才会做的
// import "./style.css";
// import "./style1.css";
// import "./style.less";
// console.log(1111)



// webpack与浏览器的缓存
// import _ from 'lodash';
// import $ from  'jquery';

// var dom = $('<div>');
// dom.html(_.join(['hello','world'],'----'));
// dom.appendTo($('body'));

// shimming部分
// 使用shimming的原因在于有一些第三方库没有按照模块书写的规则，所以我们需要配置shimming
// import $ from "jquery";
// import {ui} from './jquery.ui'
// $('body').html("test!");
// ui();


// PWA部分
console.log("hello world!");
if("serviceWorker" in navigator){
    window.addEventListener("load",() => {
        navigator.serviceWorker.register("./service-worker.js")
        .then(registration => {
            console.log("SW registered",registration)
        })
        .catch(error => {
            console.log("SW registered failed",error)
        })
    })
}