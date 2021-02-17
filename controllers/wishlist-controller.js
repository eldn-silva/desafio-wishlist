const mysql = require('../database/mysql');
const axios = require('axios');



exports.postWishlist = async (req, res, next) => {
    const dados = {
        id_produto: req.body.id_produto,
        id_cliente: req.body.id_cliente
    }

    const { data } = await axios(`http://challenge-api.luizalabs.com/api/product/${dados.id_produto}/`)

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
}

exports.getClienteWishlist = async (req, res, next) => {
    const query = `SELECT * FROM wishlist WHERE clientes_idclientes = ?`
        const result = await mysql.execute(query, [
            req.params.id_cliente
    ])

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
}

exports.deleteProductWishList = async (req, res, next) => {
    const query = 'DELETE FROM wishlist WHERE clientes_idclientes = ? AND idproduto = ?'
        await mysql.execute(query, [
            req.body.id_cliente, 
            req.body.id_produto
        ]);
        const response = {
            mensagem: `Produto favorito excluído`
        }
        res.status(202).send(response)
}