// 我們接下來要將Error寫得更細一些，切分成多個檔案

// 原先的
// class CustomAPIError extends Error {
//   constructor(message, statusCode) {
//     super(message)
//     this.statusCode = statusCode
//   }
// }


class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
  }
}


module.exports = CustomAPIError
