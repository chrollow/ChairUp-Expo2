const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../middleware/upload.middleware');
const authMiddleware = require('../middleware/auth.middleware');

// Profile routes
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', [authMiddleware, upload.single('profileImage')], userController.updateProfile);

// Add this route to your user routes
router.post('/subscribe/promotions', authMiddleware, userController.subscribeToPromotions);

module.exports = router;