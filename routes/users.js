const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users-controller');

router.post('/cadastro', UsersController.createUser);

router.post('/login', UsersController.loginUser);

module.exports = router;