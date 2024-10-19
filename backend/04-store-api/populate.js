// 將products.json的資料寫入資料庫
require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI); // 與資料庫連線
        await Product.deleteMany(); // 刪除所有資料，確保當前collection是乾淨的
        await Product.create(jsonProducts); // 上傳資料， jsonProducts是一個array，當中的所有元素都是object，這樣就會是一筆一筆的資料(document)
        console.log('success!!!') 
        process.exit(0) // 終止程式，否則會一直run(event loop)，linux exit code 0是成功       
    } catch (error) {
        console.log(error)
        process.exit(1) // 非0(ex: 1)是失敗
    }
}

start()