const express = require('express')
const router = express.Router()
const login = require('../middleware/login')

const clientesController = require('../controllers/clientes-controller')

router.get('/', login.obrigatorio, clientesController.getClientes)

router.post('/', login.obrigatorio, clientesController.postClientes)

router.get('/:id_cliente', login.obrigatorio, clientesController.getUmCliente)

router.patch('/:id_cliente', login.obrigatorio, clientesController.patchCliente)

router.delete('/:id_cliente', login.obrigatorio, clientesController.deleteCliente)

module.exports = router