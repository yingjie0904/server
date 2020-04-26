// let {name,age, ...args} = {name: '123', age: '2', abc: '2', d: 2}
// console.log(name,age, args);

// let [,b,...args] = ["dsa", "123", "345"];
// console.log(b,args);

// let arr = [1,2,3];
// console.log(...arr);
// 展开运算符 一般合并数组 合并对象
// let json = {name: 'zyj', age: 12}
// console.log(...json)

// let a1 = [1,2]
// let a2 = [3,4]
// console.log([...a1,...a2])

// set map  es6新的数据类型 不能放重复的
// let set = new Set([1,2,3]);
// console.log(set)  // 没有key
// set.add(4);
// set.clear();
// set.entries()  // Object.entries  .keys    .values
// set.has();

let a1 = [1,2,3];
let a2 = [1,2,3,4,5,6,7];
let a3 = {a:1, b:2}
for(let name in a3){
    console.log(name)
}
//  -------------------------------
// for in 的特点:

// for ... in 循环返回的值都是数据结构的 键值名。
// 遍历对象返回的对象的key值,遍历数组返回的数组的下标(key)。

// for ... in 循环不仅可以遍历数字键名,还会遍历原型上的值和手动添加的其他键。

// 总结一句: for in 循环特别适合遍历对象。

// for of 特点
// for of 循环用来获取一对键值对中的值,  ---- 而 for in 获取的是 键名
// 一个数据结构只要部署了 Symbol.iterator 属性, 就被视为具有 iterator接口, 就可以使用 for of循环。
// 对象{},没有 Symbol.iterator这个属性,所以使用 for of会报 obj is not iterable
// for of 不同与 forEach, 它可以与 break、continue和return 配合使用,也就是说 for of 循环可以随时退出循环。
// 数组 Array
// Map
// Set
// String
// arguments对象
// Nodelist对象, 就是获取的dom列表集合

// 提供了遍历所有数据结构的统一接口
// 也可以给一个对象部署 Symbol.iterator属性。
// -------------------------------
const arr = ['a', 'b', 'c']
    // for in 循环
    for (let i in arr) {
        console.log(i)
        // 0
        // 1
        // 2
    }
    
    // for of
    for (let i of arr) {
        console.log(i)
        // a
        // b
        // c
    }
const arr = ['a', 'b']
// 手动给 arr数组添加一个属性
arr.name = 'qiqingfu'

// for in 循环可以遍历出 name 这个键名
for (let i in arr) {
    console.log(i)
    // 0
    // 1
    // name
}

// let s1 = new Set([...a1, ...a2]);  // 并集
// console.log(s1);

let s1 = new Set([...a1]);  // 交集 差集
let s3 = a2.filter(item=>{
    return !s1.has(item)
})
console.log(s3);

// 只有[Symbol.iterator], 可以forEach 可以for of

//-------------------------------------------------------------------------

// ... 和Object.assign() 一样 浅拷贝
// JSON.parse(SON.stringify())
// typeof 
// Object.prototype.toString.call
// instanceOf 可以判断类型 判断是谁的实例
// constructor  构造函数

const deepClone = (value, hash = new WeakMap)=>{
    if(value==null) return value;  // null undefined的情况
    if(typeof value !== 'object') return value;
    if(value instanceof RegExp) return new RegExp(value);
    if(value instanceof Date) return new Date(value);

    // 对象或数组(循环) for in
    let instance = new value.constructor;
    if(hash.has(value)){
        return hash.get(value);
    }
    hash.set(value, instance)
    for(let key in value){
        if(value.hasOwnProperty(key)){
            instance[key] = deepClone(value[key], hash);
        }
    }
    return instance;
}
let obj = {a:1};
obj.b = obj;
console.log(deepClone(obj)); // 如果obj已经拷贝过一次 在用到obj时候 直接返回就好了

// map 存键值对  也不能放重复的项
let newMap = new Map([[1,2], [3,4], [3,4]])
class My{
    constructor(){
        this.a = 1;
    }
}
let obj = new My();
let newMapWeak = new WeakMap([obj, 2])  
obj=null;
//WeakMap key只能放对象  弱引用 ,obj销毁了，newMapWeak就没了
// Map的话 obj销毁了，newMapWeak还在
console.log(newMapWeak);
