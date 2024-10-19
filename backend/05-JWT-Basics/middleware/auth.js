const {UnathenticationError} = require('../errors') // 可以寫到資料夾就好了耶，應該就是index.js的作用
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnathenticationError('No token provided') // 401 for authorization error
    }

    const token = authHeader.split(' ')[1]

    // decoded jwt
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username} // 這個邏輯跟變數與其實際值雷同，id是變數名稱(會變成object key)，實際值則會是value
        next()
    } catch (error) {
        throw new UnathenticationError("not authorized to acess this route")
    }

}

module.exports = authenticationMiddleware




