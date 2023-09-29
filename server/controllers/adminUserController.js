const User = require('../models/userModel');

const adminUserController = {
    // 01. Méthode pour créer un utilisateur :
    createUser: async (req, res) => {
        try {
            const { sex, firstName, lastName, age, avatar, pseudo, email, password, securityQuestion, securityAnswer, isAdmin, isBan, createdAt, updatedAt } = req.body;
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
                isBan,
                createdAt,
                updatedAt,        
            });
            await newUser.save();
            res.status(201).json({ user: newUser, message: "Utilisateur créé avec succès" });
        } catch (error) {
            console.log(error);

            if (error.code === 11000) {
                if (error.keyPattern.email) {
                    return res.status(400).json({ message: "Cet email est déjà utilisé" });
                }
                else if (error.keyPattern.pseudo) {
                    return res.status(400).json({ message: "Ce pseudo est déjà utilisé" });
                }
            }

            res.status(500).json({ message: "Erreur serveur - Erreur lors de la création de l'utilisateur" });
        }
    },

    // 02. Méthode pour récupérer tous les utilisateurs : 
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
        }
    },

    // 03. Méthode pour récupérer un utilisateur par son id :
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.header('Content-Type', 'application/json');
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
        }
    },


    // 04. Méthode pour mettre à jour un utilisateur :
    updateUser: async (req, res) => {
        try {
            const userID = req.params.id;
            const { firstName, lastName, age, pseudo, email, password, securityQuestion, securityAnswer, isAdmin, isBan } = req.body;
            const updatedUser = await User.findByIdAndUpdate
                (
                    userID,
                    {
                        firstName,
                        lastName,
                        age,
                        pseudo,
                        email,
                        password,
                        securityQuestion,
                        securityAnswer,
                        isAdmin,
                        isBan
                    },
                    { new: true },

                );

            if (!updatedUser) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            res.status(201).json({ message: "Utilisateur mis à jour avec succès" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur serveur - Erreur lors de la mise à jour de l'utilisateur" });
        }
    },

    // 05. Méthode pour supprimer un utilisateur :
    deleteUser: async (req, res) => {

        try {
            const userId = req.params.id;
            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            res.status(200).json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur serveur - Erreur lors de la suppression de l'utilisateur" });
        }

    },

    // 06. Méthode pour bannir un utilisateur : 
    banUser: async (req, res) => {
        try {
            const userId = req.params.id;

            const user = await User.findByIdAndUpdate(
                userId, 
                { isBan: true }, 
                { new: true });

                if (!user) {
                    return res.status(404).json({ message: "Utilisateur non trouvé" });
                }
                res.status(200).json({ message: "Utilisateur banni avec succès" });
        }catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur serveur - Erreur lors du bannissement de l'utilisateur" });
        }
    },

    // 07. Méthode pour débannir un utilisateur : 
    unBanUser : async (req, res) => {
        try{
            const userID = req.params.id;

            const user = await User.findByIdAndUpdate(
                userID,
                {isBan: false},
                {new: true});

                if(!user) {
                    return res.status(404).json({message: "Utilisateur non trouvé"});
                }
                res.status(200).json({message: "Utilisateur débanni avec succès"});
        }catch (error) {
            console.log(error);
            res.status(500).json({message: "Erreur serveur - Erreur lors du débannissement de l'utilisateur"});
        }
    },

    // 08. Méthode pour passer un utilisateur en admin : 
    userToAdmin : async (req, res) => {
        try {
            const userID = req.params.id;

            const user = await User.findByIdAndUpdate(
                userID,
                {isAdmin: true},
                {new: true});

                if(!user) {
                    return res.status(404).json({message: "Utilisateur non trouvé"});
                }
                res.status(200).json({message: "Utilisateur promu administrateur avec succès"});
        }catch (error) {
            console.log(error);
            res.status(500).json({message: "Erreur serveur - Erreur lors de la promotion de l'utilisateur en administrateur"});
        }
    },

    // 09. Méthode pour retirer les droits admin à un utilisateur :
    adminToUser : async (req, res) => {
        try {
            const userID = req.params.id;

            const user = await User.findByIdAndUpdate(
                userID,
                {isAdmin: false},
                {new: true});

                if(!user) {
                    return res.status(404).json({message: "Utilisateur non trouvé"});
                }
                res.status(200).json({message: "Utilisateur rétrogradé avec succès"});
        }catch (error) {
            console.log(error);
            res.status(500).json({message: "Erreur serveur - Erreur lors de la rétrogradation de l'utilisateur"});
        }
    }
        
};

module.exports = adminUserController;
