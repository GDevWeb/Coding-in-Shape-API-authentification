const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

app.use('/api/auth', authRoutes); // Exemple de base URL pour les routes d'authentification
app.use('/api/exercises', exerciseRoutes); // Exemple de base URL pour les routes des exercices

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
      console.log(`Serveur d'authentification en cours d'éxécution sur le port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données MongoDB:', error);
  });
