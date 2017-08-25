
function logObject(prefix, obj) {
    console.log(`TRACER ${prefix}: ${JSON.stringify(obj)}`)
    return obj
}

module.exports = logObject 
