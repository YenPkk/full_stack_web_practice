const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    const { name } = req.body // req.body 就是post method時body(payload)的內容
    if (name) {
      return res.status(200).send(`Welcome ${name}`)
    }
  
    res.status(401).send('Please Provide Credentials')
  })

module.exports = router