const fs = require("fs");

const sleep = (duration, message) => {
    const start = Date.now();
    let time = 0;
    while(duration - time > 0) {
        time = Date.now() - start;
    }
    console.log(message || "sleep:", time);
}

console.log("START")

console.log("-", "setTimeout 1", 100);
setTimeout(() => console.log("--", "timer 1"), 100);

console.log("-", "setTimeout 2", 2005);
setTimeout(() => console.log("--", "timer 2"), 2005);

console.log("-", "setImmediate 1");
setImmediate(() => console.log("--", "immediate 1"));

sleep(1000, "- sleep");

console.log("-", "fs.readFile 1");
fs.readFile(__filename, () => {
    console.log("--", "file callback 1");

    console.log("--", "setImmediate 3");
    setImmediate(() => console.log("---", "immediate 3"));

    console.log("--", "Promise.resolve 1");
    Promise.resolve()
        .then(() => console.log("---", "then 1"))
        .then(() => {
            console.log("----", "process.nextTick 1");
            process.nextTick(() => console.log("-----", "nextTick 1"));
        })
        .then(() => console.log("-----", "then 2"))
        .then(() => console.log("------", "then 3"));
    
    console.log("--", "process.nextTick 2");
    process.nextTick(() => console.log("---", "nextTick 2"));

    console.log("--", "process.nextTick 2*");
    process.nextTick(() => {
        console.log("---", "nextTick 2*");
        Promise.resolve()
        .then(() => console.log("----", "then 1*"))
        .then(() => {
            console.log("-----", "process.nextTick 1*");
            process.nextTick(() => console.log("------", "nextTick 1*"));
        })
        .then(() => console.log("------", "then 2*"))
        .then(() => console.log("-------", "then 3*"))
    });
});

sleep(1000, "- sleep");

console.log("-", "setImmediate 2");
setImmediate(() => console.log("--", "immediate 2"));

console.log("-", "setImmediate 4");
setImmediate(() => {
    console.log("--", "immediate 4");

    console.log("--", "setImmediate 6");
    setImmediate(() => console.log("---", "immediate 6"));

    console.log("--", "fs.readFile 2");
    fs.readFile(__filename, () => {
        console.log("---", "readFile callback 2");
    
        console.log("---", "setImmediate 5");
        setImmediate(() => console.log("----", "immediate 5"));
    });
});

console.log("END")

// console.log('A');
// while(true) {}
// process.nextTick(() => console.log('B'));
// setTimeout(() => console.log('C'));

// const fs = require("fs");

// fs.readFile(__filename, () => {
//     setTimeout(() => console.log('A'), 10);
//     setImmediate(() => console.log('B'));
// });

// setTimeout(() => {
//     console.log('A');
//     Promise.resolve()
//         .then(() => console.log('B'))
//         .then(() => console.log('C'));
// }, 0)
  
// setTimeout(() => {
//     console.log('D')
// }, 0);

// setTimeout(() => console.log('A'), 0);
// process.nextTick(() => console.log('B'));
// console.log('C');
