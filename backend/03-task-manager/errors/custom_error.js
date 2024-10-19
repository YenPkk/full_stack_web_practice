// 自定義custom error物件 繼承至 javascripte的Error class

class CustomAPIError extends Error{
    constructor(message, statusCode){
        super(message),
        this.statusCode = statusCode
    }
}

// 包成一個創建物件並回傳的function，這個不是一般的constuctor，有時候會看到這種設計方法，使用一般的function 來建立物件
const createCustomError = (msg, status) => {
    return new CustomAPIError(msg, status) // 這邊是實際用constructor建立物件，並return
}

module.exports = {createCustomError, CustomAPIError}