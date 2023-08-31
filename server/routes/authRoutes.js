const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkAuth = require('../middleware/checkAuthMiddleware');

// 01. Route pour s'inscrire :
router.post('/signup', authController.signup);

// 02. Route pour se connecter :
router.post('/login', authController.login);

// Route pour vérifier l'authentification : 
router.get('/checkAuth', checkAuth, authController.checkAuth);

module.exports = router;