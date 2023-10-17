const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkAuth = require('../middleware/checkAuthMiddleware');
const multer = require ('multer');


// Storage de multer : 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../uploads/avatars");
    },
    filename: (req, file, cb) => {
      // Nom unique
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg, jpeg, webp, pbg, gif"); // extension acceptée
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Utilisez la configuration `upload` dans votre route de téléchargement d'avatar
  router.post("/upload-avatar", upload.single("avatar"), (req, res) => {
    // L'avatar est désormais stocké dans le dossier spécifié et les informations de téléchargement sont accessibles dans req.file
    // Vous pouvez enregistrer le chemin du fichier ou d'autres informations dans la base de données
    res.send("Avatar uploaded successfully");
  });

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
//07. Route pour mettre à jour le profil utilisateur :
router.put('updateMyProfile', checkAuth, upload.single('avatar'), authController.updateMyProfile);
//08. Route pour mettre à jour le mot de passe :
router.post('/updatePassword', checkAuth, authController.updatePassword);
// 09.Route pour mettre à jour le mail : 
router.post('/updateEmail', checkAuth, authController.updateEmail);

module.exports = router;