const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleWare = require('../middleware/authMiddleWare'); // Import authMiddleWare

// Routes d'authentification :
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Utilisation du middleware pour protéger les routes suivantes
router.get('/protected-route', authMiddleWare, (req, res) => {
    // Votre code ici
});

module.exports = router;
