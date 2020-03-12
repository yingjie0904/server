let context = require('./context');
let response = require('./response');
let request = require('./request');
const http = require('http');
class Application {
    constructor(){
        // 不会破坏原有的对象，方便扩展
        this.context = context; 
        this.response = response;
        this.request = request;
    }
    use(fn){
        this.fn = fn;
    }
    createContext(req, res){    
        let context = Object.create(this.context);
        // context.req = req;
        // context.res = res;
        context.request = Object.create(this.request);
        context.response = Object.create(this.response);
        context.req = context.request.req = req;
        context.res = context.response.res = response;
        return context;
    }
    handleRequest(req, res){
        // 创建上下文
        let ctx= this.createContext(req, res);
        this.fn(ctx)
    }
    listen(...args){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args);
    }
}

module.exports = Application;