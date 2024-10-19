const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')

//  req => middleware => res
// app.use([<middleware_function1>, <middleware_function2>...]) 傳入多個時用array[]包起來

// 1. use(一次設定全部route) vs route(逐一設定)
// 2. middleware options: a.) our own b.) express c.) third party

// 先前static asset也有使用use設定middleware function
// app.use(express.static('./public')) // 這就是一個使用express內建middleware function的例子

// app.use的位置很重要，express是利用其位置來決定route是否使用這些middleware function，在其之上的route就不會使用這些middleware function的設定，所以通常放在最上面
// 要給多個middleware function 要array包起來，當中的順序決定執行的先後
app.use([logger, authorize]) // use() to use middleware，這樣就可以設定app物件了，不用一個一個route都要填入middleware
// app.use(<path>, logger) 可以指定符合path的才使用這些middleware function， ex: app.use('/api', logger) 那麼只有 api/開頭的，比如/api/items, /api/products會吃到middleware fucntion
// api/home/about/products


app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})
app.get('/api/items', (req, res) => {
  console.log(req.user) // req.user 這個屬性是在authorize middleware function 中指派的數值，在這邊也可以正常使用(所以有此middleware的route都可以存取) 
  res.send('Items')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
