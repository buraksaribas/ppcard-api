const router = require('express').Router()
const FieldController = require('../controllers/field.controller')
const { validateToken } = require('../middlewares/auth')

router.post('/create', validateToken, FieldController.create)
router.get('/getAll', validateToken, FieldController.getAll)
router.delete('/delete/:id', validateToken, FieldController.delete)
router.put('/update/:id', validateToken, FieldController.update)

module.exports = router