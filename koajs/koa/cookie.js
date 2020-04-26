// ## http是无状态的 不知道每次谁来了
// cookie存放在浏览器，服务器可以设置，每次请求时会带上cookie
// cookie不安全 不能村敏感信息

// session 服务端（基于cookie的）在服务器的内存（容易丢） =》redis数据库（get，set）


const http = require('http')

http.createServer((req, res)=>{
    if(req.url === 'write'){
        res.setHeader('Set-Cookie', 'name=zf');
        res.end('write ok');
        return;
    }
    if(req.url === 'read'){
        res.end(req.headers.cookie);
    }
}).listen(3000);
