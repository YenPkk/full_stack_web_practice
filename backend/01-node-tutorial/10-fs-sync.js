// fs: file system

const { readFileSync, writeFileSync } = require('fs') // 這是import特定function或東西的寫法
//如同
// const fs = require('fs');
// fs.readFileSync(...)

console.log('start')
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')

writeFileSync(
  './content/result-sync.txt',
  `Here is the result : ${first}, ${second}`,
  { flag: 'a' } // 設定成append模式，defaulit是overwrite
)
console.log('done with this task')
console.log('starting the next one')
