//console.log(arguments)
//console.log(require('module').wrapper)
const C = require("./test-module.js")
const calc1 = new C()
console.log(calc1.add(2, 3));