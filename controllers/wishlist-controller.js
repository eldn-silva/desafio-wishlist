exports.postWishlist = (req, res, next) => {
    res.status(201).send('Rota POST WISHLIST OK');
}

exports.getClienteWishlist = (req, res, next) => {
    res.status(201).send('Rota GET WISHLIST OK');
}

exports.deleteProductWishList = (req, res, next) => {
    res.status(202).send('Rota DELETE WISHLIST OK');
}