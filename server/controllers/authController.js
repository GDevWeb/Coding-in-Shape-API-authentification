const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendWelcomeEmail = require("../utils/emailSender");
const { token } = require("morgan");

const authController = {
  // 01. Méthode pour s'inscrire:
  signup: async (req, res) => {
    try {
      const { firstName, lastName, age, pseudo, email, password, securityQuestion, securityAnswer, isAdmin } =
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
  // Consulter son profil :
  getMyProfile: async (req, res) => {
    try {
      const userId = req.userData.userId;

      const user = await User.findById(userId);

      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        pseudo: user.pseudo,
        email: user.email,
        securityQuestion: user.securityQuestion,
        securityAnswer: user.securityAnswer,
      }

      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });

      }
      console.log(user)
      res.status(200).json({ userData });
      return user;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Modifier son profil : updatePassword
  // updatePassword: async (req, res) => {
  //   try {
  //     const { oldPassword, newPassword, confirmNewPassword } = req.body;

  //     // Assurez-vous que l'utilisateur est authentifié (vérifiez le jeton)
  //     const token = req.cookies.token;
  //     if (!token) {
  //       return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
  //     }

  //     // Récupérez l'utilisateur depuis la base de données en utilisant l'ID stocké dans le jeton
  //     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  //     if (!decodedToken) {
  //       return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
  //     }

  //     const user = await User.findById(decodedToken.userId);
  //     if (!user) {
  //       return res.status(401).json({ message: "Utilisateur non trouvé" });
  //     }

  //     // Vérifiez que l'ancien mot de passe correspond au mot de passe actuel de l'utilisateur
  //     const isMatch = await user.comparePassword(oldPassword);
  //     if (!isMatch) {
  //       return res.status(401).json({ message: 'L\'ancien mot de passe est incorrect' });
  //     }

  //     // Vérifiez que le nouveau mot de passe et la confirmation correspondent
  //     if (newPassword !== confirmNewPassword) {
  //       return res.status(400).json({ message: 'Les nouveaux mots de passe ne correspondent pas' });
  //     }

  //     // Mettez à jour le mot de passe de l'utilisateur dans la base de données en utilisant updateOne
  //     await User.updateOne({ _id: user._id }, { $set: { password: newPassword } });

  //     res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Erreur serveur' });
  //   }
  // },


};

module.exports = authController;
