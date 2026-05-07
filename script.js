// ============================================================
// WSB by Studio NoKa — script.js  v2
// ============================================================

// ローダー
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    // ヒーローテキストアニメーション起動
    document.querySelectorAll('.h1-line').forEach(el => el.classList.add('visible'));
  }, 800);
});

// ヘッダー スクロール
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 80);
});

// モバイルメニュー
const menuBtn  = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
  });
});

// カスタムカーソル
const cursor = document.createElement('div');
cursor.style.cssText = `
  width: 8px; height: 8px;
  background: #b8965a;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.15s, height 0.15s, opacity 0.15s;
  mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

const cursorOuter = document.createElement('div');
cursorOuter.style.cssText = `
  width: 32px; height: 32px;
  border: 1px solid rgba(184,150,90,0.4);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: all 0.12s ease, width 0.2s, height 0.2s;
`;
document.body.appendChild(cursorOuter);

let mx = 0, my = 0, ox = 0, oy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateCursor() {
  ox += (mx - ox) * 0.15;
  oy += (my - oy) * 0.15;
  cursorOuter.style.left = ox + 'px';
  cursorOuter.style.top  = oy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ホバー時カーソル拡大
document.querySelectorAll('a, button, .faq-q').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursorOuter.style.width = '48px';
    cursorOuter.style.height = '48px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    cursorOuter.style.width = '32px';
    cursorOuter.style.height = '32px';
  });
});

// スクロールリビール
const revealEls = document.querySelectorAll(
  '.section-eyebrow, h2, .statement-quote, .statement-sub, ' +
  '.about-row-body, .plan-row, .works-item, .flow-item, ' +
  '.voice-featured, .voice-small, .faq-item, .contact-inner h2, .contact-body'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 50);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// FAQ アコーディオン
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// セクション内の数値アニメーション (オプション)
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
