/* =============================================================
   app.js — ALYA · Impression 3D
   En-tête + pied de page centralisés, panier, produits,
   filtres, thème, animations.
   (tu n'as normalement pas besoin de toucher à ce fichier —
    sauf le bloc "COORDONNÉES" ci-dessous)
   ============================================================= */

/* ====== COORDONNÉES DE LA BOUTIQUE (modifie ici quand tu veux) ====== */
const SHOP = {
  name:    "ALYA",
  tagline: "Impression 3D",
  email:   "alyabrande@gmail.com",    // ← email de contact (reçoit aussi les devis)
  phone:   "+33 6 00 00 00 00",       // ← à remplacer par ton vrai numéro
  address: "Adresse à compléter",     // ← optionnel
  instagram: "",                       // ← lien Instagram (optionnel)
  tiktok:    ""                        // ← lien TikTok (optionnel)
};
// Les devis et messages sont envoyés à SHOP.email via FormSubmit (aucun compte,
// aucune clé). À la 1re demande, un email de confirmation à cliquer une seule fois.

/* ====== Navigation ====== */
const NAV = [
  { href: "index.html",                  label: "Accueil" },
  { href: "nouveautes.html",             label: "Nouveautés" },
  { href: "boutique.html?cat=figurines", label: "Figurines" },
  { href: "boutique.html?cat=accessoires", label: "Accessoires" },
  { href: "boutique.html?cat=decorations", label: "Décorations" },
  { href: "sur-mesure.html",             label: "Personnalisation" },
  { href: "contact.html",                label: "Contact" }
];

const ICON = {
  logo:  `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 2v18M4 6.5l8 4.5 8-4.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  moon:  `<svg viewBox="0 0 24 24" fill="none"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  cart:  `<svg viewBox="0 0 24 24" fill="none"><path d="M4 5h2l2.2 10.5a1.5 1.5 0 001.5 1.2h7.6a1.5 1.5 0 001.5-1.2L20.5 8H7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.4" fill="currentColor"/><circle cx="18" cy="20" r="1.4" fill="currentColor"/></svg>`,
  menu:  `<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  lock:  `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" stroke-width="1.6"/></svg>`
};

function currentPage() {
  const p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  return p === '' ? 'index.html' : p;
}

function brandHTML(withTag) {
  return `<a class="brand" href="index.html">
    <span class="mark">${ICON.logo}</span>
    <span>${SHOP.name}${withTag ? `<small>${SHOP.tagline}</small>` : ''}</span>
  </a>`;
}

function headerHTML() {
  const page = currentPage();
  const curCat = new URLSearchParams(location.search).get('cat');
  const links = NAV.map((n) => {
    const [hp, hq] = n.href.split('?');
    const hcat = hq ? new URLSearchParams(hq).get('cat') : null;
    const isActive = hp === page && (hcat ? hcat === curCat : !curCat || hp !== 'boutique.html');
    return `<a href="${n.href}"${isActive ? ' class="active"' : ''}>${n.label}</a>`;
  }).join('');
  return `
    <div class="wrap nav">
      ${brandHTML(true)}
      <nav class="nav-links">${links}</nav>
      <div class="nav-right">
        <button class="icon-btn" id="theme-toggle" aria-label="Thème clair / sombre">${ICON.moon}</button>
        <a class="icon-btn cart-btn" href="panier.html" aria-label="Panier">${ICON.cart}<span class="cart-count" id="cart-count" hidden>0</span></a>
        <button class="icon-btn nav-toggle" aria-label="Menu">${ICON.menu}</button>
      </div>
    </div>`;
}

