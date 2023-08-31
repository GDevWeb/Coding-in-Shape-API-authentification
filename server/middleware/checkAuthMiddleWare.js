const jwt = require

const checkAuth = (req, res, next) => {

    try {
        // Récupération du token dans le header de la requête : 
        const token = req.cookies.token;

        // Vérification du token :
        if(!token) {
            return res.status(401).json({ message: "Vous devez vous connecter pour accéder à cette ressource" });
        }

        // Décodage du token :
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        //Ajouter les données du token décodé à la requête :
        req.userData = decodedToken;
        next();
    }catch (error) {
        res.status(401).json({ message: "Session expiré, veuillez vous reconnecter" });
    }
}

module.exports = checkAuth;