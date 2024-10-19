const express = require('express')
const router = express.Router()
const { login, dashboard } = require('../controllers/main')
const authenticationMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authenticationMiddleware, dashboard) // 記得這種寫法吧，只在特定的route上用middleware
router.route('/login').post(login)

module.exports = router