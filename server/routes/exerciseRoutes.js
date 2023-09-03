const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleWare = require('../middleware/authMiddleWare');
const exerciseController = require('../controllers/exerciseController'); 

// Routes d'authentification :
router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.get('/logout', authController.logout);
router.post('/resetPassword', authController.resetPasswordSimplified);

<<<<<<< HEAD
// Utilisation du middleware pour protéger les routes suivantes
router.get('/protected-route', authMiddleWare, (req, res) => {
    
});
=======
// Routes protégées par le middleware d'authentification : 
// Routes CRUD pour les exercices
router.post('/exercises', authMiddleWare, exerciseController.createExercise); 
router.get('/exercises', authMiddleWare, exerciseController.getAllExercises);
router.get('/exercises/:id', authMiddleWare, exerciseController.getExerciseById);
router.put('/exercises/:id', authMiddleWare, exerciseController.updateExercise);
router.delete('/exercises/:id', authMiddleWare, exerciseController.deleteExercise);
>>>>>>> devGaëtan

module.exports = router;
