const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connection');
require('dotenv').config()  // import .env中的變數設定
const notFound = require('./middleware/not_found')
const errorHandlerMiddleware = require('./middleware/error_handler')


// middleware 
app.use(express.json()); // 解析req.body的json格式資料(所以應該不是只有純javascript的解法需要此，畢竟前面都給你寫他是express的method了)
app.use(express.static('./public'))

// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound) // 可以跟之前app.all('*')的做法比較一下(在03-express-basics檔案)
app.use(errorHandlerMiddleware) // 處理error的middleware // 注意程式碼順序，不同可能會沒有效果

const port = process.env.PORT || 3000; //deploy的選項，可以使用PORT=6000 node app.js(好像PORT=6000是linux指定，window再找八) 啟動程式這樣會開再自行指定的port number，若沒有指定那麼就會是3000 

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI); // process是global variable，可以直接用 process- info about env where the program is being executed
        app.listen(port, () => { console.log(`Server is listening on port ${port}....`)}); // 這行server才會實際運行
    } catch (error) {
        console.log(error);
    }
}

start();


// 慣例上，傳統上，若是web api(請求資料)的話path 會設定成 /api/version/

