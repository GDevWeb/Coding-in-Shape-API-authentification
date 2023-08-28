const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.userId;

        // Contrôle du status administrateur : 
        if (!decoded.isAdmin) {
            console.log("isAdmin = false")
            return res.status(403).json({ message: "Accès non autorisé. Vous n'êtes pas administrateur" });
        }else{
            console.log("isAdmin = true")
            console.log("Vous êtes administrateur prov BDD auth");
        }

        // Si la vérification d'isAdmin réussit, appeler next()
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Accès non autorisé" });
    }
};

module.exports = authMiddleWare;
