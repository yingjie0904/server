let fs = require('fs')
let path = require('path');
let r = fs.readFileSync(path.resolve(__dirname, 'note.md'));

// // 默认文件 读取出来的都是buffer
// // 内存的表示方式是buffer 内存是二进制的 （十六进制 八 十）
// // 进制转化问题 0.1 + 0.2 != 0.3 (因为需要将值存到内存中，保存时候存储的是二进制的，0。1和0.2都变大了)
console.log(r);

// 进制转化 整数转进制
// 小数 *2 取整  0.1转 0.00011001100110011。。。。11001101 (最后进一位)
// 0.1 * 2 = 0.2 =》 0
// 0.2 * 2 = 0.4 =》 0
// 0.4 * 2 = 0.8 =》 0
// 0.8 * 2 = 1.6 =》 1
// 0.6 * 2 = 1.2 =》 0
// 0.2 * 2 = 0.4 =》 0

// 整数 进制转化 基于编码
// ASCII 默认 就是一个一个字节来表示一个字母或者符号
// 1个字节 有8个bit(位) 最大是8个1（太长了） =》 10进制  255
// 默认 字母

// gb2312 
// 用两个字节来表示中文

// unicode  =>  utf8
// 可变长度 如果是中文采用3个字节来表示，node里默认只支持uft8格式，别的编码可以采用别的模块来实现

// 将10进制 转化成其他进制 255 0xff（十六进制） 0b（二进制） 0o（八进制）

// 将任意进制 转化成 任意其他进制
console.log(100..toString(16))   // 64   // 值变成了string
console.log((0xff).toString(2))  // 11111111

// 将任意进制 转化成 10进制
console.log(parseInt('0xff', 16))   // 255

// base64  二进制的值不能超过64 （核心是进制的转化） 可以反解
// 在浏览器header中，任意url中都可以采用base64，前端实现文件预览 fileReader 也是base64
// 转码后的结果 比原来的内容大

// buffer 就是把二进制表现成了十进制  可以和字符串进行转化
// 1）buffer 的声明方式 (内存 一旦声明不能扩容) （数据可以扩展）
// let buf = Buffer.alloc(5);

// buf = Buffer.from([100, 120, 130]);
// console.log(buf);

// buf = Buffer.from('珠峰');
// console.log(buf);


// // 文件读写 读出来的默认是buffer  写的时候是utf8
// // 2) buffer常见方法  isBuffer  length字节数  toString('base64' | 'utf8')  slice fill
// // copy 拷贝
// let buff = Buffer.alloc(6);
// let buf1 = Buffer.from('和')
// let buf2 = Buffer.from('的')
// let buf3 = Buffer.from('得')

// // 当前buffer.copy（目标buffer，目标开始位置，源的位置，源的结束）
// buf1.copy(buff, 0, 0, 3)
// buf2.copy(buff, 3, 0, 3);
// console.log(buff.toString())

// let newBuffer = Buffer.concat([buf1, buf2, buf3])
// console.log(newBuffer.toString('base64'), newBuffer.length)


let buffer = Buffer.from(`放到第三方
放到第三方
放到第三方`);

Buffer.prototype.split = function(sep){
    let len = Buffer.from(sep).length;
    let offset = 0;
    let result = [];
    let current;

    while((current = this.indexOf(sep, offset))!==-1){
        result.push(this.slice(offset, current));
        offset = current + len;
    }
    result.push(this.slice(offset));
    return result;
}
console.log(buffer.split('\n'));
