var http = require('http')
var fs = require('fs')

http
  .createServer(function (req, res) {

    // const text = fs.readFileSync('./content/big.txt', 'utf8') // 這樣的寫法一次傳送一整個較大的檔案
    // res.end(text)

    const fileStream = fs.createReadStream('./content/big.txt', 'utf8') // 將檔案切成chunk傳送
    fileStream.on('open', () => {
      fileStream.pipe(res)
    })
    fileStream.on('error', (err) => {
      res.end(err)
    })
  })
  .listen(5000)
