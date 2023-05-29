const router = require('express').Router()
const auth = require('./auth.route')
const fieldType = require('./fieldType.route')
const field = require('./field.route')
const view = require('./view.route')
const user = require('./user.route')

router.use('/user', user)
router.use('/auth', auth)
router.use('/field-type', fieldType)
router.use('/field', field)
router.use('/view', view)

module.exports = router