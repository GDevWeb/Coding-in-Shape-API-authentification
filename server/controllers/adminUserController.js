const User = require('../models/userModel');

const adminUserController = {
    // 01. Méthode pour créer un utilisateur :
    createUser: async (req, res) => {
        try {
            const { firstName, lastName, pseudo, email, password, isAdmin, isBan } = req.body;
            const newUser = new User({

                firstName,
                lastName,
                pseudo,
                email,
                password,
                isAdmin,
                isBan
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
            const { firstName, lastName, pseudo, email, password, isAdmin, isBan } = req.body;
            const updatedUser = await User.findByIdAndUpdate
                (
                    userID,
                    {
                        firstName,
                        lastName,
                        pseudo,
                        email,
                        password,
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
            const user = await User.findById(userId, { isBan: true });

            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            res.status(200).json({ message: "Utilisateur banni avec succès" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur serveur - Erreur lors du bannissement de l'utilisateur" });
        }
    },
};

module.exports = adminUserController;
