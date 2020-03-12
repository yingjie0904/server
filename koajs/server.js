const Koa = require('./koa/application');
let app = new Koa();

app.use((ctx)=>{
    // res.end('hello');
    // ctx.body = 'hello'
    console.log(ctx.req.url);
    console.log(ctx.request.req.url);
    // 需要把req放到request上 就可以在request拿到req的属性
    console.log(ctx.request.url);
    console.log(ctx.url);

    ctx.body= 'hello';
    // ctx.response.body = 'hello';
    console.log(ctx.response.body);
})

app.listen(4000)

