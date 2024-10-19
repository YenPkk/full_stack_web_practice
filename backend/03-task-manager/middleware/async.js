// middleware function
// 最終要返回的是一個middleware function
const asyncWrapper = (fn) => {
    return async (req, res, next) => { // 前面這塊是middleware的部分
        try {
            await fn(req, res, next)   // 這邊是原先controller的部分 // Async functions always return a promise. 因為fn會是一個async 所以前面可以接await
        } catch (error) {
            next(error) // pass to next middleware
        }
    }
}

module.exports = asyncWrapper