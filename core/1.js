// let ncp = require('ncp');
// let path = require('path');
// let {promisify, inherits} = require('util');
// // cp -r
// // ncp(path.resolve(__dirname, 'node.md'), path.resolve(__dirname, 'node2.md'), (err)=>{
// //     console.log(err);
// // })
// ncp = promisify(ncp);
// (async ()=>{
//     await ncp(path.resolve(__dirname, 'node.md'), path.resolve(__dirname, 'node2.md'))
// })()


// const promisify = (fn)=>(...args)=>{
//     return new Promise((resolve, reject)=>{
//         fn(...args, function(err){
//             if(err) reject(err);
//             resolve();
//         })
//     })
// }

// // 继承
// function Parent(){ }

// function Child(){
//     Parent.call(this);
// }

// // Child.prototype.__proto__ = Parent.prototype;
// // Reflect.setPrototypeOf(Child.prototype, Parent.prototype);
// // Child.prototype = Object.create(Parent.prototype);
// inherits(Child, Parent)



