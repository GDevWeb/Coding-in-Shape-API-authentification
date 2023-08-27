const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleWare = require('../middleware/authMiddleWare');
const exerciseController = require('../controllers/exerciseController'); // Import du contrôleur spécifique aux exercices

// Routes d'authentification :
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Routes protégées par le middleware d'authentification : 
// Routes CRUD pour les exercices
router.post('/exercises', authMiddleWare, exerciseController.createExercise);
router.get('/exercises', authMiddleWare, exerciseController.getAllExercises);
router.get('/exercises/:id', authMiddleWare, exerciseController.getExerciseById);
router.put('/exercises/:id', authMiddleWare, exerciseController.updateExercise);
router.delete('/exercises/:id', authMiddleWare, exerciseController.deleteExercise);

module.exports = router;
