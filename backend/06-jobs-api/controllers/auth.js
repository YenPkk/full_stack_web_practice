const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
// const bcrypt = require('bcryptjs') //在model中做了 // use to hash password(把密碼加密用的) 記住永遠不要儲存string password
const jwt = require('jsonwebtoken')

// 這邊把password做hash，還利用id, name做成jwt 
const register = async (req, res) => {
    // 這邊mongoose validator會幫我們驗證使用者是否有給值(因為這邊是要建立新資料)
    const user = await User.create({...req.body}) // ...用來展開，不然會多包一層
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json( {user: {name: user.name }, token})
}
 
const login = async (req, res) => {
    const {email, password} = req.body
    
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    
    const user = await User.findOne({email}) // 這邊要用findOne，不能用find，可能是因為email的shcema本來就有unique
    

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    // compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credntials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json( {user: {name: user.name }, token})
}

module.exports = {
    register, 
    login
}