function footerHTML() {
  const social = [];
  if (SHOP.instagram) social.push(`<a href="${SHOP.instagram}" target="_blank" rel="noopener">Instagram</a>`);
  if (SHOP.tiktok) social.push(`<a href="${SHOP.tiktok}" target="_blank" rel="noopener">TikTok</a>`);
  return `
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          ${brandHTML(false)}
          <p style="margin-top:14px;">Objets et figurines imprimés en 3D, façonnés avec soin. Créations originales et pièces sur mesure.</p>
          ${social.length ? `<div class="footer-social">${social.join('')}</div>` : ''}
        </div>
        <div>
          <h4>Boutique</h4>
          <a href="boutique.html?cat=figurines">Figurines</a>
          <a href="boutique.html?cat=accessoires">Accessoires</a>
          <a href="boutique.html?cat=decorations">Décorations murales</a>
          <a href="panier.html">Mon panier</a>
        </div>
        <div>
          <h4>Studio</h4>
          <a href="a-propos.html">À propos</a>
          <a href="sur-mesure.html">Personnalisation</a>
          <a href="nouveautes.html">Nouveautés</a>
          <a href="faq.html">FAQ</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:${SHOP.email}">${SHOP.email}</a>
          <a href="tel:${SHOP.phone.replace(/\s/g, '')}">${SHOP.phone}</a>
          <a href="contact.html">Formulaire de contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year"></span> ${SHOP.name}. Tous droits réservés.</span>
        <span class="secure">${ICON.lock} Paiement sécurisé via Stripe</span>
      </div>
    </div>`;
}

function initChrome() {
  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  if (h) { h.className = 'site-header'; h.innerHTML = headerHTML(); }
  if (f) { f.className = 'site-footer'; f.innerHTML = footerHTML(); }
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

/* ====== PANIER (stocké dans le navigateur) ====== */
const CART_KEY = 'alya_cart_v1';
const Cart = {
  read() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { return {}; } },
  write(c) { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} updateCartCount(); },
  add(name, qty = 1) { const c = this.read(); c[name] = (c[name] || 0) + qty; this.write(c); },
  set(name, qty) { const c = this.read(); if (qty <= 0) delete c[name]; else c[name] = qty; this.write(c); },
  remove(name) { const c = this.read(); delete c[name]; this.write(c); },
  clear() { this.write({}); },
  count() { return Object.values(this.read()).reduce((a, b) => a + b, 0); },
  lines() {
    const c = this.read();
    return Object.keys(c).map((name) => {
      const p = PRODUCTS.find((x) => x.name === name) || { name, price: 0, category: 'figurines', description: '' };
      return { ...p, qty: c[name] };
    });
  },
  total() { return this.lines().reduce((s, l) => s + l.price * l.qty, 0); }
};

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const n = Cart.count();
  el.textContent = n;
  el.hidden = n === 0;
}

function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._to);
  t._to = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ====== Visuels d'attente par catégorie (façon photo studio) ====== */
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

const euros = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const catLabel = (id) => (CATEGORIES.find((c) => c.id === id) || {}).label || id;

function badgeClass(b) {
  b = (b || '').toLowerCase();
  if (b.includes('nouveau')) return 'nouveau';
  if (b.includes('populaire')) return 'populaire';
  return '';
}

