const express = require('express')
const app = express()

// middleware is the heart of express
//  req => middleware => res

// 定義logger middleware function (把某些功能模組化，好統一管理以及傳遞給每個需要的route)
// (req, res, next)必須定義，express會自動處理這些參數的填入，所以又回到那個時常搞不清出的問題，當func_1作為另一個func_main的參數時，func_1的參數怎麼來的，基本上就是func_main給的(函數裏頭做處理)
const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log(method, url, time)
  next() // must pass to "next" middleware (不然會卡住) // 單純使用next() 好像就是轉回到app.get()
  // res.send('Testing')  // or response something to terminate
}

// 將middleware function 傳入，寫在url跟callback func 之間
app.get('/', logger, (req, res) => {
  res.send('Home')
})
app.get('/about', logger, (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
