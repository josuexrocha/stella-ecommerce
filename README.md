# Stella - E-commerce d'étoiles

Stella est une application e-commerce permettant d'acheter des étoiles. Ce projet démontre mes compétences en développement web full stack.

## Technologies utilisées

- Conception : Excalidraw, MoCoDo, MVC
- Backend : Node.js, Express, Sequelize
- Frontend : React, Semantic UI, TypeScript
- Base de données : PostgreSQL
- Outils : Jest (tests), Biome (linting/formatting), Tailwind CSS

## Structure du projet

```
stella-ecommerce/
├── client/          # Frontend React
├── server/          # Backend Node.js
├── scripts/         # Scripts globaux
└── docs/            # Documentation
```

## Installation

1. Clonez le dépôt
2. Installez les dépendances :
   ```
   cd client && npm install
   cd ../server && npm install
   ```
3. Configurez les variables d'environnement (voir `.env.example`)

## Utilisation

- Démarrer le serveur : `cd server && npm run dev`
- Démarrer le client : `cd client && npm start`
- Exécuter les tests : `cd server && npm test`

## Scripts utiles

- Créer les tables : `npm run create-tables`
- Générer des données de test : `npm run generate-data`
- Réinitialiser la base de données : `npm run reset-db`

## Contribuer

[Instructions pour contribuer à venir]

## Licence

[Informations sur la licence à venir]