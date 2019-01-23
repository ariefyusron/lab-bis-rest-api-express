const express = require('express')
const router = express.Router()

const controller = require('../controllers/profile')
const middleware = require('../middlewares/auth')
const upload = require('../middlewares/upload')

router.get('/profile',middleware.checkAuth,controller.show)
router.patch('/profile',middleware.checkAuth,controller.update)
router.patch('/profile/img',[middleware.checkAuth,upload.uploadProfileImg.single('profileImg')],controller.updateImg)

module.exports = router