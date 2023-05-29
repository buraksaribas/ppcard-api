const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const { validateToken } = require('../middlewares/auth')
const authValidation = require('../validations/auth.validation')

router.post('/login', authValidation.login, AuthController.login)
router.post('/register', authValidation.register, AuthController.register)
router.post('/forgot', authValidation.forgot, AuthController.forgot)
router.post('/reset/:id/:token', authValidation.reset, AuthController.reset)

module.exports = router