/* =============================================================
   app.js — affichage produits, filtres, thème, animations
   (tu n'as normalement pas besoin de toucher à ce fichier)
   ============================================================= */

/* --- Visuels d'attente par catégorie (façon photo studio, adaptés au thème) --- */
function placeholder(cat) {
  const scenes = {
    figurines: `
      <ellipse cx="200" cy="322" rx="112" ry="20" fill="var(--ph-shadow)"/>
      <rect x="150" y="300" width="100" height="26" rx="8" fill="var(--ph-form3)"/>
      <path d="M136 300 q0 -78 64 -78 q64 0 64 78 Z" fill="var(--ph-form2)"/>
      <path d="M200 222 q64 0 64 78 H200 Z" fill="var(--ph-form1)"/>
      <circle cx="200" cy="176" r="46" fill="var(--ph-form2)"/>
      <path d="M200 130 a46 46 0 0 1 0 92 Z" fill="var(--ph-form1)"/>`,
    accessoires: `
      <ellipse cx="200" cy="300" rx="118" ry="22" fill="var(--ph-shadow)"/>
      <path d="M108 176 q92 -46 184 0 v18 q0 96 -92 96 q-92 0 -92 -96 Z" fill="var(--ph-form2)"/>
      <path d="M200 158 q46 4 92 18 v18 q0 96 -92 96 Z" fill="var(--ph-form1)"/>
      <ellipse cx="200" cy="176" rx="92" ry="26" fill="var(--ph-form3)"/>
      <ellipse cx="200" cy="172" rx="74" ry="19" fill="var(--ph-bg2)"/>`,
    decorations: `
      <circle cx="200" cy="196" r="128" fill="var(--ph-form3)"/>
      <circle cx="200" cy="196" r="116" fill="var(--ph-form2)"/>
      <g fill="none" stroke="var(--ph-form1)" stroke-width="12" stroke-linecap="round">
        <path d="M120 172 q40 -34 80 0 q40 34 80 0"/>
        <path d="M120 210 q40 -34 80 0 q40 34 80 0"/>
        <path d="M120 248 q40 -34 80 0 q40 34 80 0"/>
      </g>`
  };
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Aperçu produit">
    <rect width="400" height="400" fill="var(--ph-bg1)"/>
    <rect y="250" width="400" height="150" fill="var(--ph-bg2)"/>
    ${scenes[cat] || scenes.figurines}
  </svg>`;
}

/* --- Illustrations de catégorie (mêmes scènes, plein cadre) --- */
function catArt(cat) {
  return `<div style="width:100%;height:100%;background:var(--surface-2)">${placeholder(cat)}</div>`;
}

const euros = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const catLabel = (id) => (CATEGORIES.find((c) => c.id === id) || {}).label || id;

function badgeClass(b) {
  b = (b || '').toLowerCase();
  if (b.includes('nouveau')) return 'nouveau';
  if (b.includes('populaire')) return 'populaire';
  return '';
}

function mediaHTML(p) {
  if (p.image && p.image.trim() !== '') {
    return `<img src="${p.image}" alt="${p.name}" loading="lazy">`;
  }
  return placeholder(p.category);
}

function buyButton(p) {
  if (p.stripe && p.stripe.trim() !== '') {
    return `<a class="btn btn-primary btn-block" href="${p.stripe}" target="_blank" rel="noopener">Ajouter au panier</a>`;
  }
  return `<button class="btn btn-ghost btn-block" disabled>Bientôt disponible</button>`;
}

function cardHTML(p) {
  const badge = p.badge ? `<span class="badge ${badgeClass(p.badge)}">${p.badge}</span>` : '';
  const old = p.oldPrice ? `<span class="old-price">${euros(p.oldPrice)} €</span>` : '';
  return `
    <article class="card">
      <div class="card-media">${badge}${mediaHTML(p)}</div>
      <div class="card-body">
        <span class="card-cat">${catLabel(p.category)}</span>
        <h3>${p.name}</h3>
        <p class="desc">${p.description || ''}</p>
        <div class="price-row">
          <span class="price">${euros(p.price)} €</span>
          ${old}
        </div>
        ${buyButton(p)}
      </div>
    </article>`;
}

function renderProducts(list, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = list.length
    ? list.map(cardHTML).join('')
    : `<p class="empty">Aucun produit dans cette catégorie pour le moment.</p>`;
}

/* --- Accueil : sélection mise en avant --- */
function initFeatured() {
  if (!document.getElementById('featured-grid')) return;
  const pop = PRODUCTS.filter((p) => (p.badge || '').toLowerCase().includes('populaire'));
  const rest = PRODUCTS.filter((p) => !pop.includes(p));
  renderProducts([...pop, ...rest].slice(0, 4), 'featured-grid');
}

/* --- Boutique : filtres --- */
function initShop() {
  const mount = document.getElementById('shop-grid');
  const filters = document.getElementById('filters');
  if (!mount || !filters) return;

  const buttons = [{ id: 'all', label: 'Tout' }, ...CATEGORIES];
  filters.innerHTML = buttons
    .map((b, i) => `<button class="chip ${i === 0 ? 'active' : ''}" data-filter="${b.id}">${b.label}</button>`)
    .join('');

  const apply = (cat) => {
    renderProducts(cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat), 'shop-grid');
  };

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    filters.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    apply(btn.dataset.filter);
  });

  const start = new URLSearchParams(location.search).get('cat');
  if (start && CATEGORIES.some((c) => c.id === start)) {
    filters.querySelector('.chip.active')?.classList.remove('active');
    filters.querySelector(`[data-filter="${start}"]`)?.classList.add('active');
    apply(start);
  } else {
    apply('all');
  }
}

/* --- Illustrations des cartes catégorie sur l'accueil --- */
function initCatArt() {
  document.querySelectorAll('[data-cat-art]').forEach((el) => {
    el.innerHTML = placeholder(el.getAttribute('data-cat-art'));
  });
}

/* --- Thème clair / sombre --- */
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  let saved = null;
  try { saved = localStorage.getItem('theme3dd'); } catch (e) {}
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  if (btn) {
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      const next = dark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme3dd', next); } catch (e) {}
    });
  }
}

/* --- Menu mobile --- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

/* --- Apparition au scroll --- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initCatArt();
  initFeatured();
  initShop();
  initReveal();
});
