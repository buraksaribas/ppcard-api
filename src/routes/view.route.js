const router = require('express').Router()
const ViewController = require('../controllers/view.controller')
const { validateToken } = require('../middlewares/auth')

router.post('/create', validateToken, ViewController.create)
router.get('/get-all', validateToken, ViewController.getAll)
router.get('/get-single/:id', validateToken, ViewController.getAll)
router.delete('/delete/:id', validateToken, ViewController.delete)
router.put('/update/:id', validateToken, ViewController.update)

router.post('/add-field', validateToken, ViewController.addField)
router.post('/delete-field', validateToken, ViewController.deleteField)


module.exports = router