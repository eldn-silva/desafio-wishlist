const mysql = require('../database/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../jwt_key.json');


exports.createUser = async (req, res, next) => {
    try {
        var querySelect = 'SELECT * FROM usuarios WHERE email = ?';
        var queryInsert = 'INSERT INTO usuarios (email, senha) VALUES (?,?)';

        var result = await mysql.execute(querySelect, [req.body.email]);
        if (result.length > 0) {
            return res.status(409).send({ message: 'Usuário já cadastrado' })
        }

        const hash = await bcrypt.hashSync(req.body.senha, 10);

        var results = await mysql.execute(queryInsert, [req.body.email, hash]);

        response = {
            mensagem: 'Usuário criado com sucesso',
            usuarioCriado: {
                id_usuario: results.insertId,
                email: req.body.email
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const querySelect = `SELECT * FROM usuarios WHERE email = ?`;

        const results = await mysql.execute(querySelect, [req.body.email]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'Falha na autenticação' })
        }

        if (await bcrypt.compareSync(req.body.senha, results[0].senha)) {
            const token = jwt.sign({
                id_usuario: results[0].id_usuario,
                email: results[0].email
            },
            JWT_KEY.chave,
            {
                expiresIn: "5h"
            });
            return res.status(200).send({
                mensagem: 'Autenticado com sucesso',
                token: token
            })
        }
        
        return res.status(400).send({ message: 'Falha na autenticação' })

    } catch (error) {
        return res.status(500).send({ message: 'Falha na autenticação' })
    }
}