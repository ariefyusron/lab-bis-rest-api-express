const express = require('express')
const router = express.Router()

const controller = require('../controllers/admin')
const middleware = require('../middlewares/admin')

router.get('/',middleware.key,controller.index)

module.exports = router