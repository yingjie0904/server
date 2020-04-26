
// function* read() {
//     yield 1;
//     yield 12
//     yield 13;
// }

// let it = read();

// function add() {
//     console.log(Array.from({0:1, 1:2, 2:3, length:3}))
//     console.log([...arguments])
// }
// add(1, 2, 3, 4, 5);
// ...会调用 Symbol.iterator ***

console.log([
    ...{
        0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]() {
            let len = this.length;
            let index = 0;
            return {
                next: () => {
                    return { value: this[index++], done: index === len }
                }
            }
        }
    }
])

// console.log([
//     ...{
//         0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function *() {
//             let index = 0;
//             while(index !== this.length){
//                 yield this[index++]
//             }
//         }
//     }
// ])
// let a = [1,2,3];
// for(let name in a){
//     console.log(a[name])
// }

// console.log(...{0:1, 1:2, 2:3})
// const fs = require('fs').promises;
// function * read(){
//     let content = yield 1;
//     let age = yield content + 2;
//     let xx = yield {age: age+10}
//     return xx;
// }
// const co = require('co');
// co(read()).then(data=>{
//     console.log(data);
// })

// let it = read();
// it.next().value.then(data=>{
//     it.next(data).value.then(data=>{
//         let r = it.next(data);
//         console.log(r.value);
//     })
// })
// function co(it){
//     return new Promise((resolve, reject)=>{
//         function next(data){
//             let {value, done} = it.next(data);
//             if(!done){
//                 Promise.resolve(value).then(data=>{
//                     next(data);
//                 }, err=>{
//                     reject(err);
//                 })
//             }else{
//                 resolve(value)
//             }
//         }
//         next()
//     })
// }

// async + await  是generator + co 的语法糖

async function read(){
    let r = await Promise.all([p1, p2]);

    try{
        // let content = yield 1;
        // let age = yield content + 2;
        // let xx = yield {age: age+10}
        // return xx;
    }catch(e){
        console.log(e);
    }
}

read().then(data=>{
    console.log(data);
}, err=>{
    console.log(err);
})