const express = require('express')
const app = express()
const { products } = require('./data')

app.get('/', (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>')
})
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => { // 只顯示products物件的特定屬性值(id, name, image)，而不要全部顯示(直接回傳products)
    const { id, name, image } = product
    return { id, name, image }
  })

  res.json(newProducts)
})

// app.get('api/products/1', (req, res) => {
//   const firstProduct = products.find((product) => {product.id === 1})
//   res.json(firstProduct)
// })

// route parameter `:<variable_name>` it is like a placeholder (user provide the data when request). ex: :productID
app.get('/api/products/:productID', (req, res) => {
  // console.log(req)     // req.params 屬性就是我們上面用route parameter暫且放置的url填入的值 ex: /api/products/1 那麼 req.params = {productID : '1'}
  console.log(req.params) // 要注意params的值是 string，我們利用這個將url寫成活的(ex: 填哪個id數字就回傳相對應的資料)
  const { productID } = req.params

  const singleProduct = products.find(
    (product) => product.id === Number(productID) // 因為是string所以要用Number()轉成數字
  )
  if (!singleProduct) {
    return res.status(404).send('Product Does Not Exist')
  }

  return res.json(singleProduct)
})

// 也可以用多個route params
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params)
  res.send('hello world')
})

// query string param(url param)
// <url>?<query_string>   // query_string 是key=value pair，以&分隔 ex: localhost:5000/api/v1/query?name=john&page=4
app.get('/api/v1/query', (req, res) => {
  // console.log(req.query)  // 用req.query存取query string
  const { search, limit } = req.query  // {search, limit}就是一個物件，search, limit都是這個物件的屬性或是key，他們會接req.query物件對應屬性的值
  // console.log(search, limit)

  let sortedProducts = [...products]

  if (search) {
    sortedProducts = sortedProducts.filter((product) => { // 我嘗試解釋一下這裡的意思: 這邊就跟我很常看不懂python pandas apply的lambda function邏輯一樣，基本上使用function當作para的函數會負責定義，在這裡的話是定義顆粒度，fliter()是一個js array的方法，他返回特定的"元素"並將其他濾除，他的參數是一個func，這邊使用箭頭函數表示，如下 (product這個參數就是array當中的每一個元素，就是這裡很常看不懂，不懂這個參數哪來的，若要真的了解其實可以去看原始碼，反正應該就是會有一個步驟在處理這件事情) => return 要選取的條件，這樣一來filter的動作就完成了
      return product.name.startsWith(search)
    })
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ sucess: true, data: [] }) // 若query string沒有對應的資料，回傳搜尋成功但沒有匹配到資料
  }
  res.status(200).json(sortedProducts)  // **每一個request 只能有一個response ， 所以要特別把return寫出來(才會明確的結束函數)，特別是後面還有其他code的時候(比如上面的if condition)，若沒有指明return js會繼續往下執行，就會發生error(因為會有多個response)，若為最後一行不寫return是沒關係
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})


