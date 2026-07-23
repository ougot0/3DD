/* =============================================================
   FICHIER DES PRODUITS — C'EST ICI QUE TU GÈRES TA BOUTIQUE
   =============================================================

   Pour chaque produit tu peux modifier :
     name        -> le nom du produit
     price       -> le prix (juste le nombre, ex: 34.90)
     oldPrice    -> ancien prix barré (optionnel, mets null si aucun)
     category    -> "figurines", "accessoires" ou "decorations"
     badge       -> petite étiquette ("Nouveau", "Populaire"…) ou null
     image       -> chemin de la photo (ex: "assets/img/ma-photo.jpg")
                    Laisse "" pour afficher un visuel d'attente automatique.
     description -> texte court sous le produit
     stripe      -> COLLE ICI ton lien de paiement Stripe.
                    Laisse "" tant que tu n'as pas le lien : le bouton
                    affichera "Bientôt disponible".

   Pour AJOUTER un produit : copie un bloc { ... }, colle-le, modifie-le.
   Pour SUPPRIMER un produit : efface son bloc { ... }.
   Garde bien les virgules entre chaque bloc.
   ============================================================= */

const CATEGORIES = [
  { id: "figurines",   label: "Figurines" },
  { id: "accessoires", label: "Accessoires" },
  { id: "decorations", label: "Décorations murales" }
];

const PRODUCTS = [
  // ---------------------- FIGURINES ----------------------
  {
    name: "Buste Athéna",
    price: 34.90, oldPrice: null,
    category: "figurines", badge: "Populaire", image: "",
    description: "Un buste élégant à la finition mate, pièce maîtresse d'une étagère.",
    stripe: ""
  },
  {
    name: "Renard Lové",
    price: 22.90, oldPrice: null,
    category: "figurines", badge: null, image: "",
    description: "Petit renard aux courbes douces, parfait comme cadeau tendre.",
    stripe: ""
  },
  {
    name: "Astronaute Rêveur",
    price: 27.90, oldPrice: null,
    category: "figurines", badge: "Nouveau", image: "",
    description: "Un explorateur assis sur son casque, à contempler.",
    stripe: ""
  },
  {
    name: "Chat Assis",
    price: 18.90, oldPrice: null,
    category: "figurines", badge: null, image: "",
    description: "Silhouette féline épurée, disponible en plusieurs teintes.",
    stripe: ""
  },
  {
    name: "Dragon d'Étagère",
    price: 39.90, oldPrice: 44.90,
    category: "figurines", badge: null, image: "",
    description: "Un dragon lové aux écailles finement détaillées.",
    stripe: ""
  },
  {
    name: "Danseuse en Mouvement",
    price: 29.90, oldPrice: null,
    category: "figurines", badge: null, image: "",
    description: "Une figure gracieuse saisie en plein élan.",
    stripe: ""
  },

  // ---------------------- ACCESSOIRES ----------------------
  {
    name: "Vide-poches Vague",
    price: 16.90, oldPrice: null,
    category: "accessoires", badge: "Populaire", image: "",
    description: "Un vide-poches ondulé pour clés, bagues et petites choses.",
    stripe: ""
  },
  {
    name: "Support Casque « Arche »",
    price: 24.90, oldPrice: null,
    category: "accessoires", badge: null, image: "",
    description: "Repose ton casque audio sur une arche stable et sobre.",
    stripe: ""
  },
  {
    name: "Porte-plantes Géométrique",
    price: 19.90, oldPrice: null,
    category: "accessoires", badge: null, image: "",
    description: "Cache-pot à facettes pour tes petites plantes et succulentes.",
    stripe: ""
  },
  {
    name: "Serre-livres Montagne",
    price: 28.90, oldPrice: null,
    category: "accessoires", badge: null, image: "",
    description: "Une paire de serre-livres en relief de sommets.",
    stripe: ""
  },
  {
    name: "Porte-téléphone Minimal",
    price: 14.90, oldPrice: null,
    category: "accessoires", badge: null, image: "",
    description: "Un support de bureau discret pour ton téléphone.",
    stripe: ""
  },

  // ---------------------- DÉCORATIONS MURALES ----------------------
  {
    name: "Panneau Ondes",
    price: 32.90, oldPrice: null,
    category: "decorations", badge: "Populaire", image: "",
    description: "Un relief mural ondulé qui joue avec la lumière.",
    stripe: ""
  },
  {
    name: "Constellation Murale",
    price: 26.90, oldPrice: null,
    category: "decorations", badge: null, image: "",
    description: "Des points reliés pour dessiner ta constellation préférée.",
    stripe: ""
  },
  {
    name: "Feuille de Ginkgo",
    price: 21.90, oldPrice: null,
    category: "decorations", badge: "Nouveau", image: "",
    description: "Une feuille délicate en relief, nature et apaisante.",
    stripe: ""
  },
  {
    name: "Horloge Solaire Murale",
    price: 44.90, oldPrice: null,
    category: "decorations", badge: null, image: "",
    description: "Un cadran rayonnant qui habille un mur avec caractère.",
    stripe: ""
  }
];
