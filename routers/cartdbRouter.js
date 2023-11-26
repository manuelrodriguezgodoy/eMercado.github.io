const cartdbController = require('../controllers/cartdbController');
const express = require('express');
const { getCartItems } = require('../models/cartdbModel');

const cartdbRouter = express.Router();

cartdbRouter.post('/', cartdbController.postCartItem);

cartdbRouter.get('/', cartdbController.getCartItems);

cartdbRouter.delete('/', cartdbController.deleteCartItem);




module.exports = {
    cartdbRouter
}