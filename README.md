Voici un fichier `readme.md` basé sur les informations que vous avez fournies :

```markdown
# Projet Coding in Shape API - Authentification

## Version: 2.5.0
## Auteurs: Marine, Gaëtan

Ce projet est une API d'authentification pour l'application Coding in Shape. Il permet la gestion des utilisateurs, des exercices, et des administrateurs.

## Sommaire

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Utilisation](#utilisation)
   - [Authentification](#authentification)
   - [Utilisateurs](#utilisateurs)
   - [Exercices](#exercices)
   - [Middleware d'Authentification](#middleware-dauthentification)
4. [Contributions](#contributions)
5. [Contact](#contact)
6. [Licence](#licence)

## Introduction

Cette API d'authentification est conçue pour être utilisée avec l'application Coding in Shape. Elle permet aux utilisateurs de s'inscrire, de se connecter, de réinitialiser leur mot de passe, et offre des fonctionnalités d'administration pour gérer les utilisateurs et les exercices.

## Installation

1. Clonez le projet depuis le dépôt GitHub :
   ```shell
   git clone https://github.com/Aescanor/Coding-in-Shape-BDD-authentification.git
   ```

2. Installez les dépendances :
   ```shell
   cd Coding-in-Shape-BDD-authentification
   npm install
   ```

3. Configurez les variables d'environnement en créant un fichier `.env` à la racine du projet. Exemple de contenu du fichier `.env` :
   ```env
   DB_URI=URL_DE_VOTRE_BASE_DE_DONNÉES_MONGODB
   JWT_SECRET=VOTRE_CLÉ_SECRÈTE_JWT
   SMTP_HOST=SERVEUR_SMTP
   SMTP_PORT=PORT_SMTP
   SMTP_USER=VOTRE_ADRESSE_EMAIL
   SMTP_PASS=VOTRE_MOT_DE_PASSE_EMAIL
   PORT=4000
   ```

4. Démarrez le serveur :
   ```shell
   cd /server
   npm run nodemon
   ```

L'API sera accessible à l'adresse `http://localhost:4000`.

## Utilisation

### Authentification

- **Inscription :** Envoyez une requête POST à `/api/auth/signup` avec les données d'inscription (nom, prénom, email, mot de passe, etc.).

- **Connexion :** Envoyez une requête POST à `/api/auth/login` avec les informations d'identification (email et mot de passe) pour obtenir un token d'authentification.

- **Réinitialisation du mot de passe :** Envoyez une requête POST à `/api/auth/resetPassword` avec l'email, la question de sécurité et la réponse de sécurité pour réinitialiser le mot de passe.

- **Vérification de l'authentification :** Utilisez le middleware `checkAuth` pour protéger certaines routes et vérifier l'authentification.

### Utilisateurs

- **Création d'un utilisateur :** Envoyez une requête POST à `/api/admin/users` pour créer un nouvel utilisateur (nécessite d'être administrateur).

- **Récupération de tous les utilisateurs :** Envoyez une requête GET à `/api/admin/users` pour obtenir la liste de tous les utilisateurs (nécessite d'être administrateur).

- **Récupération d'un utilisateur par ID :** Envoyez une requête GET à `/api/admin/users/:id` pour obtenir les informations d'un utilisateur par son ID (nécessite d'être administrateur).

- **Mise à jour d'un utilisateur :** Envoyez une requête PUT à `/api/admin/users/:id` pour mettre à jour les informations d'un utilisateur (nécessite d'être administrateur).

- **Suppression d'un utilisateur :** Envoyez une requête DELETE à `/api/admin/users/:id` pour supprimer un utilisateur (nécessite d'être administrateur).

- **Bannissement d'un utilisateur :** Envoyez une requête PUT à `/api/admin/users/ban/:id` pour bannir un utilisateur (nécessite d'être administrateur).

### Exercices

- **Création d'un exercice :** Envoyez une requête POST à `/api/exercises` pour créer un nouvel exercice.

- **Récupération de tous les exercices :** Envoyez une requête GET à `/api/exercises` pour obtenir la liste de tous les exercices.

- **Récupération d'un exercice par ID :** Envoyez une requête GET à `/api/exercises/:id` pour obtenir les informations d'un exercice par son ID.

- **Mise à jour d'un exercice :** Envoyez une requête PUT à `/api/exercises/:id` pour mettre à jour les informations d'un exercice.

- **Suppression d'un exercice :** Envoyez une requête DELETE à `/api/exercises/:id` pour supprimer un exercice.

### Middleware d'Authentification

Le middleware `checkAuth` est utilisé pour protéger certaines routes et s'assurer que l'utilisateur est authentifié avant d'accéder à ces ressources.

## Contributions

- Les contributions à ce projet sont les bienvenues. Vous pouvez ouvrir des issues ou soumettre des pull requests pour améliorer l'API.

## Contact

Pour toute question ou demande d'assistance, vous pouvez contacter les auteurs du projet :
- Marine : [marine@example.com](mailto:marine@example.com)
- Gaëtan : [gaetan@example.com](mailto:gaetan.dammaretz.dev@gmail.com)

## Licence

Ce projet est sous licence [ISC](LICENSE).

```

N'hésitez pas à personnaliser ce fichier `readme.md` en ajoutant plus de détails ou d'exemples si nécessaire.