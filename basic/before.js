
// 函数的before
// 重写原型上的方法
// js的核心是 回调
Function.prototype.before = function(beforeFn){
    return (...args)=>{  // 把函数参数收集在一起，变成一个数组
        beforeFn();
        this(...args); // 把数组展开，穿过去
    }
}
// AOP 切片 装饰
const say = (...args)=>{  // 剩余运算符把所有的参数组成一个数组
    console.log("说话", args);
}
const newSay = say.before(()=>{
    console.log('nihao');
})
const newSay2 = say.before(()=>{
    console.log('nihao2');
})
newSay(1,2,3);
newSay2()

// react事务 可以在前面和后面同时增加方法

const after = (times, fn)=>{
    return ()=>{
        if(--times===0){
            fn()
        }
    }
}

let newAfter = after(3, ()=>{
    console.log('ok');
})

newAfter();
newAfter();
newAfter();