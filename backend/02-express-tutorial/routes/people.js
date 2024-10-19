const express = require('express')
const router = express.Router()

let { people } = require('../data')

const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson,
} = require('../controllers/people')
  
// router設定方法1
// router.get('/', getPeople) // 這邊也是給function物件，不是給function()，前面基礎的版本使用箭頭函數也是一樣道理
// router.post('/', createPerson)
// router.post('/postman', createPersonPostman)
// router.put('/:id', updatePerson)
// router.delete('/:id', deletePerson)

// router設定方法2 chain
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)



module.exports = router