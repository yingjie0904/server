let context = require('./context');
let response = require('./response');
let request = require('./request');
const http = require('http');
let EventEmitter = require('events')
let Stream = require('stream');
class Application extends EventEmitter{
    constructor(){
        super();
        this.context = context; 
        this.response = response;
        this.request = request;
        this.middlewares = [];
    }
    use(fn){
        this.middlewares.push(fn);
    }
    createContext(req, res){    
        // 不会破坏原有的对象，方便扩展
        let context = Object.create(this.context);
        // context.req = req;
        // context.res = res;
        context.request = Object.create(this.request);
        context.response = Object.create(this.response);
        context.req = context.request.req = req;
        context.res = context.response.res = response;
        return context;
    }
    compose(ctx){
        
        let dispatch = (index)=>{
            if(index==this.middlewares.length) 
                return Promise.resolve();
            let middle = this.middlewares[index];
            return Promise.resolve(middle(ctx, ()=>dispatch(index+1)));
        }

        return dispatch(0)
    }
    handleRequest(req, res){
        // 创建上下文
        let ctx= this.createContext(req, res);
        this.compose(ctx).then(()=>{
            // 组合完了 返回body
            let _body = ctx.body;

            if(_body instanceof Stream){
                return _body.pipe(res);
            }else if(typeof _body === 'object'){
                return res.end(JSON.stringify(_body));
            }else{
                res.end(_body)
            }
            res.end(_body);
        }).catch(err=>{
            this.emit('error', err)
        })
    }
    listen(...args){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args);
    }
}

module.exports = Application;