const express = require('express')
const path = require('path')

const app = express()

// static asset(ex: image, css, js...) are just files that server doesn't have to change
// setup static and middleware(中介軟體)
app.use(express.static('./public')) // 放在public目錄(自行建立)是common的作法(但不一定要放在這個目錄當中) // flask中也有static目錄(就叫做static)做一樣的事情
// express這樣做完之後，就會建立我們在純http方式要手動設定的路徑(url)與檔案對應
// 所以若request這些public目錄下的檔案，也可以獲得這些檔案的內容 ex: localhost:5000/styles.css  // 跟flask的邏輯差不多

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html')) // 在此使用絕對路徑給file
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})
