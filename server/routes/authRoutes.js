const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkAuth = require('../middleware/checkAuthMiddleware');

// 01. Route pour s'inscrire :
router.post('/signup', authController.signup);

// 02. Route pour se connecter :
router.post('/login', authController.login);

// 03. Route pour se déconnecter :
// router.get('/logout', authController.logout); 

// 04. Récupération du mot de passe : 
router.post('/resetPassword', authController.resetPasswordSimplified);

// Route pour vérifier l'authentification : 
router.get('/checkAuth', checkAuth, authController.checkAuth);

// MyAccount :
router.get('/myProfile', checkAuth, authController.getMyProfile);
module.exports = router;