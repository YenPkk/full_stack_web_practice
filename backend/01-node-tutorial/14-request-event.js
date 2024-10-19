const http = require('http')

// const server = http.createServer((req, res) => {
//   res.end('Welcome')
// })

// Using Event Emitter API
const server = http.createServer()
// emits request event
// subcribe to it / listen for it / respond to it
server.on('request', (req, res) => { // 這邊的event_name一定要是request，有定義的
  res.end('Welcome')                 // 注意很多的module都有使用到event的概念或是有被實作
})

server.listen(5000)   // server可以listen request這一個event
