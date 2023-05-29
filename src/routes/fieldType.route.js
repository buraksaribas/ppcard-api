const router = require('express').Router()
const FieldTypeController = require('../controllers/fieldType.controller')
const { validateToken } = require('../middlewares/auth')

router.post('/create', validateToken, FieldTypeController.create)
router.get('/getAll', validateToken, FieldTypeController.getAll)
router.delete('/delete/:id', validateToken, FieldTypeController.delete)
router.put('/update/:id', validateToken, FieldTypeController.update)

module.exports = router