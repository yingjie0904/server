// 并发问题 模式
// 1)读取数据  node异步 

const fs = require('fs')
const path = require('path')
let school = {};
const after = (times, fn)=>{
    return ()=>{
        --times === 0 && fn();
    }
}
let newAfter = after(2, ()=>{  //执行2次之后再做
    console.log(school);
})
fs.readFile(path.resolve(__dirname,'name.txt'), 'utf-8', (err, data)=>{
    school['name'] = data;
    newAfter()
})
fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf-8', (err, data)=>{
    school['age'] = data;
    newAfter()
})

