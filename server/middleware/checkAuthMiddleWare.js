const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const checkAuth = (req, res, next) => {
    try {
        // Utilisation de cookie-parser pour analyser les cookies
        cookieParser()(req, res, () => {
            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({ message: "Vous devez vous connecter pour accéder à cette ressource" });
            } else {
                console.log(token, "vous êtes authentifié");
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Ajoute les données du token décodé à la requête :
            req.userData = decodedToken;
            next();
        });
    } catch (error) {
        res.status(401).json({ message: "Session expirée, veuillez vous reconnecter" });
    }
};

module.exports = checkAuth;