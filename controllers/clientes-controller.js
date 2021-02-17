exports.getClientes = (req, res, next) => {
    res.status(200).send('Rota GET CLIENTES OK')
}

exports.postClientes = async (req, res, next) => {
    res.status(201).send('Rota POST CLIENTES OK');
}

exports.getUmCliente = async (req, res, next) => {
    res.status(500).send('Rota GET:ID OK');
}

exports.patchCliente = async (req, res, next) => {
        res.status(202).send('Rota PATCH OK');
}

exports.deleteCliente = async (req, res, next) => {
        res.status(202).send('Rota DELETE OK')
}