// 用 express framework 做剛剛http的例子

const express = require('express')
const app = express()
// 也可以這樣寫 const app = require('express')()

app.get('/', (req, res) => {          // 每當user request，callback function 做 response的動作
  console.log('user hit the resource') 
  res.status(200).send('Home Page')   // 這邊是用send()
})

app.get('/about', (req, res) => {
  res.status(200).send('About Page')
})

// * means all url // 這邊的意思應該是說若request的path沒有在這邊作定義，那麼就會被這個all的*接到，並invoke callback function
app.all('*', (req, res) => {       // all() take every http verbs(get, post...)
  res.status(404).send('<h1>resource not found</h1>')  // status(status code) 可以自行設定(explict)的設定，default上app物件會自行處理
})

app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})


// 常用的方法
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use 用來setup middleware(中介軟體)
// app.listen 
