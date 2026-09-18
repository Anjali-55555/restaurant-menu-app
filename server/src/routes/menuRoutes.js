/**
 * menuRoutes.js
 *
 * Defines the /api/menu routes. Mount this in your main app:
 *
 *   const menuRoutes = require('./src/routes/menuRoutes');
 *   app.use('/api/menu', menuRoutes);
 */

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET /api/menu
router.get('/', menuController.getAllMenu);

// GET /api/menu/:category
router.get('/:category', menuController.getMenuByCategory);

module.exports = router;