const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const sendWelcomeEmail = require("../utils/emailSender");

const authController = {
  // 01. Méthode pour s'inscrire:
  signup: async (req, res) => {
    try {
      const {
        sex,
        firstName,
        lastName,
        age,
        avatar,
        pseudo,
        email,
        password,
        securityQuestion,
        securityAnswer,
        isAdmin,
        createdAt,
        updatedAt,
      } = req.body;
      const newUser = new User({
        sex,
        firstName,
        lastName,
        age,
        avatar,
        pseudo,
        email,
        password,
        securityQuestion,
        securityAnswer,
        isAdmin,
        createdAt,
        updatedAt,
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
<<<<<<< HEAD
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 3600 * 1000,
        path: "/",
      }); //soit 24h

      res.status(200).json({ token });
=======
        // Ajout du cookie "aux pépites de chocolat" :
      res.cookie("token", token, { httpOnly: true, maxAge: 24 * 3600 * 1000 }); // 24h

      res.status(200).json({ token, message: "Connexion réussie" });
>>>>>>> 989ad7d9ea67c2ab4714c2fe01201edef41adf4d
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // 03. Méthode pour se déconnecter :
  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Déconnexion réussie" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  //04. Route pour vérifier l'authentification :
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

  // 05. Méthode pour réinitialiser le mot de passe :
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
        return res.status(401).json({
          message: "Question de sécurité ou réponse de sécurité incorrecte",
        });
      }

      // 03. Génération d'un nouveau mot de passe :
      const temporaryPassword = Math.random().toString(36).slice(-8);

      // 04. Mise à jour du mot de passe dans la base de données :
      user.password = temporaryPassword;

      // 05. Enregistrement de l'utilisateur mis à jour dans la base de données :
      await user.save();

      // 06. Envoi de l'email de réinitialisation du mot de passe :
      const sendResetPassword = temporaryPassword;

      res.status(200).json({
        message: "Mot de passe réinitialisé avec succès",
        sendResetPassword,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // MyAccount :
  //06. Consulter son profil :
  getMyProfile: async (req, res) => {
    try {
      const userId = req.userData.userId;

      const user = await User.findById(userId);

      const userData = {
        id: user.id,
        sex: user.sex,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        avatar: user.avatar,
        pseudo: user.pseudo,
        email: user.email,
        securityQuestion: user.securityQuestion,
        securityAnswer: user.securityAnswer,
        isAdmin: user.isAdmin,
        isBan: user.isBan,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }
      console.log(user);
      res.status(200).json({ userData });
      return user;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  //07. Modifier son profil : updatePassword
  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword, currentPassword } =
        req.body;

      // Authentification de l'utilisateur ? :
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
      }

      // Récupération de l'ID stocké dans le jeton
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) {
        return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
      }

      const user = await User.findById(decodedToken.userId);
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      // Vérifiez que l'ancien mot de passe correspond au mot de passe actuel de l'utilisateur
      // Dans authController.js
      const isMatch = await user.comparePassword(currentPassword); // Appel correct
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "L'ancien mot de passe est incorrect" });
      }

      // Vérifiez que le nouveau mot de passe et la confirmation correspondent
      if (newPassword !== confirmNewPassword) {
        console.log(newPassword, confirmNewPassword);
        return res
          .status(400)
          .json({ message: "Les nouveaux mots de passe ne correspondent pas" });
      }

      // Hash du nouveau mot de passe
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      //Mise à jour du MDP hashed dans la base de données :
      await User.updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword } },
        { updated: Date.now() }
      );

      res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  //08. Modifier son profil  : updateEmail :
  updateEmail: async (req, res) => {
    try {
      const { currentEmail, newEmail, confirmEmail } = req.body;

      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
      }

      // Récupération de l'ID stocké dans le jeton :
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) {
        return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
      }

      // Vérifiez que l'ancien email correspond à l'email actuel de l'utilisateur :
      const user = await User.findById(decodedToken.userId);
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      const isMatch = await user.comparePassword(currentEmail); // Appel correct
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "L'ancien email est incorrect" });
      }

      // Vérifiez que le nouveau email et la confirmation correspondent
      if (newEmail !== confirmEmail) {
        console.log(newEmail, confirmEmail);
        return res
          .status(400)
          .json({ message: "Les nouveaux emails ne correspondent pas" });
      }

      await User.updateOne({ _id: user._id }, { $set: { email: newEmail } });

      res.status(200).json({ message: "Email mis à jour avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};

module.exports = authController;
