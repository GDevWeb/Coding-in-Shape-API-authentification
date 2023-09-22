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
// MyAccount :
router.get('/myProfile', checkAuth, authController.getMyProfile);
module.exports = router;
//06. Route pour mettre à jour le mot de passe :
router.post('/updatePassword', checkAuth, authController.updatePassword);
// 07.Route pour mettre à jour le mail : 
router.post('/updateEmail', checkAuth, authController.updateEmail);
// 08. Route pour mettre à jour la question de sécurité et la réponse de sécurité :
// router.post('/updateSecurity', checkAuth, authController.updateSecurity);

