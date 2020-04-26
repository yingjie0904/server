Function.prototype.call = function(obj, ...args){
    const context = obj;
    const attr = Symbol();
    context[attr] = this;
    let res = context[attr](...args);
    delete context[attr];
    return res;
}


Function.prototype.apply = function(obj, args){
    const context = obj;
    const attr = Symbol();
    context[attr] = this;
    let res = context[attr](...args);
    delete context[attr];
    return res;
}

let obj = {0:1, 1:2, 2:3, length:3}
console.log(Array.from(obj));

var a = {
    count:1,
    // toString(){
    //     return this.count++;
    // },
    valueOf(){
        return this.count++;
    } 
};
if(a == 1 && a ==2 && a == 3){
  console.log('成功');
}

var a = [1,2,3];
a.toString = a.shift;
//a.join = a.shift;
if(a == 1 && a ==2 && a ==3 ){
    console.log('相等');
}