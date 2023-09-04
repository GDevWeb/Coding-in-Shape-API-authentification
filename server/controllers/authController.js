const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendWelcomeEmail = require("../utils/emailSender");

const authController = {
  // 01. Méthode pour s'inscrire:
  signup: async (req, res) => {
    try {
      const { firstName, lastName, age, pseudo, email, password, securityQuestion, securityAnswer, isAdmin} =
        req.body;
      const newUser = new User({
        firstName,
        lastName,
        age,
        pseudo,
        email,
        password,
        securityQuestion,
        securityAnswer,
        isAdmin,
      });

      await newUser.save();

      // Envoi de l'email de bienvenue : 
      sendWelcomeEmail(email, pseudo, password);

      res.status(201).json({ message: "Inscription réussie" });
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        // Code 11000 indique une violation d'unicité (doublon de clé)
        if (error.keyPattern.email === 1) {
          return res
            .status(400)
            .json({ message: "Cet email est déjà utilisé" });
        } else if (error.keyPattern.pseudo === 1) {
          return res
            .status(400)
            .json({ message: "Ce pseudo est déjà utilisé" });
        }
      }

      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // 02. Méthode pour se connecter : 
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      // Je place la condition isBan ici, question optimisation du code :
      if (user.isBan) {
        return res.status(401).json({ message: "Vous êtes banni" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }


      const token = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.cookie('token', token, { httpOnly: true, maxAge: 24 * 3600 * 1000, path: '/' }); //soit 24h

      res.status(200).json({ token });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  //03. Route pour vérifier l'authentification : 
  checkAuth: async (req, res) => { 

    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) {
        return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
      }

      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
    
  },
  
  // 04. Méthode pour réinitialiser le mot de passe :
  resetPasswordSimplified: async (req, res) => {
    const { email, securityQuestion, securityAnswer } = req.body;
  
    try {
      // 01. Rechercher l'utilisateur dans la base de données par son email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }
  
      // 02. Vérification de la question de sécurité et de la réponse de sécurité :
      if (
        user.securityQuestion !== securityQuestion ||
        user.securityAnswer !== securityAnswer
      ) {
        return res
          .status(401)
          .json({ message: "Question de sécurité ou réponse de sécurité incorrecte" });
      }
  
      // 03. Génération d'un nouveau mot de passe :
      const temporaryPassword = Math.random().toString(36).slice(-8);
  
      // 04. Mise à jour du mot de passe dans la base de données :
      user.password = temporaryPassword;
  
      // 05. Enregistrement de l'utilisateur mis à jour dans la base de données :
      await user.save();

      // 06. Envoi de l'email de réinitialisation du mot de passe :
      const sendResetPassword = temporaryPassword;
  
      res.status(200).json({ message: "Mot de passe réinitialisé avec succès", sendResetPassword });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },  

// MyAccount : 
getMyProfile : async (req, res) => {
  try {
    const userId = req.userData.userId; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ user });
    return user;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
},

  
};

module.exports = authController;
