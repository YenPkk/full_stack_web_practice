const http = require('http')

// 這樣就是一個最簡單的架構(可以在本機瀏覽器開啟)
// server 接收request(req), 回response(res)

// const server = http.createServer((req, res) => {
//   res.write('Welcome to our home page')
//   res.end()
// })
// // port
// server.listen(5000)

//////////////////////////////////////////////////////

const server = http.createServer((req, res) => {
  //   if (req.url === '/') {
  //     res.end('Welcome to our home page')
  //   }
  //   if (req.url === '/about') {
  //     res.end('Here is our short history')
  //   }
  //   res.end(`
  //   <h1>Oops!</h1>
  // <p>We can't seem to find the page you are looking for</p>
  // <a href="/">back home</a>
  //   `)
  // ###################################
  // ###################################
  //
  //  IF YOU GET ERRORS WHILE USING ABOVE SETUP,
  // SWITCH TO IF, ELSE IF, ELSE (BELOW)
  // WE COVER THE CAUSE, LATER IN EXPRESS TUTORIAL
  if (req.url === '/') {            // 稍微註解一下 "/"跟目錄就是home page，比如說google.com就是home page，只是我們不會寫成google.com/
    res.end('Welcome to our home page')
  } else if (req.url === '/about') {
    res.end('Here is our short history')
  } else {
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `)
  }
})

// port
server.listen(5000)
