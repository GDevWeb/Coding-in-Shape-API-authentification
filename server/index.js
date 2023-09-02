const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');

app.use('/api/auth', authRoutes); // Exemple de base URL pour les routes d'authentification
app.use('/api/exercises', exerciseRoutes); // Exemple de base URL pour les routes des exercices
app.use('/api/admin', adminUserRoutes); // Exemple de base URL pour les routes des administrateurs

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connexion à la base de données Coding In Shape - authentification établie');
    // Démarrage du serveur après la connexion à la base de données
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Serveur d'authentification en cours d'exécution sur le port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données MongoDB:', error);
  });
