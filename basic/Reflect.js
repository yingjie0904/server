// let obj = {
//     _a: '',
//     get a(){
//         return thus._a;
//     },
//     set a(value){
//         this._a = value
//     }
// }

// obj.a = 100;
// console.log(obj.a);


// -----------------------------------------------------------------

// Proxy中能代理的方法 Reflect都可以实现
// const obj = {};
// ------------- 1 Reflect.get -------------------
// Reflect.set(obj, 'name', "zyj");
// console.log(obj);
// console.log(Reflect.get(obj, 'name'));

// ------------- 2 Reflect.has-------------------
// console.log('a' in {a:1})
// console.log(Reflect.has({a:1}, 'a'))

// ------------- 3 defineProperty-------------------
// Object.defineProperty;  // 
// Reflect.defineProperty  //
const obj = {a:1};
Object.freeze(obj) 
//configurable 冻结 （vue里 重写了对象数据的get set，如果freeze了，就无法重写，可提高性能）
let flag = Reflect.defineProperty(obj, 'a', {  //不会报错
    value: 100
})
console.log(obj, flag); // { a: 1 } false

// ------------- 4 getOwnPropertyDescriptor-------------------
const obj = {a:1};
console.log(Reflect.getOwnPropertyDescriptor(obj,'a'))
// { value: 1, writable: true, enumerable: true, configurable: true }

// ------------- 5 ownKeys-------------------
let obj = {
    a: 1,
    [Symbol()]: 1
}
console.log(Object.getOwnPropertyNames(obj))
console.log(Object.getOwnPropertySymbols(obj))
console.log(Reflect.ownKeys(obj))

// ------------- 6 setPrototypeOf getPrototypeOf-------------------
// Object.setPrototypeOf()   xxx.__protot__  设置原型链
// Object.getPrototypeOf()   xxx.__protot__  获取原型链
// Reflect.setPrototypeOf()  一样
// Reflect.getPrototypeOf() 

// ------------- 7 bind call apply-------------------
const fn = function (a, b){
    console.log(this, a, b);
}
// fn.apply(1, [2,3])
fn.apply = function(){  // 改写
    console.log('apply');
}

// Function.prototype.apply.call(fn, 1, [2,3]);
Reflect.apply(fn, 1, [2,3])

// ------------- 8 construct ------------------------
class XXX{
    constructor(name){
        this.name = name;
    }
}
let xxx = Reflect.construct(XXX, ['zyj']);
console.log(xxx);

// ------------- 9 construct ------------------------
// Reflect 把对象的方法声明到自己身上了 Object会废弃掉

let obj = {};
Reflect.preventExtensions(obj);
obj.a = 1;
console.log(Reflect.isExtensible(obj));
