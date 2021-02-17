const express = require('express');
const app = express();
const rotaClientes = require('./routes/clientes');
const rotaWishlist = require('./routes/wishlist');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json());

app.use('/clientes', rotaClientes);
app.use('/wishlist', rotaWishlist);

module.exports = app;