function mediaHTML(p) {
  if (p.image && p.image.trim() !== '') return `<img src="${p.image}" alt="${p.name}" loading="lazy">`;
  return placeholder(p.category);
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
        <div class="price-row"><span class="price">${euros(p.price)} €</span>${old}</div>
        <button class="btn btn-primary btn-block add-cart" data-name="${p.name}">Ajouter au panier</button>
      </div>
    </article>`;
}

function renderProducts(list, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = list.length ? list.map(cardHTML).join('') : `<p class="empty">Aucun produit dans cette catégorie pour le moment.</p>`;
}

function wireAddButtons(scope) {
  (scope || document).querySelectorAll('.add-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      Cart.add(btn.dataset.name);
      toast('Ajouté au panier ✓');
    });
  });
}

/* ====== Accueil : sélection ====== */
function initFeatured() {
  if (!document.getElementById('featured-grid')) return;
  const pop = PRODUCTS.filter((p) => (p.badge || '').toLowerCase().includes('populaire'));
  const rest = PRODUCTS.filter((p) => !pop.includes(p));
  renderProducts([...pop, ...rest].slice(0, 4), 'featured-grid');
  wireAddButtons();
}

/* ====== Nouveautés ====== */
function initNouveautes() {
  const mount = document.getElementById('new-grid');
  if (!mount) return;
  const news = PRODUCTS.filter((p) => (p.badge || '').toLowerCase().includes('nouveau'));
  renderProducts(news.length ? news : PRODUCTS.slice(0, 8), 'new-grid');
  wireAddButtons();
}

/* ====== Boutique : filtres ====== */
function initShop() {
  const mount = document.getElementById('shop-grid');
  const filters = document.getElementById('filters');
  if (!mount || !filters) return;
  const buttons = [{ id: 'all', label: 'Tout' }, ...CATEGORIES];
  filters.innerHTML = buttons.map((b, i) => `<button class="chip ${i === 0 ? 'active' : ''}" data-filter="${b.id}">${b.label}</button>`).join('');
  const apply = (cat) => { renderProducts(cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat), 'shop-grid'); wireAddButtons(); };
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
  } else { apply('all'); }
}

/* ====== Illustrations de catégorie / hero ====== */
function initCatArt() {
  document.querySelectorAll('[data-cat-art]').forEach((el) => { el.innerHTML = placeholder(el.getAttribute('data-cat-art')); });
}

/* ====== Page panier ====== */
function cartLineHTML(l) {
  const pay = (l.stripe && l.stripe.trim() !== '')
    ? `<a class="btn btn-ghost btn-sm" href="${l.stripe}" target="_blank" rel="noopener">Payer</a>`
    : `<button class="btn btn-ghost btn-sm" disabled>Paiement bientôt</button>`;
  return `
    <div class="cart-line" data-name="${l.name}">
      <div class="cart-thumb">${mediaHTML(l)}</div>
      <div class="cart-info">
        <span class="card-cat">${catLabel(l.category)}</span>
        <h3>${l.name}</h3>
        <span class="cart-unit">${euros(l.price)} € l'unité</span>
      </div>
      <div class="qty">
        <button class="qty-btn" data-act="minus" aria-label="Retirer un">–</button>
        <span class="qty-val">${l.qty}</span>
        <button class="qty-btn" data-act="plus" aria-label="Ajouter un">+</button>
      </div>
      <div class="cart-line-total">${euros(l.price * l.qty)} €</div>
      <div class="cart-line-actions">${pay}<button class="link-remove" data-act="remove" aria-label="Supprimer">Retirer</button></div>
    </div>`;
}

function renderCart() {
  const root = document.getElementById('cart-root');
  if (!root) return;
  const lines = Cart.lines();
  if (!lines.length) {
    root.innerHTML = `
      <div class="cart-empty">
        <p>Votre panier est vide pour le moment.</p>
        <a class="btn btn-primary" href="boutique.html">Découvrir la boutique</a>
      </div>`;
    return;
  }
  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-lines">${lines.map(cartLineHTML).join('')}</div>
      <aside class="cart-summary">
        <h3>Récapitulatif</h3>
        <div class="sum-row"><span>Sous-total</span><b>${euros(Cart.total())} €</b></div>
        <div class="sum-row muted"><span>Livraison</span><span>calculée au paiement</span></div>
        <p class="sum-note">Chaque article se règle en toute sécurité via son lien Stripe. Un paiement groupé pourra être ajouté ensuite.</p>
        <button class="link-remove" id="clear-cart">Vider le panier</button>
      </aside>
    </div>`;
  root.querySelectorAll('.cart-line').forEach((line) => {
    const name = line.dataset.name;
    line.addEventListener('click', (e) => {
      const act = e.target.closest('[data-act]')?.dataset.act;
      if (!act) return;
      const cur = Cart.read()[name] || 0;
      if (act === 'plus') Cart.set(name, cur + 1);
      if (act === 'minus') Cart.set(name, cur - 1);
      if (act === 'remove') Cart.remove(name);
      renderCart();
    });
  });
  document.getElementById('clear-cart')?.addEventListener('click', () => { Cart.clear(); renderCart(); });
}

/* ====== Thème clair / sombre ====== */
function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('theme_alya'); } catch (e) {}
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#theme-toggle')) return;
    const cur = document.documentElement.getAttribute('data-theme');
    const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme_alya', next); } catch (e) {}
  });
}

/* ====== Menu mobile ====== */
function initNav() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-toggle')) {
      document.querySelector('.nav-links')?.classList.toggle('open');
    }
  });
}

