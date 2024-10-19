// 若沒有自定義cutomer error handler 會有預設的執行
const {CustomAPIError} = require('../errors/custom_error')

const errorHandlerMiddleware = (err, req, res, next) => {  // 這邊參數多一個err
    if (err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    console.log(err)
    // return res.status(err.statusCode).json({msg: err.message})
    return res.status(500).json({msg: 'something went wrong, please try agina'})
}

module.exports = errorHandlerMiddleware
