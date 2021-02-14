// 独一无二
// 属性私有化

const s1 = Symbol("zyj"); // number or string
const s2 = Symbol("zyj"); // 一直创建新的
// s1 === s2  false

let s1 = Symbol.for("zyj"); //知识标识一下有这个symbol了
let s2 = Symbol.for("zyj"); // 如果有了就用之前的
// s1 === s2  true

console.log(Symbol.keyFor(s1));

let obj = {
  [s1]: 1 // es6写法 [] 将s1的结果取出来作为key
};
obj[s1];

// 元编程  可以改变js原有的功能

let o = {
  name: 1
};

let obj = {
  [Symbol.hasInstance]() {
    return "name" in o;
  }
};

console.log(o instanceof obj);

let obj = {
  [Symbol.hasInstance](value) {
    // 转化原始类型时候 会调用这个方法
    console.log(value);
    return "hello";
  },
  a: 1
};
console.log(obj + 1);

console.log({}.toString());

// instanceof 原理 .__proto__.__proto__
console.log(newArr instanceof MyArray);

// with 通过with 直接拿到with中的属性
