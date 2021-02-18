const mysql = require('../database/mysql');
const axios = require('axios');

exports.postWishlist = async (req, res, next) => {
    const dados = {
        id_produto: req.body.id_produto,
        id_cliente: req.body.id_cliente
    }

    try {
        const { data } = await axios(`http://challenge-api.luizalabs.com/api/product/${dados.id_produto}/`)

        const querySelectVerific = 'SELECT * FROM wishlist WHERE idproduto = ? AND clientes_idclientes = ?'
        const querySelectClient = 'SELECT * FROM clientes WHERE idclientes = ?';
        const queryInsert = 'INSERT INTO wishlist (idproduto, titulo, preco, imagem, clientes_idclientes) VALUES (?,?,?,?,?)'

        const verificacao = await mysql.execute(querySelectVerific, [
            dados.id_produto,
            dados.id_cliente
        ])
        if (verificacao.length > 0) {
            res.status(400).send({ message: 'Produto já existe na lista de desejos do cliente.' })
        }

        const resultVerificaCliente = await mysql.execute(querySelectClient, [
            req.body.id_cliente
        ])
        if (resultVerificaCliente.length == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado cliente com este ID'
            })
        }

        await mysql.execute(queryInsert, [
            dados.id_produto, 
            data.title, 
            data.price,
            data.image, 
            dados.id_cliente
        ])

    const response = {
        mensagem: 'Produto adicionado com sucesso na lista de desejos do cliente',
            produtoAdicionado: {
                titulo: data.title,
                imagem: data.image,
                preço: data.price
            }
        }

    res.status(201).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    } 
}

exports.getClienteWishlist = async (req, res, next) => {
    try {
        const querySelect = `SELECT * FROM wishlist WHERE clientes_idclientes = ?`

        const result = await mysql.execute(querySelect, [
            req.params.id_cliente
        ])
        if(result.length == 0) {
            return res.status(404).send({
                mensagem: 'Lista de desejos vazia ou cliente não existe'
            })
        }

        const response = {
            mensagem: `Produtos favoritos do cliente de ID = ${req.params.id_cliente}`,
            quantidade: result.length,
            wishlist: result.map(prod => {
                return {
                    produtosFavoritos: {
                        titulo: prod.titulo,
                        imagem: prod.imagem,
                        preco: prod.preco,
                        req_acesso_ao_produto: { tipo: 'GET', url: 'http://localhost:3000/wishlist/' + req.params.id_cliente + '/' + prod.id}
                    }
                }
            })
        } 

        res.status(200).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getProdutoWishlist = async (req, res, next) => {
    try {
        const querySelect = `SELECT * FROM wishlist WHERE clientes_idclientes = ? AND id = ?`

        const result = await mysql.execute(querySelect, [
            req.params.id_cliente,
            req.params.id_produto
        ])
        if(result.length == 0) {
            return res.status(404).send({
                mensagem: `O produto selecionado não existe para o cliente com id = ${req.params.id_cliente}`
            })
        }

        const response = {
            quantidade: result.length,
            mensagem: 'Produto selecionado exibido abaixo:',
            wishlist: result.map(prod => {
                return {
                    produtosFavoritos: {
                        titulo: prod.titulo,
                        imagem: prod.imagem,
                        preco: prod.preco
                    }
                }
            })
        } 

        res.status(200).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.deleteProductWishList = async (req, res, next) => {
    try {
        const querySelect = 'SELECT * FROM wishlist WHERE clientes_idclientes = ? AND idproduto = ?'
        const queryDelete = 'DELETE FROM wishlist WHERE clientes_idclientes = ? AND idproduto = ?'

        const verificacao = await mysql.execute(querySelect, [
            req.body.id_cliente, 
            req.body.id_produto
        ])
        if (verificacao.length == 0) {
            return res.status(400).send({ message: 'Produto selecionado não existe na wish list do cliente. Favor, verificar' })
        }

        await mysql.execute(queryDelete, [
            req.body.id_cliente, 
            req.body.id_produto
        ]);

        const response = {
            mensagem: `Produto favorito excluído`
        }
        
        res.status(202).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    } 
}