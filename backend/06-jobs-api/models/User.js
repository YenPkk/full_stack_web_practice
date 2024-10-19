require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true, // 實際上不是validation, 是test時會用到的東西之類的(還是只是唯一識別碼?!)
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
})

// It's a mongoose middleware function
// to hash password
UserSchema.pre('save', async function(next) {  // 這邊要使用function(){...}的宣告方式
  const salt = await bcrypt.genSalt(10) // generate random bytes // 參數是round的次數，越大密碼越強，但需要更多的資源使用(時間也是一個考量，通常10就可以了)
  this.password = await bcrypt.hash(this.password, salt)
  next()
}) // 這樣做的邏輯是，將使用者傳過來的password，hash過後再新增到資料庫當中，把這個過程包在Model.create的過程當中

// to generate jwt token
// 這個方式可以再拿到Document物件實例時，直接.<function()>使用
UserSchema.methods.createJWT = function() {
  return jwt.sign({userID: this._id, name: this.name }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
} // 要製造token時， Document.createJWT()

// to compare password
UserSchema.methods.comparePassword = async function(canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password) // 利用將使用者輸入的密碼canditatePassword，做hash的操作，去比對先前hash過後的值，看一不一樣，就知道密碼是否正確
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
