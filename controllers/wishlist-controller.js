const mysql = require('../database/mysql');
const axios = require('axios');

exports.postWishlist = async (req, res, next) => {
    const dados = {
        id_produto: req.body.id_produto,
        id_cliente: req.body.id_cliente
    }

    try {
        const { data } = await axios(`http://challenge-api.luizalabs.com/api/product/${dados.id_produto}/`)

        const queryVerificacao = 'SELECT * FROM wishlist WHERE idproduto = ? AND clientes_idclientes = ?'
        const verificacao = await mysql.execute(queryVerificacao, [
            dados.id_produto,
            dados.id_cliente
        ])

        if (verificacao.length > 0) {
            return res.status(400).send({ message: 'Produto já existe na lista de desejos do cliente.' })
        }

        const query = 'INSERT INTO wishlist (idproduto, titulo, preco, imagem, clientes_idclientes) VALUES (?,?,?,?,?)'
        await mysql.execute(query, [
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
        const query = `SELECT * FROM wishlist WHERE clientes_idclientes = ?`
        const result = await mysql.execute(query, [
            req.params.id_cliente
        ])

        if(result.length == 0) {
            return res.status(404).send({
                mensagem: 'Lista de desejos vazia ou cliente não existe'
            })
        }

        const response = {
            quantidade: result.length,
            mensagem: `Produtos favoritos do cliente`,
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
        const queryVerificacao = 'SELECT * FROM wishlist WHERE clientes_idclientes = ? AND idproduto = ?'
        const verificacao = await mysql.execute(queryVerificacao, [
            req.body.id_cliente, 
            req.body.id_produto
        ])

        if (verificacao.length == 0) {
            return res.status(400).send({ message: 'Produto selecionado não existe na wish list do cliente. Favor, verificar' })
        }

        const query = 'DELETE FROM wishlist WHERE clientes_idclientes = ? AND idproduto = ?'
        await mysql.execute(query, [
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