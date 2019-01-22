const express = require('express')
const router = express.Router()

const controller = require('../controllers/profile')

router.patch('/:id',controller.update)

module.exports = router