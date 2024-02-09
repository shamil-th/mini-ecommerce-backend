const express = require('express');
const cartRoute = express.Router();
const cartController = require('../controller/cartController')

cartRoute.post('/',cartController.create);
cartRoute.get('/',cartController.find);
cartRoute.delete('/:id',cartController.remove);
cartRoute.put('/:id',cartController.update);

module.exports = cartRoute