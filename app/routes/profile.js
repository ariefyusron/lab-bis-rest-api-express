const express = require('express')
const router = express.Router()

const controller = require('../controllers/profile')
const middleware = require('../middlewares/auth')

router.get('/profile',middleware.checkAuth,controller.show)
router.patch('/profile',middleware.checkAuth,controller.update)

module.exports = router