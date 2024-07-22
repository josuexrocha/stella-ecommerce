// src/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

router.use(authenticateUser);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateCartItem);
router.delete('/remove/:cartItemId', cartController.removeFromCart);

module.exports = router;