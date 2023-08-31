const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 01. Route pour s'inscrire :
router.post('/signup', authController.signup);

// 02. Route pour se connecter :
router.post('/login', authController.login);

// 03. Route pour vérifier l'authentification :
router.get('/check-auth', authController.checkAuth);

module.exports = router;