const Koa = require('koa');
const app = new Koa();

// app.use((ctx)=>{
//     console.log(ctx.req.url);
//     console.log(ctx.request.req.url);
//     console.log(ctx.request.url);
//     console.log(ctx.url);

//     ctx.response.body = 'hello';
//     console.log(ctx.body);
// })

// compose 组合 中间件use方法可以决定是否向下执行
// await + async

const logger = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('looger');
            resolve();
        }, 1000)
    })
}
// 三个函数组合 结果是1个promise
app.use((ctx, next)=>{
    console.log(1);
    // await logger()  // 1 looger 2 3  6 5 4
    return next()
})

app.use(async (ctx, next)=>{
    await logger() // 1 2 4 looger 3 6 5 
    next()
    console.log(5)
})

app.use((ctx, next)=>{
    console.log(3);
    next();
    console.log(6)
})

app.listen(3000)

// 35:17