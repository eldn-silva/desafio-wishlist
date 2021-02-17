const express = require('express');
const app = express();
const rotaClientes = require('./routes/clientes');
const rotaWishlist = require('./routes/wishlist');
const rotaUsers = require('./routes/users');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json());

app.use('/clientes', rotaClientes);
app.use('/wishlist', rotaWishlist);
app.use('/users', rotaUsers);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;