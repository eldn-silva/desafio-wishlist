const mysql = require('../database/mysql');

exports.getClientes = async (req, res, next) => {
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
}

exports.postClientes = (req, res, next) => {
    const query = 'INSERT INTO clientes (nome, email) VALUES (?,?)';
        const result = mysql.execute(query, [
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
        res.status(201).send(response);
}

exports.getUmCliente = async (req, res, next) => {
    const query = 'SELECT * FROM clientes WHERE idclientes = ?';
        const result = await mysql.execute(query, [
            req.params.id_cliente
        ])
        const response = {
            cliente: {
                id_cliente: result[0].idclientes,
                nome: result[0].nome,
                email: result[0].email
            }
        }
        return res.status(200).send(response);
    
}

exports.patchCliente = async (req, res, next) => {
    const query = `UPDATE clientes
                      SET nome = ?,
                          email = ?
                    WHERE idclientes = ?`;
    await mysql.execute(query, [
        req.body.nome, 
        req.body.email, 
        req.params.id_cliente
    ]);
    const response = {
        mensagem: 'Cliente atualizado com sucesso!',
        clienteAtualizado: {
            id_cliente: req.params.id_cliente,
            nome: req.body.nome,
            email: req.body.email
        }
    }
    res.status(202).send(response);
}

exports.deleteCliente = async (req, res, next) => {
    const query = `DELETE FROM clientes WHERE idclientes = ?`
        await mysql.execute(query, [
            req.params.id_cliente
        ]);
        const response = {
            mensagem: 'Cliente removido com sucesso'
        }
        res.status(202).send(response)
}