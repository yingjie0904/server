const express = require('express');

let app = express();
//express内置了路由系统 而 koa是中间件的方式 koa-router，static，bodyparser
app.get('/', function(req, res){
    res.end('end')
})

app.listen(3000);
