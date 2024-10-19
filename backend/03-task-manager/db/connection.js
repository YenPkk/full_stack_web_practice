const mongoose = require('mongoose')

// 這邊要改成dotenv的方式給
// const connectionString = 'mongodb+srv://tony870918tony:<password>@nodeexpressprojects.o2jkb.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority&appName=NodeExpressProjects'

// 最終採用的寫法
const connectDB = (url) => {
    return mongoose.connect(url) // return 一個Promise
} 

module.exports = connectDB

// 以下這種寫法不能確保db連線後才運行server，所以改用上面的
// mongoose.connect(connectionString)會回傳Promise，所以會用then()這個語法，忘記的話搜尋Promise
// mongoose
//     .connect(connectionString)
//     .then( () => {console.log('CONNECTED TO THE DB...')} )
//     .catch( (err) => {console.log(err)} );
// 我們透過import module會執行檔案內容的特性，在app.js中進行連線