class Animal{
    type = "哺乳类"  // 声明到实例上
    constructor(){
        this.type = "哺乳类"
    }
    get a(){        //Object.defineProperty(Animal.prototype, a)
        return 1;       //Animal.prototype.a = 1;
    }
    say(){          //放到了原型上
        console.log(1);
    }

    static flag = "动物"    
    // 类上的方法需要加 static  这样写是es7的方法 es6不支持动态赋值
    // es6中只有静态方法:
    static flag(){    // Animal.flag()执行
        return "动物"
    }
    // 静态属性就是定义到类上的属性   es6中只有静态方法
    static get flag(){   
        return "动物";     // Animal.flag  es6的静态属性
    }
    // get 属性访问器
}

let animal = new Animal();
console.log(Animal.flag)

class Tiger extends Animal{
    constructor(name){
        super(name);    // 相当于 Animal.call(Tiger, name)，再把值穿进去
        console.log(super.flag);
    }
    static getAnimal(){
        console.log(super.flag, '---'); // 静态方法的super指的是父类
    }
}
let tiger = new Tiger();
console.log(tiger);

// Tiger.__proto__ = Animal
// call + Object.create() + Object.setPrototypeof 
// 通过Object.defineProperty实现了原型+静态方法属性的定义
//

//  new 的原理
function A(){
    this.name = 1;
    this.age = 2;
}
A.prototype.say= function(){
    // console.log('say')
    return "say"
}

function mockNew(A){
    let obj = {};
    A.call(obj);
    obj.__proto__ = A.prototype;
    return obj;
}
let o = mockNew(A);
console.log('---',o.name);
console.log('---',o.say())

let arr2 = [1,[2,[3,[4,[5]]]]];
// 1 console.log(arr2.flat(Infinity));
// 2 let arr = arr2.toString().split(',').map(i=>Number(i));
// 3 console.log(JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map(item => Number(item)));
// 4 while(arr2.some(item=>Array.isArray(item))){
//     arr2 = [].concat(...arr2);
// }

console.log(arr2);




function sum(a,b){
    console.log('sum');
    return a+b;
}
function len(str){
    console.log('len');
    return str.length;
}
function addC(val){
    console.log('addC');
    return '$'+val
}
// let compose = (...args)=>{
//     return (...values)=>{    
//         let last = args.pop();
//         return args.reduceRight((prev, current)=>{
//             return current(prev)
//         }, last(...values))
//     }
// }

let compose = function(...args){
    return args.reduce((prev, current)=>{
        return function(...values){
            return prev(current(...values))
        }
    })
}

// let compose = (...args)=>args.reduce((prev, current)=>(...values)=>prev(current(...values)))

console.log(compose(addC, len, sum)('abc', "bfd"))