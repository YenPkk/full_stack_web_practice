const mongoose = require('mongoose');

// Mongodb 原生沒有schema(精確一點應該是沒有限制每一筆資料(document)要有什麼欄位，也就是key=value pair以及資料型態的限制)
// 且只有被設定在schema中的值會被傳送到database，ex: post時若有不符合的key或形態會直接被排除
const TaskSchema = new mongoose.Schema({
    // easy basic validation
    name:{
        type:String,
        required:[true, 'must provide name'],
        trim: true, // 去除前後空白(應該是說盡量返回最精簡的形式)
        maxlength: [20, 'name can not be more thant 20 characters']
    }, 
    completed:{
        type:Boolean,
        default: false
    }
});

// model實作(講提供可能比較白話)操作database crud的簡易方式 // Task 是 collection_name (就想成table)
module.exports = mongoose.model('Task', TaskSchema)

