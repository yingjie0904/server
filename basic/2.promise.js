let fs = require('fs');
fs.readFile('./name.txt', 'utf8', (err, data)=>{

})
const p = new Promise((resolve, reject)=>{

})

p.then()

function readFile(...args){
    return new Promise((resolve, reject)=>{
        fs.readFile(...args, function(err, data){
            if(err)reject(err);
            resolve(data);
        })
    })
}

readFile('./name.txt', 'utf8').then(data=>{
    return readFile(data, 'utf8')
}).then(data=>{
    console.log(data);
}, err=>{
    console.log(err);
})