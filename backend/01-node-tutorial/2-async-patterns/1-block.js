const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Home Page')
  }
  if (req.url === '/about') {
    // blocking code         // 這樣的寫法是sync，注意並非只有連線到/about的使用者需要等待，若同時有多個使用者request，只要有一個人先請求/about，其他所有人都必須等待其執行完畢，才可以繼續request
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(`${i} ${j}`)
      }
    }
    res.end('About Page')
  }
  res.end('Error Page')
})

server.listen(5000, () => {
  console.log('Server listening on port : 5000....')
})
