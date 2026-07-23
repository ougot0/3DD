# ALYA — Boutique en ligne (impression 3D)

Boutique de créations imprimées en 3D : figurines, accessoires et décorations murales,
avec commandes **sur mesure**, **panier**, pages **À propos**, **Contact** et **FAQ**.

Site **100 % statique** (HTML / CSS / JavaScript) — aucune installation, aucun serveur.
Il suffit d'ouvrir les fichiers dans un navigateur ou de les héberger.

---

## 🗂️ Les fichiers

| Fichier | À quoi ça sert |
|---|---|
| `index.html` | Page d'accueil |
| `boutique.html` | Tous les produits + filtres par catégorie |
| `sur-mesure.html` | Page devis / commande personnalisée (formulaire complet) |
| `a-propos.html` | Présentation de l'atelier |
| `contact.html` | Coordonnées + formulaire de contact |
| `faq.html` | Questions fréquentes |
| `panier.html` | Le panier du client |
| **`js/products.js`** | **⭐ TES PRODUITS — nom, photo, prix, lien Stripe** |
| **`js/app.js`** | Moteur du site. En haut, le bloc **`SHOP`** = tes **coordonnées** (email, téléphone, adresse, réseaux) |
| `css/styles.css` | Le style du site |
| `assets/img/` | Tes photos de produits |

> 💡 Le **menu**, le **pied de page**, le **nom (ALYA)** et les **coordonnées** sont
> gérés à un seul endroit (`js/app.js`, bloc `SHOP` + `NAV`). Tu changes une fois,
> c'est appliqué sur toutes les pages.

---

## ✏️ Gérer tes produits — `js/products.js`

Chaque produit :

```js
{
  name: "Buste Athéna",             // le nom
  price: 34.90,                     // le prix (juste le nombre)
  oldPrice: null,                   // ancien prix barré, ou null
  category: "figurines",            // "figurines", "accessoires" ou "decorations"
  badge: "Populaire",               // étiquette ("Nouveau", "Populaire") ou null
  image: "",                        // chemin de ta photo (voir plus bas)
  description: "Un buste élégant.",
  stripe: ""                        // TON lien de paiement Stripe
},
```

- **Photo** : mets ton image dans `assets/img/` puis écris `image: "assets/img/ma-photo.jpg"`.
  Tant que c'est vide, un visuel d'attente élégant s'affiche automatiquement.
- **Lien Stripe** : colle ton lien de paiement dans `stripe: "https://buy.stripe.com/xxxx"`.
  Il apparaît alors comme bouton **« Payer »** dans le panier.
- **Ajouter / supprimer** : copie ou efface un bloc `{ ... }` (garde les virgules).

---

## ⚙️ Tes coordonnées — `js/app.js` (bloc `SHOP`)

```js
const SHOP = {
  name:    "ALYA",
  tagline: "Impression 3D",
  email:   "contact@alya.fr",     // ← ton vrai email
  phone:   "+33 6 00 00 00 00",    // ← ton vrai téléphone
  address: "Adresse à compléter",  // ← optionnel
  instagram: "",                    // ← lien Instagram (optionnel)
  tiktok:    ""                     // ← lien TikTok (optionnel)
};
```

Ces infos alimentent le pied de page, la page Contact et les formulaires.

---

## 🛒 Le panier & le paiement

- Le client ajoute des articles au panier (mémorisé dans son navigateur).
- Dans le panier, chaque article se règle via **son lien de paiement Stripe**.
- Un **paiement groupé** (tout payer en une fois) nécessite Stripe Checkout avec une
  petite fonction serveur — faisable dans un second temps si tu le souhaites.

---

## 👀 Voir le site en local

Double-clique sur `index.html`, ou lance un petit serveur :
`python3 -m http.server` puis ouvre `http://localhost:8000`.

## 🚀 Mettre en ligne

Hébergement statique gratuit : **GitHub Pages**, **Netlify**, **Vercel** ou **Cloudflare Pages**.

---

Fait avec 💜 pour ALYA.
