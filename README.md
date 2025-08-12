# ROS 2 Interactive Learning Platform

Une plateforme interactive complète pour apprendre ROS 2 étape par étape, construite avec React, TypeScript et Material UI.

![image](chemin/vers/image.png)


## 🚀 Fonctionnalités

- **Apprentissage progressif** : 5 chapitres structurés depuis l'installation jusqu'aux concepts avancés
- **Interface responsive** : S'adapte parfaitement aux mobiles, tablettes et ordinateurs
- **Composants interactifs** : Quiz avec feedback immédiat, blocs de code copiables
- **Suivi de progression** : Gardez une trace de votre avancement
- **Exemples pratiques** : Code ROS 2 complet et fonctionnel (Python/C++/Bash)

## 📚 Contenu des Chapitres

### Chapitre 1: Installation et Configuration
- Installation de ROS 2 Humble sur Ubuntu
- Configuration de l'environnement
- Vérification de l'installation
- **Durée**: 30 minutes | **Niveau**: Débutant

### Chapitre 2: Création d'un Node Simple
- Concepts fondamentaux des nodes
- Publisher et Subscriber en Python
- Communication de base entre nodes
- **Durée**: 45 minutes | **Niveau**: Débutant

### Chapitre 3: Communication via Topics
- Topics et messages personnalisés
- Quality of Service (QoS)
- Gestion multi-topics
- **Durée**: 60 minutes | **Niveau**: Intermédiaire

### Chapitre 4: Services et Actions
- Services synchrones request/response
- Actions asynchrones avec feedback
- Clients et serveurs avancés
- **Durée**: 75 minutes | **Niveau**: Intermédiaire

### Chapitre 5: Launch Files
- Orchestration de systèmes complexes
- Paramètres et configuration
- Conditions et groupes
- **Durée**: 50 minutes | **Niveau**: Avancé

## 🛠️ Technologies Utilisées

- **Frontend**: React 18 + TypeScript
- **Bundler**: Vite
- **UI Framework**: Material UI v5
- **Routing**: React Router v6
- **Syntax Highlighting**: React Syntax Highlighter
- **Icons**: Material UI Icons

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Git

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd ros2-interactive-learning
```

2. **Installer les dépendances**
```bash
npm install
# ou avec yarn
yarn install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
# ou avec yarn
yarn dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 🏗️ Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Layout.tsx      # Layout principal avec navigation responsive
│   ├── CodeBlock.tsx   # Bloc de code avec coloration syntaxique
│   ├── Quiz.tsx        # Composant quiz interactif
│   ├── ChapterCard.tsx # Carte de présentation des chapitres
│   └── index.ts        # Exports des composants
├── pages/              # Pages principales
│   ├── HomePage.tsx    # Page d'accueil
│   ├── ChapterPage.tsx # Page de chapitre avec stepper
│   └── index.ts        # Exports des pages
├── data/               # Données statiques
│   └── chaptersData.ts # Contenu des chapitres et quiz
├── theme.ts            # Thème Material UI personnalisé
├── App.tsx             # Composant racine avec routing
├── main.tsx            # Point d'entrée de l'application
└── vite-env.d.ts       # Types Vite
```

## 🎨 Personnalisation du Thème

Le thème est défini dans `src/theme.ts` et peut être personnalisé :

```typescript
// Exemple de modification des couleurs
const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#1976d2', // Bleu primaire
    },
    secondary: {
      main: '#dc004e', // Rouge secondaire
    },
  },
  // ... autres options
};
```

## 📱 Responsive Design

L'application utilise le système de breakpoints Material UI :

- **xs**: 0px et plus (mobile)
- **sm**: 600px et plus (tablette portrait)  
- **md**: 960px et plus (tablette paysage)
- **lg**: 1280px et plus (desktop)
- **xl**: 1920px et plus (grand écran)

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement avec hot-reload
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Vérification ESLint
```

## ➕ Ajouter un Nouveau Chapitre

Pour ajouter un nouveau chapitre, suivez ces étapes :

### 1. Modifier les données dans `src/data/chaptersData.ts`

```typescript
export const chaptersData: ChapterData[] = [
  // ... chapitres existants
  {
    id: 6, // Nouvel ID
    title: "Votre Nouveau Chapitre",
    description: "Description de votre chapitre",
    duration: "60 min",
    difficulty: "Intermédiaire",
    topics: ["Topic1", "Topic2"],
    content: {
      introduction: "Introduction de votre chapitre...",
      sections: [
        {
          id: "section1",
          title: "Première Section",
          content: "Contenu de la section...",
          codeExample: {
            code: `# Votre code ici
print("Hello ROS 2!")`,
            language: "python",
            title: "Exemple de code",
            description: "Description de l'exemple"
          },
          quiz: {
            question: "Votre question ?",
            options: [
              { id: "a", text: "Option A", isCorrect: false },
              { id: "b", text: "Option B", isCorrect: true }
            ],
            explanation: "Explication de la réponse..."
          }
        }
      ]
    }
  }
];
```

### 2. Mettre à jour la navigation dans `src/components/Layout.tsx`

Ajouter l'entrée dans `navigationItems` :

```typescript
const navigationItems: NavigationItem[] = [
  // ... entrées existantes
  { text: 'Ch6: Votre Chapitre', path: '/chapter/6', icon: <YourIcon /> },
];
```

### 3. Types TypeScript

Les types sont définis dans `src/data/chaptersData.ts` :

- `ChapterData`: Structure complète d'un chapitre
- `ChapterSection`: Section individuelle avec contenu
- `CodeExample`: Exemple de code avec métadonnées
- `QuizData`: Structure d'un quiz interactif

## 🎯 Fonctionnalités Avancées

### Quiz Interactifs
- Feedback immédiat avec explications
- Animation des réponses correctes/incorrectes
- Possibilité de recommencer

### Blocs de Code
- Coloration syntaxique pour multiple langages
- Bouton de copie automatique
- Numérotation des lignes
- Thème sombre optimisé

### Navigation Adaptative
- Drawer responsive (menu latéral)
- Stepper vertical pour les sections
- Table des matières dépliable
- Navigation inter-chapitres

### Suivi de Progression
- État persistant des sections complétées
- Barre de progression visuelle
- Badges de réussite

## 🔍 Débogage

### Problèmes Courants

1. **Erreur de dépendances**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Erreur de build TypeScript**
```bash
npm run build
# Vérifier les erreurs dans la sortie
```

3. **Navigation ne fonctionne pas**
Vérifier que tous les chemins dans `navigationItems` correspondent aux routes définies.

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```
Les fichiers sont générés dans le dossier `dist/`.

### Déploiement sur Netlify/Vercel
1. Connecter le repository Git
2. Configurer les commandes :
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Déploiement sur serveur statique
```bash
npm run build
# Copier le contenu du dossier dist/ sur votre serveur
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙋‍♂️ Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation ROS 2 officielle
- Vérifier les exemples de code dans chaque chapitre

---

**Bon apprentissage avec ROS 2 ! 🤖**
