# Stella - E-commerce d'étoiles

Stella est une application e-commerce permettant d'acheter des étoiles. Ce projet démontre mes compétences en développement web full stack.

## Technologies utilisées

- Conception : Excalidraw, MoCoDo, MVC, Canva
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
3. Configurez les variables d'environnement
- Copiez les fichiers .env.example dans les dossiers client/src/ et server/
- Renommez-les en .env
- Remplissez les variables nécessaires :
  - Dans client/src/.env, modifiez l'URL de l'API si nécessaire
  - Dans server/.env, configurez la base de données et la clé JWT

## Utilisation

- Démarrer le serveur : `cd server && npm run dev`
- Démarrer le client : `cd client && npm start`
- Exécuter les tests : `cd server && npm test`

## Scripts utiles

- Créer les tables : `npm run create-tables`
- Générer des données de test : `npm run generate-data`
- Réinitialiser la base de données : `npm run reset-db`

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer au projet, voici les étapes :

1. **Fork** le dépôt
2. Créez une **branche** pour la fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commitez** les modifications (`git commit -m 'Ajout d'une fonctionnalité incroyable'`)
4. **Poussez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Pull Request**

### Issues
Si il y a des problèmes ou des idées d'amélioration, go issues sur le dépôt. J'apprecie tous les retours et suggestions.

## Exemples d'utilisation

[Informations à venir]

## Roadmap

Voici quelques fonctionnalités que je prévois d'ajouter :

- [ ] Fonctionalité panier
- [ ] Fonctionalité liste d'envies
- [ ] Intégration d'un système de paiement
- [ ] Notifications par email pour les commandes
- [ ] Améliorations de l'interface utilisateur
- [ ] Système de recommandation de produits
- [ ] Tests

## Licence

[Informations sur la licence à venir]