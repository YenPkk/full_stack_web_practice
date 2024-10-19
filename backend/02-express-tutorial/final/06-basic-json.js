const express = require('express')
const app = express()
const { products } = require('./data')
app.get('/', (req, res) => {
  res.json(products) // json() 會執行原生javascript的 stringfy() method，將input變成 JSON string(用來傳輸用的格式)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})