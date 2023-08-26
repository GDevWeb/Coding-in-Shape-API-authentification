const crypto = require('crypto');

// Générer une clé secrète aléatoire
const generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex');
};

console.log(generateSecretKey());