/* ====== Apparition au scroll ====== */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) { els.forEach((el) => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

/* ====== Formulaire devis / contact ====== */
function initForms() {
  document.querySelectorAll('form[data-mailto]').forEach((form) => {
    if (!SHOP.email) return;
    // Envoi automatique par email via FormSubmit (aucun compte / aucune clé)
    form.action = 'https://formsubmit.co/' + SHOP.email;
    form.method = 'POST';
    form.enctype = 'multipart/form-data';

    const addHidden = (name, value) => {
      if (form.querySelector('[name="' + name + '"]')) return;
      const i = document.createElement('input');
      i.type = 'hidden'; i.name = name; i.value = value;
      form.appendChild(i);
    };
    addHidden('_subject', form.dataset.subject || 'Nouveau message — ALYA');
    addHidden('_template', 'table');
    addHidden('_captcha', 'false');
    try { addHidden('_next', new URL('merci.html', location.href).href); } catch (e) {}

    if (!form.querySelector('[name="_honey"]')) {
      const h = document.createElement('input');
      h.type = 'text'; h.name = '_honey'; h.tabIndex = -1; h.autocomplete = 'off';
      h.style.cssText = 'position:absolute;left:-9999px;opacity:0;height:0;width:0;';
      form.appendChild(h);
    }

    form.addEventListener('submit', () => {
      if (!form.checkValidity()) return;
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours…'; }
    });
  });
}

/* ====== Intro : imprimante 3D qui imprime le logo ALYA ====== */
function initIntro() {
  // L'animation ne se joue QU'À l'ouverture du site (page d'accueil), jamais
  // au clic d'un bouton : les autres pages ne la déclenchent donc jamais.
  if (currentPage() !== 'index.html') return;
  try { if (sessionStorage.getItem('alya_intro')) return; } catch (e) {}
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { try { sessionStorage.setItem('alya_intro', '1'); } catch (e) {} return; }
  const machine = `
    <svg class="intro-machine" viewBox="0 0 460 340" xmlns="http://www.w3.org/2000/svg">
      <rect class="foot" x="58" y="286" width="34" height="11" rx="3"/>
      <rect class="foot" x="368" y="286" width="34" height="11" rx="3"/>
      <path class="frame" d="M75 288 V46 H385 V288"/>
      <path class="frame" d="M58 288 H402"/>
      <polygon class="bed-top" points="140,246 320,246 300,232 120,232"/>
      <polygon class="bed-front" points="140,246 320,246 320,258 140,258"/>
      <g class="ig">
        <rect class="gantry-bar" x="75" y="150" width="310" height="14" rx="3"/>
        <circle class="motor" cx="82" cy="157" r="11"/>
        <circle class="motor" cx="378" cy="157" r="11"/>
        <g class="carriage">
          <line class="filament" x1="230" y1="128" x2="230" y2="144"/>
          <rect class="carriage-box" x="212" y="142" width="36" height="30" rx="5"/>
          <path class="nozzle" d="M220 172 h20 l-5 13 h-10 z"/>
          <rect class="nozzle" x="228" y="185" width="4" height="7" rx="1"/>
          <rect class="spark" x="226" y="189" width="8" height="5" rx="1"/>
        </g>
      </g>
    </svg>`;
  const el = document.createElement('div');
  el.className = 'intro';
  el.id = 'intro';
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', SHOP.name + ' — ' + SHOP.tagline);
  el.innerHTML = `
    <div class="intro-stage">
      ${machine}
      <div class="intro-print">${SHOP.name}</div>
    </div>
    <div class="intro-tag">${SHOP.tagline} · votre logo prend forme</div>`;
  document.body.appendChild(el);
  try { sessionStorage.setItem('alya_intro', '1'); } catch (e) {}
  const close = () => { el.classList.add('hide'); setTimeout(() => el.remove(), 600); };
  el.addEventListener('click', close);
  setTimeout(close, 3300);
}

document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  initChrome();
  updateCartCount();
  initTheme();
  initNav();
  initCatArt();
  initFeatured();
  initNouveautes();
  initShop();
  renderCart();
  initForms();
  initReveal();
  // remplit les coordonnées affichées dans les pages (contact, etc.)
  document.querySelectorAll('[data-shop]').forEach((el) => {
    const key = el.getAttribute('data-shop');
    const val = SHOP[key] || '';
    if (el.tagName === 'A') {
      if (key === 'email') el.href = `mailto:${val}`;
      else if (key === 'phone') el.href = `tel:${val.replace(/\s/g, '')}`;
      el.textContent = val;
    } else { el.textContent = val; }
  });
});
