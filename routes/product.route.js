const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();
const {getProducts, getProduct, postProduct, putProduct, deleteProduct} = require('../controllers/product.controller')

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', postProduct);

router.put('/:id', putProduct);

router.delete('/:id', deleteProduct);

module.exports = router;

