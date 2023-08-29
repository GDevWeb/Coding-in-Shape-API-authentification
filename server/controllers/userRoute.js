const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleWare');
const userController = require('../controllers/userController');

// Routes protégées par le middleware d'authentification :
// Routes CRUD pour les administrateurs:
// 01. Méthode pour créer un utilisateur :
router.post('/users', authMiddleWare, userController.createUser);
// 02. Méthode pour récupérer tous les utilisateurs :
router.get('/users', authMiddleWare, userController.getAllUsers);
// 03. Méthode pour récupérer un utilisateur par son id :
router.get('/users/:id', authMiddleWare, userController.getUserById);
// 04. Méthode pour mettre à jour un utilisateur :
router.put('/users/:id', authMiddleWare, userController.updateUser);
// 05. Méthode pour supprimer un utilisateur :
router.delete('/users/:id', authMiddleWare, userController.deleteUser);

module.exports = router;
