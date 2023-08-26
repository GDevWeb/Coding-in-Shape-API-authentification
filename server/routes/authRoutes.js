const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 01. Route pour s'inscrire :
router.post('/signup', authController.signup);

// 02. Route pour se connecter :
router.post('/login', authController.login);

module.exports = router;