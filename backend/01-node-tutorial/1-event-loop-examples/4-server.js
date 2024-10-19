const http = require('http')

const server = http.createServer((req, res) => {
  console.log('request event')
  res.end('Hello World')
})

// listen 是一個async ，我們設置它，也就是一個event loop，它等待 requests come in ，當實際requests come in，就run callback function
server.listen(5000, () => {
  console.log('Server listening on port : 5000....') // 這邊只是demo，實際上這個callback可能會寫request有沒有成功之類的(http code 200, 404....)
})
