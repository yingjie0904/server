const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"
class Promise {
    constructor(executor){
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING;
        this.onResolveedCallbacks = [];
        this.onRejectedCallbacks = [];
// 同步时候直接触发，异步时候发布订阅
        let resolve = (value)=>{
            if(this.status ===PENDING){
                this.value = value;
                this.status = FULFILLED;
                console.log();
                this.onResolveedCallbacks.forEach(fn=>fn())
            }    
        }
        let reject = (reason)=>{
            if(this.status ===PENDING){
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        try{
            executor(resolve, reject)
        }catch(e){
            reject(e)
        }
        
    }

    then(onFulfilled, onRejected){
        if(this.status ===FULFILLED){
            onFulfilled(this.value);
        }
        if(this.status ===REJECTED){
            onRejected(this.reason);
        }
        if(this.status === PENDING){
            this.onResolveedCallbacks.push(()=>{
                // ...
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(()=>{
                // ...
                onRejected(this.reason)
            })
        }
    }
}

module.exports = Promise;