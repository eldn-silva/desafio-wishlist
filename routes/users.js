const express = require('express')
const router = express.Router()
const login = require('../middleware/login')

const UsersController = require('../controllers/users-controller')

router.post('/cadastro', UsersController.createUser)

router.post('/login', UsersController.loginUser)

router.delete('/:id_usuario', login.obrigatorio, UsersController.deleteUser)

router.get('/', login.obrigatorio, UsersController.getUsers)

module.exports = router