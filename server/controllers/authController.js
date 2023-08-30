const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendWelcomeEmail = require("../utils/emailSender");

const authController = {
  signup: async (req, res) => {
    try {
      const { firstName, lastName, pseudo, email, password, isAdmin } =
        req.body;
      const newUser = new User({
        firstName,
        lastName,
        pseudo,
        email,
        password,
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
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};

module.exports = authController;
