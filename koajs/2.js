const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const static = require('koa-static');
// 差图片解析上传
// const bodyparser = require('koa-bodyparser') // 不支持图片

// 1 可以扩展 2 可以决定是否向下执行 3 可以实现权限 4 一般放在真实执行逻辑上面
function bodyparser(){
    return async (ctx, next)=>{
        await new Promise((resolve, reject)=>{
            let arr = [];
            ctx.req.on('data', function(chunk){
                arr.push(chunk);
            })
            ctx.req.on('end', function(){
                ctx.get('context-type')

                let result = Buffer.concat(arr).toString();
                ctx.request.body = result;
                resolve();
            })
        })
        await next();
    }
}

function static(dirname){
    return async (ctx, next)=>{
        try{
            let filePath = path.join(dirname, ctx.path)
            let statObj = await fs.stat(filePath);
            if(statObj.isDirectory()){
                filePath = path.join(filePath, 'index.html')
                await fs.access(filePath);
            }
            ctx.set('Content-Type', mime.getType(filePath)+';charset=utf-8')
            ctx.body = createReadStream(filePath)
        }catch(e){
            await next();
        }
    }
}
app.use(bodyparser());
app.use(static(path.resolve(__dirname, 'upload')))

app.use(async (ctx, next)=>{
    if(ctx.path === '/form' && ctx.method === 'GET'){
        // ctx.set('Content-Disposition', "attachment;filename=FileName.txt");
        ctx.set('Content-Type', "text/html;charset=utf-8");
        ctx.body = fs.createReadStream('./form.html')
    }else{
        await next();
    }
})

// koa所有的异步都异步 promise
app.use(async (ctx, next)=>{
    if(ctx.path === '/login' && ctx.method === 'POST'){
        ctx.body = ctx.request.body;
        // return new Promise((resolve, reject)=>{
        //     let arr = [];
        //     ctx.req.on('data', function(chunk){
        //         arr.push(chunk);
        //     })
        //     ctx.req.on('end', function(){
        //         let result = Buffer.concat(arr).toString();
        //         ctx.body = result;
        //         resolve();
        //     })
        // })

        // 需要统一处理请求体
    }
})

app.listen(3000);