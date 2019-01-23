const express = require('express')
const router = express.Router()

const controller = require('../controllers/file')
const middlewareAuth = require('../middlewares/auth')
const middlewareFile = require('../middlewares/file')
const upload = require('../middlewares/upload')

router.get('/class/:idClass/file',[middlewareAuth.checkAuth,middlewareFile.memberValidation],controller.index)
router.post('/class/:idClass/file',[middlewareAuth.checkAuth,middlewareFile.memberValidation,middlewareFile.permission,upload.uploadDocument.single('uploadFile')],controller.store)
router.patch('/class/:idClass/file/:idFile',[middlewareAuth.checkAuth,middlewareFile.memberValidation,middlewareFile.permission],controller.update)
router.delete('/class/:idClass/file/:idFile',[middlewareAuth.checkAuth,middlewareFile.memberValidation,middlewareFile.permission,middlewareFile.delete],controller.delete)

module.exports = router