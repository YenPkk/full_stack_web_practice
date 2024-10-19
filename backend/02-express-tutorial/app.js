const express = require('express')
const app = express()

const people = require('./routes/people')
const auth = require('./routes/auth')

// static assets
app.use(express.static('./methods-public'))

// parse form data (post method body)   // { extended: false } means use querystring library
app.use(express.urlencoded({ extended: false })) // it's a built-in middleware funciton in Excpress. It parsees incoming requests with url encoded payloads(body) and is based on body-parser.

// parse json (處理傳進來(req)的json data)，需要此middleware func才可以解析post傳進來的body，一樣使用req.body存取
app.use(express.json())

app.use('/api/people', people) // using router // 'api/people'是base，所以router檔案中(這邊是./routes/people.js)的所有base要去除，否則會重複，比如說檔案中有個route是/api/people/home，那麼最終出來就會變成/api/people//api/people/home，不是我們要的結果
app.use('/login', auth)


app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

// 再次提醒: server web api 的主要目的就是提供data，使用者透過http method request這些data