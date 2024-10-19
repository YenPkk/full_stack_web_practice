// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


const errorHandlerMiddleware = (err, req, res, next) => {
  // 更細緻的處理mongoose error
  let customError = {  // 設定這個object，若我們有提供值的話就採用我們的，否則就是default(就是這邊or || 邏輯的用意)
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later' 
  } // 這個邏輯也可以cover，原先下面的CustomAPIError的部分，所以下面可以註解掉

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.name === 'ValidationError') {
    console.log(Object.values(err.errors)) // Object大概就是要拿來處理json format的東東(至少在這裡啦)
    customError.msg = Object.values(err.errors).map((item) => {return item.message}).join(',')
    customError.statusCode = 400
  }

  if (err.code && err.code===11000){ // 這個是mongoose的某一種error，若抓到我們就設定以下訊息
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`  // 這個javascript Object用法有興趣再去看一下
    customError.statusCode = 400
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }) // 可以看完整的錯誤信息
  // return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware
