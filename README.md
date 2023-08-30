# Guide d'utilisation du système d'authentification

Ce guide a été conçu pour vous aider à comprendre et à utiliser le système d'authentification de l'application **Coding In Shape**. Vous trouverez ci-dessous des instructions détaillées pour les principales fonctionnalités.

## Sommaire

- [Guide d'utilisation du système d'authentification](#guide-dutilisation-du-système-dauthentification)
  - [Sommaire](#sommaire)
  - [Introduction](#introduction)
  - [Inscription et Connexion](#inscription-et-connexion)
    - [Inscription](#inscription)
    - [Connexion](#connexion)
  - [Exécution de l'Application](#exécution-de-lapplication)
  - [Utilisation des Routes Protégées](#utilisation-des-routes-protégées)
  - [Gestion des Erreurs](#gestion-des-erreurs)
  - [Gestion des Utilisateurs Administrateurs](#gestion-des-utilisateurs-administrateurs)

---

## Introduction

Le système d'authentification est une partie essentielle de l'application **Coding In Shape**. Il permet de sécuriser l'accès aux différentes fonctionnalités en s'assurant que seuls les utilisateurs authentifiés et autorisés peuvent y accéder.

## Inscription et Connexion

### Inscription

Pour créer un compte utilisateur :

1. Utilisez la route POST `/api/auth/signup`.
2. Envoyez une requête JSON avec les informations suivantes :
   - `firstName`: Votre prénom
   - `lastName`: Votre nom de famille
   - `pseudo`: Votre pseudo
   - `email`: Votre adresse e-mail
   - `password`: Votre mot de passe
   - `isAdmin`: Indiquez `true` si vous êtes un administrateur, sinon `false`.
3. Vous recevrez une réponse confirmant l'inscription ou indiquant une erreur en cas de problème.

### Connexion

Pour vous connecter à votre compte utilisateur :

1. Utilisez la route POST `/api/auth/login`.
2. Envoyez une requête JSON avec les informations suivantes :
   - `email`: Votre adresse e-mail
   - `password`: Votre mot de passe
3. Si les informations sont correctes, vous recevrez un token JWT que vous devrez inclure dans les en-têtes de vos futures requêtes.

## Exécution de l'Application

1. Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.
2. Clonez le dépôt depuis [GitHub](https://github.com/Aescanor/Coding-in-Shape-BDD-authentification).
3. Ouvrez le terminal et accédez au répertoire du projet.
4. Exécutez la commande `npm install` pour installer les dépendances.
5. Créez un fichier `.env` à la racine du projet et ajoutez vos variables d'environnement (voir `.env.example` pour le format).
6. Exécutez l'application en utilisant `npm start`.
7. L'application sera accessible à l'adresse `http://localhost:4000`.

## Utilisation des Routes Protégées

Certaines routes nécessitent une authentification préalable pour y accéder. Les routes protégées sont marquées par l'utilisation du middleware d'authentification. Suivez ces étapes pour les utiliser :

1. Connectez-vous à l'aide de la route `/api/auth/login` et obtenez un token JWT.
2. Incluez le token JWT dans l'en-tête `Authorization` de vos requêtes. Le token doit être précédé de la chaîne "Bearer " (par exemple : `Bearer votre_token_jwt`).

## Gestion des Erreurs

En cas de problème, l'application renverra des réponses appropriées pour vous aider à identifier les erreurs :

- Les erreurs 400 indiquent des problèmes de requête utilisateur (données manquantes, format incorrect, etc.).
- Les erreurs 401 signifient que l'accès n'est pas autorisé en raison d'informations d'identification incorrectes ou manquantes.
- Les erreurs 403 indiquent que l'accès à la ressource est interdit en raison d'autorisations insuffisantes.
- Les erreurs 500 signalent des problèmes au niveau du serveur.

## Gestion des Utilisateurs Administrateurs

Le système prend en charge les utilisateurs administrateurs pour accéder à certaines fonctionnalités spécifiques. Les routes et les contrôleurs pertinents pour la gestion des utilisateurs administrateurs sont inclus dans l'application. Pour utiliser ces fonctionnalités :

1. Connectez-vous en tant qu'administrateur.
2. Utilisez les routes spécifiques pour les opérations d'administration des utilisateurs, telles que la création, la récupération, la mise à jour et la suppression d'utilisateurs.

**Note :** N'oubliez pas de vous référer à la documentation du code source pour plus de détails techniques sur l'implémentation de ces fonctionnalités.

---

**Auteur :** Malik Marina Gaëtan  [Ajout de admin/user - gestion des comptes user]  
**Version :** 2.0.0  
**Dernière Mise à Jour :** [30/08/2023]

---
