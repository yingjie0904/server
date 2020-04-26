const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const Router = require('koa-router');
const fs = require('fs')

let app = new Koa();

app.use(static(__dirname))
app.use(bodyparser());

let router = new Router();

router.get('/form', async (ctx, next)=>{
    ctx.set('Content-type', 'text/html')
    ctx.body = fs.createReadStream('./form.html')
})

router.post('/login', async (ctx, next)=>{
    ctx.body = ctx.request.body;
})

app.use(router.routes());

app.listen(3000);