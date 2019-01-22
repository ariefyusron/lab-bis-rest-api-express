const express = require('express')
const router = express.Router()

const controller = require('../controllers/class')
const middlewareAuth = require('../middlewares/auth')
const middlewareClass = require('../middlewares/class')

router.get('/class',middlewareAuth.checkAuth,controller.index)
router.post('/class',[middlewareAuth.checkAuth,middlewareClass.store],controller.store)
router.delete('/class/:id',[middlewareAuth.checkAuth,middlewareClass.delete],controller.delete)

module.exports = router