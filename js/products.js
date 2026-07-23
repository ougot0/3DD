/* =============================================================
   FICHIER DES PRODUITS — C'EST ICI QUE TU GÈRES TA BOUTIQUE
   =============================================================

   Pour chaque produit tu peux modifier :
     name        -> le nom du produit
     price       -> le prix (juste le nombre, ex: 24.90)
     oldPrice    -> ancien prix barré (optionnel, mets null si aucun)
     category    -> "figurines", "accessoires" ou "decorations"
     badge       -> petite étiquette (ex: "Nouveau", "Top vente") ou null
     image       -> chemin de la photo (ex: "assets/img/ma-photo.jpg")
                    Laisse "" pour afficher une image d'attente automatique.
     description -> texte court sous le produit
     stripe      -> COLLE ICI ton lien de paiement Stripe.
                    Laisse "" tant que tu n'as pas le lien : le bouton
                    affichera "Bientôt disponible".

   Pour AJOUTER un produit : copie un bloc { ... }, colle-le, modifie-le.
   Pour SUPPRIMER un produit : efface son bloc { ... }.
   Pense à garder les virgules entre chaque bloc.
   ============================================================= */

const CATEGORIES = [
  { id: "figurines",    label: "Figurines" },
  { id: "accessoires",  label: "Accessoires" },
  { id: "decorations",  label: "Décorations murales" }
];

const PRODUCTS = [
  // ---------------------- FIGURINES ----------------------
  {
    name: "Chevalier Pixel",
    price: 24.90,
    oldPrice: null,
    category: "figurines",
    badge: "Top vente",
    image: "",
    description: "Un petit chevalier rétro prêt à défendre ton bureau.",
    stripe: ""
  },
  {
    name: "Dragon de Poche",
    price: 19.90,
    oldPrice: 24.90,
    category: "figurines",
    badge: "Promo",
    image: "",
    description: "Dragon articulé façon jeu vidéo, tient dans la main.",
    stripe: ""
  },
  {
    name: "Petit Robot Rétro",
    price: 15.90,
    oldPrice: null,
    category: "figurines",
    badge: null,
    image: "",
    description: "Robot mignon inspiré des consoles d'autrefois.",
    stripe: ""
  },
  {
    name: "Chat Kawaii 3D",
    price: 12.90,
    oldPrice: null,
    category: "figurines",
    badge: "Nouveau",
    image: "",
    description: "Un chat tout doux imprimé en 3D, à collectionner.",
    stripe: ""
  },
  {
    name: "Héros Cosmique",
    price: 29.90,
    oldPrice: null,
    category: "figurines",
    badge: null,
    image: "",
    description: "Le héros de l'espace, cape au vent et manette en main.",
    stripe: ""
  },
  {
    name: "Licorne Arc-en-ciel",
    price: 17.90,
    oldPrice: null,
    category: "figurines",
    badge: null,
    image: "",
    description: "Licorne pastel qui plaît aux petits comme aux grands.",
    stripe: ""
  },

  // ---------------------- ACCESSOIRES ----------------------
  {
    name: "Porte-clés Manette",
    price: 8.90,
    oldPrice: null,
    category: "accessoires",
    badge: "Top vente",
    image: "",
    description: "La mini-manette rétro à accrocher partout.",
    stripe: ""
  },
  {
    name: "Support Téléphone Arcade",
    price: 14.90,
    oldPrice: null,
    category: "accessoires",
    badge: null,
    image: "",
    description: "Une borne d'arcade miniature qui tient ton téléphone.",
    stripe: ""
  },
  {
    name: "Porte-stylo Fusée",
    price: 11.90,
    oldPrice: null,
    category: "accessoires",
    badge: null,
    image: "",
    description: "Range tes stylos dans une fusée prête au décollage.",
    stripe: ""
  },
  {
    name: "Cache-webcam Fantôme",
    price: 6.90,
    oldPrice: null,
    category: "accessoires",
    badge: "Nouveau",
    image: "",
    description: "Un petit fantôme qui protège ta vie privée avec le sourire.",
    stripe: ""
  },
  {
    name: "Support Manette Mural",
    price: 16.90,
    oldPrice: null,
    category: "accessoires",
    badge: null,
    image: "",
    description: "Accroche et expose tes manettes avec style.",
    stripe: ""
  },

  // ---------------------- DÉCORATIONS MURALES ----------------------
  {
    name: "Cadre Néon « Player One »",
    price: 22.90,
    oldPrice: null,
    category: "decorations",
    badge: "Top vente",
    image: "",
    description: "Un cadre mural effet néon pour une déco pop et gaming.",
    stripe: ""
  },
  {
    name: "Étoile Murale",
    price: 18.90,
    oldPrice: null,
    category: "decorations",
    badge: null,
    image: "",
    description: "Grande étoile 3D à fixer au mur, prête pour un ruban LED.",
    stripe: ""
  },
  {
    name: "Panneau Pixel Heart",
    price: 13.90,
    oldPrice: null,
    category: "decorations",
    badge: null,
    image: "",
    description: "Le célèbre cœur pixelisé à accrocher dans ta chambre.",
    stripe: ""
  },
  {
    name: "Lune 3D Murale",
    price: 27.90,
    oldPrice: null,
    category: "decorations",
    badge: "Nouveau",
    image: "",
    description: "Une lune texturée grand format pour un mur qui rêve.",
    stripe: ""
  }
];
