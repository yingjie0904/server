// 反柯里化 让某个函数 扩大应用的范围

Object.prototype.toString.call();
Function.prototype.uncurrying = function(){
    return (str)=>{
        return this.call(str);
    }
}
let toString = Object.prototype.toString.uncurrying();
console.log(toString('hello'));

let app = {
    arr: [],
    use(fn){
        this.arr.push(fn);
    },
    compose(){
        // const dispatch = (index)=>{
        //     if(index===this.arr.length) return Promise.resolve();
        //     let middle = this.arr[index];
        //     return Promise.resolve(middle(()=>dispatch(index+1)));
        // }

        // const dispatch = async (index)=>{
        //     if(index===this.arr.length) return;
        //     let middle = this.arr[index];
        //     return middle(()=>dispatch(index+1));
        // }
        // return dispatch(0)

        // return this.arr.reduce((a, b)=>(...args)=>Promise.resolve(a(()=>b(...args))))(()=>{})
        return this.arr.reduce((a, b)=>(...args)=>Promise.resolve(a(()=>b(...args))))
    },
    run(){
        this.compose()(()=>{}).then(()=>{
            console.log("ok");
        })
        // this.compose()
        // console.log("ok");
    }
}

app.use((next)=>{
    console.log(1);
    next();
})
app.use((next)=>{
    console.log(2);
    next();
})
app.use((next)=>{
    console.log(3);
    next();
})

app.run();