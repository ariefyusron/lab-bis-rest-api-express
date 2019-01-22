const express = require('express')
const router = express.Router()

const controller = require('../controllers/auth')
const middleware = require('../middlewares/auth')

router.post('/register',middleware.register,controller.register)

module.exports = router