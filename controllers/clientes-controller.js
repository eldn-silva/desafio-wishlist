const mysql = require('../database/mysql')

exports.getClientes = async (req, res, next) => {
    try {
        const result = await mysql.execute("SELECT * FROM clientes")
        
        const response = {
        quantidade: result.length,
        clientes: result.map(clien => {
            return {
                id_cliente: clien.idclientes,
                nome: clien.nome,
                email: clien.email
            }
        })
    }

    res.status(200).send(response);

    } catch (error) {
        return res.status(500).send({ error:error });
    }     
}

exports.postClientes = async (req, res, next) => {
    try {
        const querySelect = 'SELECT * FROM clientes WHERE email = ?';
        const queryInsert = 'INSERT INTO clientes (nome, email) VALUES (?,?)';

        const resultVerification = await mysql.execute(querySelect, [
            req.body.email
        ])
        if (resultVerification.length > 0) {
            return res.status(400).send({ mensagem: "E-mail digitado já existente em nossa base de dados. Favor, verificar" })
        }

        const result = mysql.execute(queryInsert, [
            req.body.nome,
            req.body.email
        ])
        
        const response = {
            mensagem: 'Cliente inserido com sucesso',
            clienteAdicionado: {
                id_cliente: result.idclientes,
                nome: req.body.nome,
                email: req.body.email
            }
        }

    res.status(201).send(response)

    } catch (error) {
        return res.status(500).send({ error:error })
    }
}

exports.getUmCliente = async (req, res, next) => {
    try {
        const querySelect = 'SELECT * FROM clientes WHERE idclientes = ?';

        const result = await mysql.execute(querySelect, [
            req.params.id_cliente
        ])
        if (result.length == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado cliente com este ID'
            })
        }
        
        const response = {
            cliente: {
                id_cliente: result[0].idclientes,
                nome: result[0].nome,
                email: result[0].email
            }
        }

        return res.status(200).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.patchCliente = async (req, res, next) => {
    try {
        const querySelect = 'SELECT * FROM clientes WHERE email = ?';
        const queryUpdate = 'UPDATE clientes SET nome = ?, email = ? WHERE idclientes = ?';

        const resultVerificacao = await mysql.execute(querySelect, [
            req.body.email
        ])
        if (resultVerificacao.length > 0) {
            return res.status(400).send({ mensagem: "E-mail digitado já existente em nossa base de dados. Favor, verificar" })
        }

        await mysql.execute(queryUpdate, [req.body.nome, req.body.email, req.params.id_cliente]);
            
        const response = {
            mensagem: 'Cliente atualizado com sucesso!',
            clienteAtualizado: {
                id_cliente: req.params.id_cliente,
                nome: req.body.nome,
                email: req.body.email
            }
        }

        res.status(202).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.deleteCliente = async (req, res, next) => {
    try {
        const querySelect = 'SELECT * FROM clientes WHERE idclientes = ?';
        const queryDelete = `DELETE FROM clientes WHERE idclientes = ?`;
        const querySelectWishlist = 'SELECT * FROM wishlist WHERE clientes_idclientes = ?'

        const resultaVerificaId = await mysql.execute(querySelect, [
            req.params.id_cliente
        ])
        if (resultaVerificaId.length == 0) {
            res.status(400).send({ mensagem: "O cliente selecionado para ser deletado não existe. Verifique seu ID" })
            return
        }

        const resultVerificationWishlist = await mysql.execute(querySelectWishlist, [
            req.params.id_cliente
        ])
        if (resultVerificationWishlist.length > 0) {
            res.status(400).send({ mensagem: "O cliente selecionado não pode ser deletado pois possui produtos na wish list." })
            return
        }

        await mysql.execute(queryDelete, [
            req.params.id_cliente
        ]);
        
        const response = {
            mensagem: 'Cliente removido com sucesso'
        }

        res.status(202).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    }
}