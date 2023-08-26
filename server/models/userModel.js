const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// 01. Création du schéma de données pour les utilisateurs :
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
    },
    pseudo: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

});

// Middleware : 
//02. Création d'un hook pour crypter le mot de passe avant de l'enregistrer dans la base de données :
userSchema.pre('save', async function (next) {

    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
});

// Methods :
//03. Méthode de comparaison des MDP hachés :
userSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;