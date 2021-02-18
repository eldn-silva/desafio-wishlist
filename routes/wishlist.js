const express = require('express')
const router = express.Router()
const login = require('../middleware/login')

const wishListController = require('../controllers/wishlist-controller')

router.post('/', login.obrigatorio, wishListController.postWishlist)

router.get('/:id_cliente', login.obrigatorio, wishListController.getClienteWishlist)

router.get('/:id_cliente/:id_produto', login.obrigatorio, wishListController.getProdutoWishlist)

router.delete('/', login.obrigatorio, wishListController.deleteProductWishList)

module.exports = router