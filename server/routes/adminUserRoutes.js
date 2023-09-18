const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleWare');
const adminUserController = require('../controllers/adminUserController');
const checkAuth = require('../middleware/checkAuthMiddleware');

// Routes protégées par le middleware d'authentification :
// Routes CRUD pour les administrateurs:
// 01. Méthode pour créer un utilisateur :
router.post('/users', checkAuth, adminUserController.createUser);
// 02. Méthode pour récupérer tous les utilisateurs :
router.get('/users', checkAuth, adminUserController.getAllUsers);
// 03. Méthode pour récupérer un utilisateur par son id :
router.get('/users/:id', checkAuth, adminUserController.getUserById);
// 04. Méthode pour mettre à jour un utilisateur :
router.put('/users/:id', checkAuth, adminUserController.updateUser);
// 05. Méthode pour supprimer un utilisateur :
router.delete('/users/:id', checkAuth, adminUserController.deleteUser);
// 06. Méthode pour bannir un utilisateur :
router.put('/users/ban/:id', checkAuth, adminUserController.banUser);
// 07. Méthode pour débannir un utilisateur : 
router.put('/users/unban/:id', checkAuth, adminUserController.unBanUser);
//08.Méthode pour passer un utilisateur en admin :
router.put('/users/admin/:id', checkAuth, adminUserController.userToAdmin);
//09.Méthode pour retirer les droits admin à un utilisateur :
router.put('/users/unadmin/:id', checkAuth, adminUserController.adminToUser);

module.exports = router;

//test