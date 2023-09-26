const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkAuth = require('../middleware/checkAuthMiddleware');

// 01. Route pour s'inscrire :
router.post('/signup', authController.signup);
// 02. Route pour se connecter :
router.post('/login', authController.login);
// 03. Route pour se déconnecter :
router.get('/logout', authController.logout); 
// 04. Récupération du mot de passe : 
router.post('/resetPassword', authController.resetPasswordSimplified);
//05. Route pour vérifier l'authentification : 
router.get('/checkAuth', checkAuth, authController.checkAuth);
// 06. Route pour obtenir les informations de compte :
router.get('/myProfile', checkAuth, authController.getMyProfile);
//07. Route pour mettre à jour le mot de passe :
router.post('/updatePassword', checkAuth, authController.updatePassword);
// 08.Route pour mettre à jour le mail : 
router.post('/updateEmail', checkAuth, authController.updateEmail);

module.exports = router;
