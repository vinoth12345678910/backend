const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 1; // Limit the thread pool size to 1 for testing



setTimeout(()=>{
    console.log('setTimeout 1');
},0)
setImmediate(()=> console.log('setImmediate 1'));
fs.readFile('test-file.txt', () => {
    console.log('I/O finished');
    console.log('-----------------');
    setTimeout(()=>{
    console.log('setTimeout 2');
},0)
 setTimeout(()=>{
    console.log('setTimeout 3');
},3000)
    setImmediate(()=> console.log('setImmediate 2'));

    process.nextTick(() => {
        console.log('Process next tick');
    })

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now()-start,'Hashing done');
    });
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now()-start,'Hashing done');
    });
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now()-start,'Hashing done');
    });
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now()-start,'Hashing done');
    });
})

console.log('Hello from the top level code');