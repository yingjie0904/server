let context = {

}
//实现代理功能  ctx.url => ctx.request.url

function defineGetter(property, key){
    context.__defineGetter__(key, function(){
        return this[property][key];
    })
}
function defineSetter(property, key){
    context.__defineSetter__(key, function(newValue){
        return this[property][key] = newValue;
    })
}

defineGetter('request', 'url')
defineGetter('request', 'method')
defineGetter('request', 'path')
defineGetter('response', 'body')

defineSetter('response', 'body')

// context.__defineGetter__('url', function(){
//     return this.request.url
// })

module.exports = context;