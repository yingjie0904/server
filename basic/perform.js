//事务  开始时候做事 结束时候再做一些事
const perform = (anymethod, wrappers)=>{
    wrappers.forEach(wrap => {
        wrap.initialize()
    });
    anymethod();
    wrappers.forEach(wrap => {
        wrap.close()
    });
}
perform(()=>{
    console.log('说话');
}, [
    {
        initialize(){
            console.log('hello');
        },
        close(){
            console.log('byebye');
        }
    },
    {
        initialize(){
            console.log('hello1');
        },
        close(){
            console.log('byebye1');
        }
    }
])
console.log(this)

// 高阶函数中包含柯里化   柯里化： 可以把一个大函数拆分成很多具体功能
// 柯里化可以保留参数 bind
// 判断类型  Object.prototype.toString.call
// const checkType = (type)=>{
//     return (content)=>{
//         return Object.prototype.toString.call(content) === `[object ${type}]`
//     }
// }

// let types = ["Number", "String", "Boolean"];
// let utils = {};
// types.forEach(type=>{
//     utils['is'+type] = checkType(type)
// })

// console.log(utils.isString("123"))
// console.log(utils.isString("345"))

// 通用的柯里化
// const add = (a,b,c,d,e,f)=>{
//     return a+b+c+d+e+f;
// }
// const currying = (fn, arr=[])=>{
//     let len = fn.length;
//     return (...args)=>{
//         arr = arr.concat(args);
//         if(arr.length < len){
//             return currying(fn, arr)
//         }
//         return fn(...arr)
//     }
// }

// let r = currying(add)(1)(2,3)(4,5)(6);
// console.log(r);

const currying = (fn, arr=[])=>{
    let len = fn.length;
    return (...args)=>{
        arr = arr.concat(args);
        if(arr.length < len){
            return currying(fn, arr)
        }
        return fn(...arr)
    }
}

const checkType = (type, content)=>{
    return Object.prototype.toString.call(content) === `[object ${type}]`
}

let types = ["Number", "String", "Boolean"];
let utils = {};
types.forEach(type=>{
    utils['is'+type] = currying(checkType)(type)
})

console.log(utils.isString("123"))