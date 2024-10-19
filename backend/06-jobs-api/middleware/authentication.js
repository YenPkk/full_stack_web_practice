const User = require('../models/User')
const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')
require('dotenv').config() // 好像不用每個file都要寫，反正app.js有就好，其他都算是被import的module

const authMiddleware = async (req, res, next) => {
    // console.log(req.headers)
    const request_token_header = req.headers.authorization  //req.headers.authorization
    // console.log(request_token_header)

    if (!request_token_header || !request_token_header.startsWith('Bearer ')){
        throw new UnauthenticatedError('anthenticate invalidddd')
    }

    const req_token = request_token_header.split(' ')[1]
    // console.log(req_token)
    try {
        // 把從token解出來的使用者資訊放到req.user待之後使用(controller操作)
        const payload = jwt.verify(req_token, process.env.JWT_SECRET)
        req.user = {userID:payload.userID, name:payload.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('anthenticate invalid') 
    }
}
module.exports = authMiddleware