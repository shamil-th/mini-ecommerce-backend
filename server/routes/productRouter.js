const express = require('express');
const productRoute = express.Router();
const productController = require('../controller/productController');

productRoute.post('/',productController.create);
productRoute.put('/:id',productController.update);
productRoute.get('/',productController.findAll);
productRoute.get('/:id',productController.findProduct);
productRoute.delete('/:id',productController.remove);

module.exports = productRoute