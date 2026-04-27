/* ════════════════════════════════════════════════════════
   script.js  —  Epistola Amoris  |  Valentine Letter
   Lógica: partículas · animación sobre · botón escapista
════════════════════════════════════════════════════════ */

'use strict';

/* ────────────────────────────────────────────────────────
   1.  PARTÍCULAS FLOTANTES DE FONDO
   Crea corazones y símbolos griegos flotando en pantalla
──────────────────────────────────────────────────────── */
(function spawnParticles() {
  const container = document.getElementById('particles');
  // Símbolos que aparecerán flotando
  const symbols = ['♥', '✦', '❧', '✿', '♡', '⊹'];

  for (let i = 0; i < 28; i++) {
    const el = document.createElement('span');
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size  = 10 + Math.random() * 16;          // px
    const left  = Math.random() * 96 + 2;           // %
    const top   = Math.random() * 92 + 2;           // %
    const dur   = 7  + Math.random() * 10;          // segundos
    const delay = Math.random() * 8;                // segundos
    const alpha = 0.04 + Math.random() * 0.10;

    el.style.cssText = `
      position: absolute;
      left: ${left}%;
      top:  ${top}%;
      font-size: ${size}px;
      color: rgba(180, 100, 80, ${alpha});
      animation: particle-drift ${dur}s ease-in-out ${delay}s infinite alternate;
      pointer-events: none;
    `;
    container.appendChild(el);
  }
})();


/* ────────────────────────────────────────────────────────
   2.  CAMBIO DE ESCENAS
──────────────────────────────────────────────────────── */
function goToScene(fromId, toId) {
  document.getElementById(fromId).classList.remove('active');
  document.getElementById(toId).classList.add('active');
}


/* ────────────────────────────────────────────────────────
   3.  ABRIR EL SOBRE  (Escena 1 → Escena 2)
──────────────────────────────────────────────────────── */
function openEnvelope() {
  const outer     = document.getElementById('envelopeOuter');
  const flap      = document.getElementById('envFlap');
  const waxSeal   = document.getElementById('waxSeal');
  const letterPeek = document.getElementById('letterPeek');
  const tapHint   = document.getElementById('tapHint');

  // Desactivar clic para evitar doble ejecución
  outer.onclick  = null;
  outer.style.cursor = 'default';

  // ① Ocultar el hint
  tapHint.style.opacity = '0';

  // ② El sello se desvanece suavemente
  waxSeal.classList.add('hide');

  // ③ La solapa se abre (voltea hacia atrás en 3D)
  setTimeout(() => {
    flap.classList.add('opened');
  }, 80);

  // ④ La carta asoma desde dentro del sobre
  setTimeout(() => {
    letterPeek.classList.add('rise');
  }, 600);

  // ⑤ Transición a Escena 2 con ventana griega
  setTimeout(() => {
    goToScene('scene-envelope', 'scene-question');
    setTimeout(() => {
      document.getElementById('greekWindow').classList.add('show');
      setupNoButton();   // Activar el botón que escapa
    }, 250);
  }, 1700);
}


/* ────────────────────────────────────────────────────────
   4.  BOTÓN "NO" QUE ESCAPA DEL CURSOR
──────────────────────────────────────────────────────── */
let cursorX = window.innerWidth  / 2;
let cursorY = window.innerHeight / 2;

// Rastrear posición del cursor en todo momento
document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function setupNoButton() {
  const btn = document.getElementById('btnNo');

  // Leer posición actual del botón en pantalla
  const rect = btn.getBoundingClientRect();

  // Convertirlo a position:fixed manteniéndolo en el mismo lugar
  btn.style.position   = 'fixed';
  btn.style.left       = rect.left + 'px';
  btn.style.top        = rect.top  + 'px';
  btn.style.margin     = '0';
  btn.style.zIndex     = '9999';
  btn.style.transition =
    'left .22s cubic-bezier(.25,.46,.45,.94), top .22s cubic-bezier(.25,.46,.45,.94)';

  // Disparar el escape en mouseover / mousemove / touch
  btn.addEventListener('mouseenter', moveNoBtn);
  btn.addEventListener('mousemove',  moveNoBtn);

  // Soporte táctil (móviles)
  document.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    maybeEscapeFromTouch(t.clientX, t.clientY);
  }, { passive: true });
}

function moveNoBtn() {
  const btn    = document.getElementById('btnNo');
  const margin = 28;
  const maxX   = window.innerWidth  - btn.offsetWidth  - margin;
  const maxY   = window.innerHeight - btn.offsetHeight - margin;

  // Buscar posición suficientemente lejos del cursor (hasta 12 intentos)
  let nx = margin + Math.random() * maxX;
  let ny = margin + Math.random() * maxY;

  for (let i = 0; i < 12; i++) {
    const cx = margin + Math.random() * maxX;
    const cy = margin + Math.random() * maxY;
    if (Math.hypot(cx - cursorX, cy - cursorY) > 190) {
      nx = cx;
      ny = cy;
      break;
    }
  }

  btn.style.left = Math.max(margin, Math.min(nx, maxX)) + 'px';
  btn.style.top  = Math.max(margin, Math.min(ny, maxY)) + 'px';
}

function maybeEscapeFromTouch(tx, ty) {
  const btn = document.getElementById('btnNo');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const dist = Math.hypot(tx - (rect.left + rect.width / 2),
                          ty - (rect.top  + rect.height / 2));
  // Solo escapa si el toque está cerca
  if (dist < 80) moveNoBtn();
}


/* ────────────────────────────────────────────────────────
   5.  PRESIONAR "SÍ" → CARTA ROMÁNTICA  (Escena 2 → 3)
──────────────────────────────────────────────────────── */
function pressYes() {
  // Quitar el botón NO de la pantalla
  const btnNo = document.getElementById('btnNo');
  if (btnNo) btnNo.style.display = 'none';

  // Mini lluvia de corazones de celebración
  spawnHeartRain();

  // Ir a escena 3 con ligero retardo para el efecto
  setTimeout(() => {
    goToScene('scene-question', 'scene-letter');
    setTimeout(() => {
      document.getElementById('letterPaper').classList.add('open');
    }, 280);
  }, 350);
}


/* ────────────────────────────────────────────────────────
   6.  LLUVIA DE CORAZONES al presionar SÍ
──────────────────────────────────────────────────────── */
function spawnHeartRain() {
  const count = 22;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const h = document.createElement('span');
      h.textContent = ['♥','💕','💗','✦','♡'][Math.floor(Math.random() * 5)];
      const startX = 10 + Math.random() * 80;   // %
      const dur    = 1.2 + Math.random() * 1.2; // segundos

      h.style.cssText = `
        position: fixed;
        left: ${startX}%;
        top: -30px;
        font-size: ${14 + Math.random() * 22}px;
        color: rgba(200, 80, 100, ${.5 + Math.random() * .5});
        z-index: 9000;
        pointer-events: none;
        animation: particle-fall ${dur}s ease-in forwards;
      `;
      document.body.appendChild(h);
      // Limpiar después de la animación
      setTimeout(() => h.remove(), dur * 1000 + 200);
    }, i * 55);
  }
}


/* ────────────────────────────────────────────────────────
   7.  ACCESIBILIDAD: abrir sobre con Enter / Space
──────────────────────────────────────────────────────── */
document.getElementById('envelopeOuter')
  .addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });
