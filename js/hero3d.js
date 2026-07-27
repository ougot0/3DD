/* ============================================================
   ALYA — Modèle 3D (FBX) dans le hero
   Charge Three.js + FBXLoader depuis un CDN, affiche le logo 3D
   texturé qui tourne lentement. Repli sur le cube CSS si le
   chargement échoue (ex. aperçu hors-ligne / WebGL indisponible).
   ============================================================ */

const frame = document.querySelector('.hero-frame[data-model]');

function fallback() {
  if (window.injectHeroCube && frame) window.injectHeroCube(frame);
}

// WebGL dispo ?
function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (e) { return false; }
}

async function boot() {
  if (!frame) return;
  if (!webglOK()) { fallback(); return; }

  let THREE, FBXLoader;
  try {
    THREE = await import('three');
    ({ FBXLoader } = await import('three/addons/loaders/FBXLoader.js'));
  } catch (e) {
    console.warn('[ALYA] Three.js indisponible, repli cube CSS', e);
    fallback();
    return;
  }

  const url = frame.getAttribute('data-model');
  frame.classList.add('model-host');
  frame.innerHTML = '<div class="model-loading"><span></span></div>';

  const W = () => frame.clientWidth || 480;
  const H = () => frame.clientHeight || 480;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.setSize(W(), H());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;cursor:grab;';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, W() / H(), 0.1, 2000);
  camera.position.set(0, 0, 6);

  // Éclairage : ambiance douce + accents violet / bleu (identité ALYA)
  scene.add(new THREE.HemisphereLight(0xffffff, 0x2a2350, 1.05));
  const key = new THREE.DirectionalLight(0xffffff, 1.7);
  key.position.set(4, 6, 7);
  scene.add(key);
  const violet = new THREE.DirectionalLight(0x8b5cff, 1.1);
  violet.position.set(-6, 2, 3);
  scene.add(violet);
  const bleu = new THREE.DirectionalLight(0x3da5ff, 1.0);
  bleu.position.set(3, -4, -5);
  scene.add(bleu);
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  // Groupe pivot pour la rotation automatique
  const pivot = new THREE.Group();
  scene.add(pivot);

  const loader = new FBXLoader();
  loader.load(url, (obj) => {
    // Recentrer + mettre à l'échelle pour remplir le cadre
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3(); box.getSize(size);
    const center = new THREE.Vector3(); box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    // Matériaux : bien réagir à la lumière, texture en sRGB, double face
    obj.traverse((ch) => {
      if (ch.isMesh && ch.material) {
        const mats = Array.isArray(ch.material) ? ch.material : [ch.material];
        mats.forEach((m) => {
          if (m.map) m.map.colorSpace = THREE.SRGBColorSpace;
          m.side = THREE.DoubleSide;
          if ('metalness' in m) m.metalness = Math.min(m.metalness ?? 0.2, 0.35);
          if ('roughness' in m) m.roughness = Math.max(m.roughness ?? 0.6, 0.45);
          m.needsUpdate = true;
        });
      }
    });

    // Recentrage + mise à l'échelle robustes :
    //  - on translate le modèle DANS un holder pour centrer son contenu à l'origine
    //  - on met le holder à l'échelle (le centre reste à l'origine → rotation sur place)
    const holder = new THREE.Group();
    holder.add(obj);
    obj.position.sub(center);
    holder.scale.setScalar(3.4 / maxDim);

    // Orientation « dans le bon sens » : debout, face à la caméra.
    // Ajustable sans toucher au JS via data-rot-x / -y / -z (en degrés)
    const d2r = Math.PI / 180;
    holder.rotation.x = (parseFloat(frame.dataset.rotX) || 0) * d2r;
    holder.rotation.y = (parseFloat(frame.dataset.rotY) || 0) * d2r;
    holder.rotation.z = (parseFloat(frame.dataset.rotZ) || 0) * d2r;

    pivot.add(holder);
    frame.innerHTML = '';
    frame.appendChild(renderer.domElement);
  },
  undefined,
  (err) => { console.warn('[ALYA] Échec chargement FBX', err); fallback(); });

  // Rotation 3D : balancement continu (montre le relief & les côtés,
  // le logo reste toujours lisible). Glisser pour tourner à la main :
  // l'objet suit le doigt puis revient doucement au balancement.
  const AMPL = 0.62;      // amplitude du balancement (~35°)
  const SPEED = 0.55;     // vitesse du balancement
  let dragging = false, px = 0, manual = 0, t = 0;
  frame.addEventListener('pointerdown', (e) => { dragging = true; px = e.clientX; renderer.domElement.style.cursor = 'grabbing'; });
  addEventListener('pointerup', () => { dragging = false; renderer.domElement.style.cursor = 'grab'; });
  addEventListener('pointermove', (e) => {
    if (!dragging) return;
    manual += (e.clientX - px) * 0.012; px = e.clientX;
  });

  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    const dt = clock.getDelta();
    t += dt;
    if (!dragging) manual *= 0.94;              // revient au balancement après un glisser
    pivot.rotation.y = Math.sin(t * SPEED) * AMPL + manual;
    renderer.render(scene, camera);
  }
  tick();

  addEventListener('resize', () => {
    camera.aspect = W() / H(); camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  });
}

boot();
