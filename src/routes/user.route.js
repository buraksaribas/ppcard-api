const router = require('express').Router()
const UserController = require('../controllers/user.controller')
const { validateToken } = require('../middlewares/auth')
const userValidation = require('../validations/user.validation')

router.get('/me', validateToken, UserController.me)
router.post('/change-password', validateToken, userValidation.changePassword, UserController.changePassword)

module.exports = router