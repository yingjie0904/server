// 并发问题 链式调用
// let Promise = require('./myPromise')
let p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('ok');
        // throw new Error('err')
    },100)
})
 
p.then(data=>{
    console.log('success:', data);
}, err=>{
    console.log('err:', err);
})

p.then(data=>{
    console.log('success:', data);
}, err=>{
    console.log('err:', err);
})

p.then(data=>{
    console.log('success:', data);
}, err=>{
    console.log('err:', err);
})