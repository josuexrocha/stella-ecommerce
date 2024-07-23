// src/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');
const validate = require("../middlewares/validate");
const { addToCartSchema, updateCartItemSchema, removeFromCartSchema } = require("../validations/cartValidation");

router.use(authenticateUser);

router.get('/', cartController.getCart);
router.post('/add', validate(addToCartSchema), cartController.addToCart);
router.put('/update', validate(updateCartItemSchema), cartController.updateCartItem);
router.delete('/remove/:cartItemId', validate(removeFromCartSchema, 'params'), cartController.removeFromCart);

module.exports = router;