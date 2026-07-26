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
  // NB : les prix ci-dessous sont PROVISOIRES (à ajuster). Les hauteurs sont réelles.
  {
    name: "Pack Mario & Luigi",
    price: 49.90, oldPrice: null,
    category: "figurines", badge: "Nouveau", image: "assets/img/pack-mario-luigi.jpg",
    description: "Le duo mythique imprimé en 3D et fini à la main — Mario et Luigi vendus ensemble.",
    stripe: ""
  },
  {
    name: "Mario",
    price: 24.90, oldPrice: null,
    category: "figurines", badge: "Populaire", image: "",
    description: "Figurine imprimée en 3D et finie à la main · Hauteur 17 cm.",
    stripe: ""
  },
  {
    name: "Mario — Peaky Blinders",
    price: 32.90, oldPrice: null,
    category: "figurines", badge: null, image: "",
    description: "Version Peaky Blinders, imprimée en 3D et finie à la main · Hauteur 22 cm.",
    stripe: ""
  },
  {
    name: "Luidji",
    price: 29.90, oldPrice: null,
    category: "figurines", badge: null, image: "",
    description: "Figurine imprimée en 3D et finie à la main · Hauteur 20 cm.",
    stripe: ""
  },
  {
    name: "Luidji — Peaky Blinders",
    price: 44.90, oldPrice: null,
    category: "figurines", badge: "Nouveau", image: "",
    description: "Version Peaky Blinders, grand format, imprimée en 3D · Hauteur 32 cm.",
    stripe: ""
  },
  {
    name: "Deadpool — avec chapeau",
    price: 39.90, oldPrice: null,
    category: "figurines", badge: null, image: "",
    description: "Deadpool avec son chapeau, imprimé en 3D et fini à la main · Hauteur 27 cm.",
    stripe: ""
  },
  {
    name: "Deadpool — sans chapeau",
    price: 34.90, oldPrice: null,
    category: "figurines", badge: null, image: "",
    description: "Deadpool sans chapeau, imprimé en 3D et fini à la main · Hauteur 23 cm.",
    stripe: ""
  },
  {
    name: "Venom",
    price: 37.90, oldPrice: null,
    category: "figurines", badge: null, image: "",
    description: "Figurine imprimée en 3D et finie à la main · Hauteur 25 cm.",
    stripe: ""
  },
  {
    name: "Bob Marley",
    price: 32.90, oldPrice: null,
    category: "figurines", badge: "Nouveau", image: "",
    description: "Figurine imprimée en 3D et finie à la main · Hauteur 22 cm.",
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
