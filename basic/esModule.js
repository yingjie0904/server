// es6 模块化  esModule(es6)  commonjs(node模块)

//es6 静态导入  不能在作用域中使用
//    import export  每个文件都是模块
//    动态导入 

// let a = 1;
// export {
//   a as c // as 别名  导出的是一个接口
// };

// export default 导出值  导入的变量不能更改
// export default "hello";
// import _ from './hello'

// export {b} from './b'  导入后集中导出
// export * from './y'
// console.log(b)  x   不能使用导出的变量


// 动态导入  可以在作用域中使用
let btn = document.createComment('button');
btn.addEventListener('click', function(){
    // 动态使用jsonp加载一个新的文件 import返回的是一个promise
    import('./src/file').then(data=>{
        console.log(data); 
    })
})

document.body.appendChild(btn);