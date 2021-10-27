const sleep = (duration, message) => {
    const start = Date.now();
    let time = 0;
    while(duration - time > 0) {
        time = Date.now() - start;
    }
    console.log(message || "sleep:", time);
}

function consoleMethodArgs(object, methodName) {
    const originMethod = object[methodName];
    object[methodName] = function(...args) {
        console.log(args);
        originMethod.apply(this, args);
    }
}

module.exports = {
    sleep,
    consoleMethodArgs,
};
