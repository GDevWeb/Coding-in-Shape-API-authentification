const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleWare');
const adminUserController = require('../controllers/adminUserController');

// Routes protégées par le middleware d'authentification :
// Routes CRUD pour les administrateurs:
// 01. Méthode pour créer un utilisateur :
router.post('/users', authMiddleWare, adminUserController.createUser);
// 02. Méthode pour récupérer tous les utilisateurs :
router.get('/users', adminUserController.getAllUsers);
// router.get('/admin/users', authMiddleWare, adminUserController.getAllUsers);
// 03. Méthode pour récupérer un utilisateur par son id :
router.get('/users/:id', authMiddleWare, adminUserController.getUserById);
// 04. Méthode pour mettre à jour un utilisateur :
router.put('/users/:id', authMiddleWare, adminUserController.updateUser);
// 05. Méthode pour supprimer un utilisateur :
router.delete('/users/:id', authMiddleWare, adminUserController.deleteUser);

module.exports = router;
