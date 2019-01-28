const express = require('express')
const router = express.Router()

const controller = require('../controllers/auth')
const middleware = require('../middlewares/auth')

router.post('/register',middleware.register,controller.register)
router.post('/login',controller.login)
router.get('/logout',middleware.checkAuth,controller.logout)

module.exports = router