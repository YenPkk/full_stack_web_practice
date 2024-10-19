// 把Error彙總，方便exports
// 使用時只需要import 這整個資料夾 ex: require(./errors) 基本就是會執行這個index.js檔，這樣會就匯入所有定義的error了，當然error也要好好地寫在檔案中並export出去

const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad_request')
const UnathenticationError = require('./unauth')


module.exports = {
    CustomAPIError,
    BadRequestError,
    UnathenticationError
}