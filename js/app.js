/* =============================================================
   app.js — affichage des produits, filtres et menu mobile
   (tu n'as normalement pas besoin de toucher à ce fichier)
   ============================================================= */

/* --- Images d'attente par catégorie (affichées tant qu'aucune photo n'est fournie) --- */
const PLACEHOLDERS = {
  figurines: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Figurine">
      <rect width="200" height="200" fill="none"/>
      <circle cx="100" cy="70" r="30" fill="#7c3aed"/>
      <rect x="70" y="98" width="60" height="62" rx="16" fill="#ff4d9d"/>
      <circle cx="90" cy="66" r="5" fill="#fff"/><circle cx="110" cy="66" r="5" fill="#fff"/>
      <rect x="58" y="110" width="16" height="40" rx="8" fill="#7c3aed"/>
      <rect x="126" y="110" width="16" height="40" rx="8" fill="#7c3aed"/>
    </svg>`,
  accessoires: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Accessoire">
      <rect x="46" y="70" width="108" height="66" rx="22" fill="#7c3aed"/>
      <circle cx="80" cy="103" r="10" fill="#ffd23f"/>
      <rect x="112" y="95" width="10" height="10" rx="3" fill="#22d3ee"/>
      <rect x="128" y="95" width="10" height="10" rx="3" fill="#ff4d9d"/>
      <rect x="112" y="111" width="10" height="10" rx="3" fill="#ff4d9d"/>
      <rect x="128" y="111" width="10" height="10" rx="3" fill="#22d3ee"/>
    </svg>`,
  decorations: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Décoration murale">
      <path d="M100 44 L118 84 L162 88 L130 118 L138 162 L100 140 L62 162 L70 118 L38 88 L82 84 Z" fill="#ffd23f" stroke="#7c3aed" stroke-width="6" stroke-linejoin="round"/>
    </svg>`
};

const euros = (n) =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const catLabel = (id) => (CATEGORIES.find((c) => c.id === id) || {}).label || id;

function badgeClass(badge) {
  const b = (badge || '').toLowerCase();
  if (b.includes('promo')) return 'promo';
  if (b.includes('nouveau')) return 'nouveau';
  if (b.includes('top')) return 'top';
  return '';
}

function mediaHTML(p) {
  if (p.image && p.image.trim() !== '') {
    return `<img src="${p.image}" alt="${p.name}" loading="lazy">`;
  }
  return PLACEHOLDERS[p.category] || PLACEHOLDERS.figurines;
}

function buyButton(p) {
  if (p.stripe && p.stripe.trim() !== '') {
    return `<a class="btn btn-primary btn-block" href="${p.stripe}" target="_blank" rel="noopener">Acheter</a>`;
  }
  return `<button class="btn btn-ghost btn-block" disabled>Bientôt disponible</button>`;
}

function cardHTML(p) {
  const badge = p.badge
    ? `<span class="badge ${badgeClass(p.badge)}">${p.badge}</span>`
    : '';
  const old = p.oldPrice
    ? `<span class="old-price">${euros(p.oldPrice)} €</span>`
    : '';
  return `
    <article class="card" data-category="${p.category}">
      <div class="card-media">
        ${badge}
        ${mediaHTML(p)}
      </div>
      <div class="card-body">
        <span class="card-cat">${catLabel(p.category)}</span>
        <h3>${p.name}</h3>
        <p class="desc">${p.description || ''}</p>
        <div class="price-row">
          <span class="price">${euros(p.price)} <span class="cur">€</span></span>
          ${old}
        </div>
        ${buyButton(p)}
      </div>
    </article>`;
}

function renderProducts(list, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  if (!list.length) {
    mount.innerHTML = `<p class="empty">Aucun produit dans cette catégorie pour le moment.</p>`;
    return;
  }
  mount.innerHTML = list.map(cardHTML).join('');
}

/* --- Page BOUTIQUE : filtres par catégorie --- */
function initShop() {
  const mount = document.getElementById('shop-grid');
  const filters = document.getElementById('filters');
  if (!mount || !filters) return;

  // construit les boutons de filtre
  const buttons = [{ id: 'all', label: 'Tout voir' }, ...CATEGORIES];
  filters.innerHTML = buttons
    .map(
      (b, i) =>
        `<button class="chip ${i === 0 ? 'active' : ''}" data-filter="${b.id}">${b.label}</button>`
    )
    .join('');

  const apply = (cat) => {
    const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
    renderProducts(list, 'shop-grid');
  };

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    filters.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    apply(btn.dataset.filter);
  });

  // filtre initial via l'URL (?cat=figurines)
  const params = new URLSearchParams(location.search);
  const start = params.get('cat');
  if (start && CATEGORIES.some((c) => c.id === start)) {
    filters.querySelector('.chip.active')?.classList.remove('active');
    filters.querySelector(`[data-filter="${start}"]`)?.classList.add('active');
    apply(start);
  } else {
    apply('all');
  }
}

/* --- Page ACCUEIL : produits mis en avant --- */
function initHomeFeatured() {
  const mount = document.getElementById('featured-grid');
  if (!mount) return;
  // 4 produits mis en avant (les "Top vente" en priorité, puis on complète)
  const tops = PRODUCTS.filter((p) => (p.badge || '').toLowerCase().includes('top'));
  const rest = PRODUCTS.filter((p) => !tops.includes(p));
  const featured = [...tops, ...rest].slice(0, 4);
  renderProducts(featured, 'featured-grid');
}

/* --- Menu mobile --- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
  // année du footer
  const y = document.getElementById('year');
  if (y) y.textContent = '2026';
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHomeFeatured();
  initShop();
});
