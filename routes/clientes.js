const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes-controller')

router.get('/', clientesController.getClientes);

router.post('/', clientesController.postClientes);

router.get('/:id_cliente', clientesController.getUmCliente);

router.patch('/:id_cliente', clientesController.patchCliente);

router.delete('/:id_cliente', clientesController.deleteCliente);

module.exports = router;