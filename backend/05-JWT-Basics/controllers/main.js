// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const {BadRequestError} = require('../errors')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {
    const {username, password} = req.body
    // validation options
    // 1. mongoose validation(schema)
    // 2. Joi package
    // 3. check in controller, manually thorw error(use this)
    if (!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    console.log(username, password)

    // just for demo, normally provided by DB
    const id = new Date().getDate()

    // try to keep payload small, better experience for user (記得當中不要用密碼)
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!! (jwt secret)
    // 所以jwt的運作方式應該是這樣的，首先先驗證並抓取登入的使用者資料，抓幾個欄位值，並與自己設定的secret字串，根據某個演算法算出token並回傳給使用者，之後使用者request時會帶著這個token，而server端可以decode這個token，拿到是哪個user發了這個request
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '30d'}) // payload, secret, option
    
    res.status(200).json({msg:'user created', token});
};

const dashboard = async (req, res) => {
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({msg:`Hello ${req.user.username}`, secret:`Here is your authorized data, your t lucky number is ${luckyNumber}`})

};

module.exports = {
    login,
    dashboard
};
