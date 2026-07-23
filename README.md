# Studio 3DD — Boutique en ligne

Boutique de créations imprimées en 3D : figurines, accessoires et décorations murales,
avec une section **sur mesure** pour les commandes personnalisées.

Site **100 % statique** (HTML / CSS / JavaScript) — aucune installation, aucun serveur
compliqué. Il suffit d'ouvrir les fichiers dans un navigateur ou de les héberger.

---

## 🗂️ Les fichiers

| Fichier | À quoi ça sert |
|---|---|
| `index.html` | Page d'accueil |
| `boutique.html` | Tous les produits + filtres par catégorie |
| `sur-mesure.html` | Page des commandes personnalisées (formulaire) |
| **`js/products.js`** | **⭐ TES PRODUITS — c'est le seul fichier que tu gères** |
| `js/app.js` | Moteur d'affichage (ne pas toucher) |
| `css/styles.css` | Le style du site (ne pas toucher, sauf envie) |
| `assets/img/` | Tes photos de produits vont ici |

---

## ✏️ Comment gérer tes produits (le seul truc à connaître)

Tout se passe dans **`js/products.js`**. Chaque produit ressemble à ça :

```js
{
  name: "Chevalier Pixel",          // le nom
  price: 24.90,                     // le prix (juste le nombre)
  oldPrice: null,                   // ancien prix barré, ou null
  category: "figurines",            // "figurines", "accessoires" ou "decorations"
  badge: "Top vente",               // étiquette ("Nouveau", "Promo"…) ou null
  image: "",                        // chemin de ta photo (voir plus bas)
  description: "Un petit chevalier rétro.",
  stripe: ""                        // TON lien de paiement Stripe
},
```

### Ajouter une photo
1. Mets ta photo dans le dossier `assets/img/` (ex : `chevalier.jpg`).
2. Dans le produit, écris : `image: "assets/img/chevalier.jpg",`
3. Tant que `image` reste `""`, une image d'attente colorée s'affiche automatiquement.
   👉 Le site est donc déjà présentable même sans photos.

### Ajouter ton lien de paiement Stripe
1. Crée ton lien de paiement dans Stripe (Payment Link).
2. Copie-le entre les guillemets : `stripe: "https://buy.stripe.com/xxxxx",`
3. Tant que `stripe` reste `""`, le bouton affiche **« Bientôt disponible »**.
   Dès que tu colles le lien, il devient un bouton **« Acheter »** qui ouvre Stripe. ✅

### Ajouter / supprimer un produit
- **Ajouter** : copie un bloc `{ ... }`, colle-le, modifie-le. (Garde la virgule entre chaque bloc.)
- **Supprimer** : efface le bloc `{ ... }` du produit.

---

## 👀 Voir le site en local

Double-clique simplement sur `index.html` pour l'ouvrir dans ton navigateur.

(Pour un rendu 100 % fidèle, tu peux aussi lancer un petit serveur local :
`python3 -m http.server` puis ouvre `http://localhost:8000`.)

---

## 🚀 Mettre le site en ligne

Ce site fonctionne sur n'importe quel hébergement statique gratuit :
**GitHub Pages**, **Netlify**, **Vercel** ou **Cloudflare Pages**.
Tu déposes les fichiers, et c'est en ligne.

---

Fait avec 💜 pour Studio 3DD.
