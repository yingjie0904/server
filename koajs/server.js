const Koa = require('./koa/application');
let app = new Koa();
let fs = require('fs')

// app.use((ctx)=>{
//     // res.end('hello');
//     // ctx.body = 'hello'
//     console.log(ctx.req.url);
//     console.log(ctx.request.req.url);
//     // 需要把req放到request上 就可以在request拿到req的属性
//     console.log(ctx.request.url);
//     console.log(ctx.url);

//     ctx.body= 'hello';
//     // ctx.response.body = 'hello';
//     console.log(ctx.response.body);
// })

const logger = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('looger');
            resolve();
        }, 1000)
    })
}
// 三个函数组合 结果是1个promise
app.use(async (ctx, next)=>{
    console.log(1);
    // throw new Error('出错！！！');
    await next() // 1 looger 2 3  6 5 4
    
})

app.use(async (ctx, next)=>{
    console.log(2);
    await logger() // 1 2 4 looger 3 6 5 
    return next()
})

app.use(async (ctx, next)=>{
    console.log(3);
    await next();
    // ctx.body = '500';
    // ctx.body = {name: 1}
    ctx.body = fs.createReadStream('1.js')
})
app.on('error', function(err){   //catch
    console.log(err);
})
app.listen(4000)

