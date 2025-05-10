# DNS Checker

## Présentation du projet

DNS Checker est une application de bureau simple et moderne permettant de vérifier rapidement si un ou plusieurs domaines sont joignables (résolution DNS). L'application permet d'ajouter des profils, de tester plusieurs domaines à la fois, et d'effectuer un flush du cache DNS de Windows directement depuis l'interface. L'accent est mis sur la sécurité : aucune donnée n'est transmise à l'extérieur, et seules les informations de profils sont stockées localement dans une base SQLite.

## Technologies utilisées

- **Next.js** (App Router)
- **Electron** (intégration desktop)
- **React** (UI)
- **TypeScript** (robustesse et typage)
- **SCSS** (UI moderne)
- **SQLite** (stockage local des profils)

## Lancer le projet en développement

1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer Electron et NextJS en même temps :
   ```bash
   npm run electron
   ```

L'application sera accessible dans une fenêtre Electron dédiée.

## Installation du paquet (WIP)

> Cette section sera complétée prochainement pour expliquer comment générer et installer le binaire de l'application sur Windows.

## Fonctionnalités principales

- Vérification de la joignabilité de domaines (DNS)
- Ajout/édition de profils de domaines
- Test de plusieurs domaines en une seule opération
- Flush du cache DNS Windows en un clic
- Interface sécurisée : aucune donnée transmise à l'extérieur
- Stockage local via SQLite
- Notifications intégrées

## Prochaines évolutions

- Sélection du thème (clair/sombre) via l'interface
- Nettoyage et gestion avancée de la base de données
- Amélioration de l'UX (feedback, validation, etc.)
- Support multiplateforme (Linux/Mac)
- Export/import des profils
- Et plus encore...

---
