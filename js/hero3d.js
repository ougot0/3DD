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
    obj.position.sub(center);                         // centre à l'origine
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.4 / maxDim;
    obj.scale.setScalar(scale);

    // Orientation « dans le bon sens » : debout, face à la caméra.
    // Ajustable sans toucher au JS via data-rot-x / -y / -z (en degrés)
    const d2r = Math.PI / 180;
    obj.rotation.x = (parseFloat(frame.dataset.rotX) || 0) * d2r;
    obj.rotation.y = (parseFloat(frame.dataset.rotY) || 0) * d2r;
    obj.rotation.z = (parseFloat(frame.dataset.rotZ) || 0) * d2r;

    // S'assurer que les matériaux réagissent bien à la lumière
    obj.traverse((ch) => {
      if (ch.isMesh && ch.material) {
        const mats = Array.isArray(ch.material) ? ch.material : [ch.material];
        mats.forEach((m) => {
          if (m.map) m.map.colorSpace = THREE.SRGBColorSpace;
          if ('metalness' in m) m.metalness = Math.min(m.metalness ?? 0.2, 0.35);
          if ('roughness' in m) m.roughness = Math.max(m.roughness ?? 0.6, 0.45);
          m.needsUpdate = true;
        });
      }
    });

    pivot.add(obj);
    frame.innerHTML = '';
    frame.appendChild(renderer.domElement);
  },
  undefined,
  (err) => { console.warn('[ALYA] Échec chargement FBX', err); fallback(); });

  // Interaction : glisser pour tourner, sinon rotation auto lente
  let autoRot = true, dragging = false, px = 0, targetY = 0, curY = 0;
  frame.addEventListener('pointerdown', (e) => { dragging = true; autoRot = false; px = e.clientX; renderer.domElement.style.cursor = 'grabbing'; });
  addEventListener('pointerup', () => { dragging = false; renderer.domElement.style.cursor = 'grab'; });
  addEventListener('pointermove', (e) => {
    if (!dragging) return;
    targetY += (e.clientX - px) * 0.01; px = e.clientX;
  });

  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    const dt = clock.getDelta();
    if (autoRot) targetY += dt * 0.45;          // rotation lente
    curY += (targetY - curY) * 0.12;            // lissage
    pivot.rotation.y = curY;
    renderer.render(scene, camera);
  }
  tick();

  addEventListener('resize', () => {
    camera.aspect = W() / H(); camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  });
}

boot();
