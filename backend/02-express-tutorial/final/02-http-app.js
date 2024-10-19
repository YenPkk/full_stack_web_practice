const http = require('http')

const { readFileSync } = require('fs')
// get all files
const Homepage = readFileSync('./navbar-app/index.html') // 把html檔案讀進來，待會可以直接砍在res.write(<file_var>)當中
// 若是使用http的方式，那麼./navbar-app/index.html檔案當中的所有引用的檔案(圖片,css, javascript檔案)也都必須明確的定義在此，並且在下方以url(在index.html中引用css, image, js的url)的方式清楚定義
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeImage = readFileSync('./navbar-app/logo.svg')
const homeLogic = readFileSync('./navbar-app/browser-app.js')


const server = http.createServer((req, res) => {
  // console.log(req.method)
  const url = req.url
  // home page
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' }) // Headers(meta data) // content-type的值會決定browser如何解析內容(html, css, plain....)
    res.write(Homepage) // body
    res.end()  // response.end() method 一定要加: This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.
  }
  // about page
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>about page</h1>')
    res.end()
  }
   // styles
   else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' })
    res.write(homeStyles)
    res.end()
  }
  // image/logo
  else if (url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' })
    res.write(homeImage)
    res.end()
  }
  // logic
  else if (url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' })
    res.write(homeLogic)
    res.end()
  }
  // 404
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h1>page not found</h1>')
    res.end()
  }
})

server.listen(5000)
