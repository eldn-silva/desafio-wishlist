const mysql = require('../database/mysql');

exports.getClientes = (req, res, next) => {
    res.status(200).send('Rota GET CLIENTES OK')
}

exports.postClientes = (req, res, next) => {
    res.status(201).send('Rota GET CLIENTES OK')
}

exports.getUmCliente = (req, res, next) => {
    res.status(500).send('Rota GET:ID OK');
}

exports.patchCliente = (req, res, next) => {
        res.status(202).send('Rota PATCH OK');
}

exports.deleteCliente = (req, res, next) => {
        res.status(202).send('Rota DELETE OK')
}