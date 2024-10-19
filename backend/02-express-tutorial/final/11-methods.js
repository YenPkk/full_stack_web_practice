const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data (post method body)   // { extended: false } means use querystring library
app.use(express.urlencoded({ extended: false })) // it's a built-in middleware funciton in Excpress. It parsees incoming requests with url encoded payloads(body) and is based on body-parser.

// parse json (處理傳進來的json data)，若使用純javascript的寫法，需要此middleware func才可以解析post傳進來的body，一樣使用req.body存取
app.use(express.json())

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

// browser default http method is "get" 
// 不能直接使用post method，若要使用需借助第三方套件postman...，或是用html的form表單(可以使用post method)
// http request message 中 body是optional的，但若是使用post method基本上就一定會有，因為這是我們提供資料給server的方式，body又稱payload(不確定是不是特別指post method的時候)

// this is the route that javascript.html demo used
// 注意有兩個一樣的url '/api/people'，但是因為method不同(get, post)所以算是不同的route
app.post('/api/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
})

// 下載postman app 可以用來快速測試http request(各種方法)，而不需要先用出一個前端的介面才能測試
app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, data: [...people, name] })
})


app.post('/login', (req, res) => {
  const { name } = req.body // req.body 就是post method時body(payload)的內容
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }

  res.status(401).send('Please Provide Credentials')
})


// put is used to update data
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params // 使用route param得知要更改的是哪一筆資料(id)
  const { name } = req.body // request message 的 body中要有如何更改以上指定id的資料
  
  // 要自行寫update的邏輯，注意一下update是對於response來說，不是去更改原始的資料
  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
})

// method delete
app.delete('/api/people/:id', (req, res) => {
  // 實作delete的邏輯，這邊是濾除掉指定的id，返回沒有這個id的array
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

// 再次提醒: server web api 的主要目的就是提供data，使用者透過http method request這些data