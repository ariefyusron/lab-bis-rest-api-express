const express = require('express')
const router = express.Router()

const controller = require('../controllers/modul')
const middlewareAuth = require('../middlewares/auth')
const middlewareModul = require('../middlewares/modul')

router.get('/class/:idClass/modul',[middlewareAuth.checkAuth,middlewareModul.memberValidation],controller.index)
router.post('/class/:idClass/modul',[middlewareAuth.checkAuth,middlewareModul.store,middlewareModul.memberValidation,middlewareModul.permission],controller.store)
router.patch('/modul/:id',middlewareAuth.checkAuth,controller.update)
router.delete('/modul/:id',middlewareAuth.checkAuth,controller.delete)

module.exports = router