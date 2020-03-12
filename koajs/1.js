const Koa = require('koa');
const app = new Koa();

app.use((ctx)=>{
    console.log(ctx.req.url);
    console.log(ctx.request.req.url);
    console.log(ctx.request.url);
    console.log(ctx.url);

    ctx.response.body = 'hello';
    console.log(ctx.body);
})

app.listen(3000)