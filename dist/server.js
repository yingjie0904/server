"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mime = _interopRequireDefault(require("mime"));

var _chalk = _interopRequireDefault(require("chalk"));

var _util = _interopRequireDefault(require("util"));

var _ejs = _interopRequireDefault(require("ejs"));

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let {
  readDile,
  writeFile,
  readdir,
  stat
} = _fs.default.promises;

let template = _fs.default.readFileSync(_path.default.resolve(__dirname, '../template.html'), 'utf8');

class Server {
  constructor(config) {
    // console.log(config);
    this.port = config.port;
    this.template = template;
  }

  async handleRequest(req, res) {
    let {
      pathname
    } = _url.default.parse(req.url, true); // 目录是中文的话，浏览器默认会encodeURIComponent


    pathname = decodeURIComponent(pathname); // let filePath = path.join(__dirname, pathname); xx

    let filePath = _path.default.join(process.cwd(), pathname); // 当前执行命令的目录


    try {
      let statObj = await stat(filePath);

      if (statObj.isDirectory()) {
        console.log("目录"); // 需要判断是不是目录 如果是 读取目录下的文件

        let dirs = await readdir(filePath);

        let templateStr = _ejs.default.render(this.template, {
          dirs,
          path: pathname === '/' ? '' : pathname
        });

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(templateStr);
      } else {
        console.log("文件");
        this.sendFile(filePath, req, res, statObj);
      }
    } catch (e) {
      this.sendError(e, req, res);
    }
  }

  sendFile(filePath, req, res, statObj) {
    res.setHeader('Content-Type', _mime.default.getType(filePath) + ';charset=utf-8');

    _fs.default.createReadStream(filePath).pipe(res);
  }

  sendError(e, req, res) {
    console.log(e);
    res.statusCode = 404;
    res.end('Not Found');
  }

  start() {
    let server = _http.default.createServer(this.handleRequest.bind(this));

    server.listen(this.port, () => {
      console.log(`${_chalk.default.yellow('Starting up http-server, serving')} ${_chalk.default.blue('./')}
            Available on:
              http://127.0.0.1:${_chalk.default.green(this.port)}
            Hit CTRL-C to stop the server`);
    });
  }

}

var _default = Server;
exports.default = _default;