const express = require('express');
const router = express.Router();

const wishListController = require('../controllers/wishlist-controller');

router.post('/', wishListController.postWishlist);

router.get('/:id_cliente', wishListController.getClienteWishlist);

router.delete('/', wishListController.deleteProductWishList);

module.exports = router;