const CustomAPIError = require('./custom-error')
const {StatusCodes} = require('http-status-codes') // 使用此套件的好處是易讀性
class BadRequestError extends CustomAPIError {
    constructor(message, statusCode) {
      super(message)
      this.statusCode = StatusCodes.BAD_REQUEST //400
    }
  }

  
module.exports = BadRequestError