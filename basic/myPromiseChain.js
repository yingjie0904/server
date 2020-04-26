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
        // 返回一个新的promise
        let promise2 = new Promise((resolve, reject)=>{
            if(this.status ===FULFILLED){
                try{
                    let x = onFulfilled(this.value);
                    resolve(x)
                }catch(e){
                    reject(e);
                }
                
            }
            if(this.status ===REJECTED){
                try{
                    let x = onRejected(this.reason);
                    resolve(x);
                }catch(e){
                    reject(e);
                }
                
            }
            if(this.status === PENDING){
                this.onResolveedCallbacks.push(()=>{
                    // ...
                    try{
                        let x = onFulfilled(this.value)
                        resolve(x)
                    }catch(e){
                        reject(e)
                    }
                    
                })
                this.onRejectedCallbacks.push(()=>{
                    // ...
                    try{
                        let x = onRejected(this.reason)
                        resolve(x);
                    }catch(e){
                        reject(e)
                    }
                })
            }
        })
    }
}

module.exports = Promise;