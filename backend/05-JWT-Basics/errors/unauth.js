const CustomAPIError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')
class UnathenticationError extends CustomAPIError {
    constructor(message, statusCode) {
      super(message)
      this.statusCode = StatusCodes.UNAUTHORIZED //401
    }
  }

module.exports = UnathenticationError