// 发布订阅模式(发布和订阅没有关系)   
// 观察者模式

// on emit

// let e = {
//     arr: [],
//     on(fn){
//         this.arr.push(fn)
//     },
//     emit(){
//         this.arr.forEach(item=>item())
//     }
// }

class Subject {  // 被观察者
    constructor(){
        this.arr = [];
        this.state = "我很开心";
    }
    attach(o){
        this.arr.push(o);
    }
    setState(newState){
        this.state = newState;
        this.arr.forEach(o=>o.update(newState))
    }
}

class Observer {
    constructor(name){
        this.name = name;
    }
    update(newState){
        console.log(this.name + 'baby'+ newState);
    }
}

