const User = require('../models/userModel');

const authController = {

    // 01. Méthode pour s'inscrire :
    signup: async (req, res) => {
        try {
            const { firstName, lastName, pseudo, email, password } = req.body;
            const newUser = new User({ firstName, lastName, pseudo, email, password });
            await newUser.save();
            res.status(201).json({ message: "Inscription réussie" });
        } catch (error) {
            console.log(error);
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
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }

            //03. Token 
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur serveur" });

        }
    }

};

module.exports = authController;