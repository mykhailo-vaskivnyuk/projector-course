const { once } = require('events');
const { Readable, Writable } = require('stream');
const { consoleMethodArgs } = require('../helpers/helpers');

// class MyReadable extends Readable {
//     constructor(opt) {
//         super(opt);

//         this._max = 20;
//         this._index = 0;
//         this._canBeAdded = true;
//     }

//     _read(size) {

//         if (++this._index <= this._max) { //  && this._canBeAdded
//             const buf = Buffer.from(`${this._index}`.padStart(2, "0"), 'utf-8');
//             this._canBeAdded = this.push(buf);
//             console.log('Add to buffer:', this._index, 'Can add:', this._canBeAdded);
//         } else {

//         }
//     }
// }

// const counter = new MyReadable({ highWaterMark: 8 });

// consoleMethodArgs(counter, 'emit');

// console.log('Received', counter.read().toString());

// counter.on('data', (chunk) => {
//     console.log('Received chunk', chunk.toString());
// });

// console.log('Received', counter.read().toString());

class MyWritable extends Writable {
    async _write(chunk, encoding, callback) {
        console.log("chunk:", chunk.toString());
        callback();
    }
}

const counter = new MyWritable({ highWaterMark: 2 });

consoleMethodArgs(counter, 'emit');

let i = 0;
const times = 20;

async function write() {
    while (++i <= times) {
        const data = `${i}`.padStart(2, "0")
        const buf = Buffer.from(data, 'utf-8');
        const canWrite = counter.write(buf, 'utf-8', () => console.log("CALLBACK"));

        console.log('Add to buffer:', i, 'Can write:', canWrite);

        if (!canWrite) {
            await once(counter, 'drain');
            // counter.once('drain', write);
            // return;
        }
    }
}

write();
