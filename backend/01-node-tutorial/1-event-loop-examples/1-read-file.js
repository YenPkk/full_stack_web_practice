const { readFile, writeFile } = require('fs')

// 看console.log的執行順序
console.log('started a first task')
// CHECK FILE PATH!!!!
readFile('../content/first.txt', 'utf8', (err, result) => {  // 當IO完成時，不管是回傳error, data才會去invoke callback function
  if (err) {
    console.log(err)
    return
  }
  console.log(result)
  console.log('completed first task')
})
console.log('starting next task')
