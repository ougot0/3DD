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
  camera.position.set(0, 0.7, 6);       // légère plongée → rendu 3/4 plus dynamique
  camera.lookAt(0, 0, 0);

  // Éclairage : ambiance douce + lumière clé + accents violets « stylés »
  // qui tournent autour du logo pour faire glisser des reflets sur la matière.
  scene.add(new THREE.HemisphereLight(0xffffff, 0x241a44, 0.9));
  scene.add(new THREE.AmbientLight(0xffffff, 0.28));
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(3, 5, 7);
  scene.add(key);
  // Spots violet + bleu qui orbitent (animés dans la boucle de rendu)
  const violet = new THREE.PointLight(0x8b5cff, 60, 40, 2);
  const bleu   = new THREE.PointLight(0x3aa0ff, 42, 40, 2);
  const rim    = new THREE.PointLight(0xa06bff, 34, 40, 2);
  scene.add(violet, bleu, rim);

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

  // Rotation 3D automatique, continue et lente (tour complet).
  // On peut aussi glisser à la souris ; la rotation auto reprend ensuite.
  const SPEED = 0.42;     // vitesse de rotation auto (~15 s le tour)
  let dragging = false, px = 0, angle = 0, t = 0;
  frame.addEventListener('pointerdown', (e) => { dragging = true; px = e.clientX; renderer.domElement.style.cursor = 'grabbing'; });
  addEventListener('pointerup', () => { dragging = false; renderer.domElement.style.cursor = 'grab'; });
  addEventListener('pointermove', (e) => {
    if (!dragging) return;
    angle += (e.clientX - px) * 0.01; px = e.clientX;
  });

  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    const dt = clock.getDelta();
    t += dt;
    if (!dragging) angle += dt * SPEED;         // tourne tout seul, doucement
    pivot.rotation.y = angle;

    // Spots violets « stylés » qui orbitent → reflets qui glissent sur le logo
    violet.position.set(Math.cos(t * 0.9) * 4.5, 1.8, Math.sin(t * 0.9) * 4.5 + 2);
    bleu.position.set(Math.cos(t * 0.9 + 2.4) * 4.5, -1.5, Math.sin(t * 0.9 + 2.4) * 4.5 + 2);
    rim.position.set(Math.cos(t * 0.5 + 3.14) * 3.5, 2.5, Math.sin(t * 0.5 + 3.14) * 3.5 - 3);

    renderer.render(scene, camera);
  }
  tick();

  addEventListener('resize', () => {
    camera.aspect = W() / H(); camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  });
}

boot();
