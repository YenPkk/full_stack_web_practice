// 這是async(非同步)
const { readFile, writeFile } = require('fs')

// async(非同步)的概念就是，不會完全依照程式碼由上而下的順序，前面執行玩了才執行後面(執行此檔案就可以看到這樣的現象)
// 舉個實際一點的例子，比如說某一段程式碼要向其他地方request資料(比如要10s)，sync就是要等待完這10秒資料拿到了才繼續執行下面的程式
// 而async就是request了之後就繼續往下執行了，這樣的好處顯而易見，在等待的期間(10s)程式仍可以繼續執行，這一點對於網站來說很重要，不管是browser端還是server端

// 使用callback function 的寫法讓執行順序是固定的(更精確地說，以下是用async寫出sync的方式)
console.log('start')
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  const first = result
  readFile('./content/second.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result
    writeFile(
      './content/result-async.txt',
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('done with this task')
      }
    )
  })
})
console.log('starting next task')
