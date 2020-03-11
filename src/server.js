import http from 'http'
import fs from 'fs'
import path from 'path'
import mime from 'mime'
import chalk from 'chalk'
import util from 'util'
import ejs from 'ejs'
import url from 'url'
let {readDile, writeFile, readdir, stat} = fs.promises;

let template = fs.readFileSync(path.resolve(__dirname, '../template.html'), 'utf8');
class Server {
    constructor(config){
        // console.log(config);
        this.port = config.port;
        this.template = template;
    }

   async handleRequest(req, res){
        let {pathname} = url.parse(req.url, true);
        // 目录是中文的话，浏览器默认会encodeURIComponent
        pathname = decodeURIComponent(pathname);
        // let filePath = path.join(__dirname, pathname); xx
        let filePath = path.join(process.cwd(), pathname);  // 当前执行命令的目录
        try{
            let statObj = await stat(filePath);
            if(statObj.isDirectory()){
                console.log("目录")
                // 需要判断是不是目录 如果是 读取目录下的文件
                let dirs = await readdir(filePath);
                let templateStr = ejs.render(this.template, {
                    dirs, 
                    path: pathname==='/'?'':pathname
                });
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                res.end(templateStr);
            }else{
                console.log("文件")
                this.sendFile(filePath, req, res, statObj)
            }

        }catch(e){
            this.sendError(e, req, res)
        }

    }
    sendFile(filePath, req, res, statObj){
        res.setHeader('Content-Type', mime.getType(filePath)+ ';charset=utf-8')
        fs.createReadStream(filePath).pipe(res);
    }
    sendError(e, req, res){
        console.log(e)
        res.statusCode = 404;
        res.end('Not Found')
    }
    start(){
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.port, ()=>{
            console.log(`${chalk.yellow('Starting up http-server, serving')} ${chalk.blue('./')}
            Available on:
              http://127.0.0.1:${chalk.green(this.port)}
            Hit CTRL-C to stop the server`)
        })
    }
}

export default Server;