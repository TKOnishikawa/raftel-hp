/* ========================================
   omoshiku v2 — Minimal JS
   Lenis + Scroll Reveal + Nav + Hamburger
   ======================================== */

// 1. Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Scroll reveal (IntersectionObserver)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});
document.querySelectorAll('.reveal-v2').forEach(el => revealObserver.observe(el));

// 3. Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// 4. Hamburger menu with ARIA
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', !isExpanded);
  hamburger.setAttribute('aria-label', !isExpanded ? 'メニューを閉じる' : 'メニューを開く');
}

document.getElementById('hamburger')?.addEventListener('click', toggleMenu);

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  if (!hamburger) return;

  hamburger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
    if (e.key === 'Escape' && this.getAttribute('aria-expanded') === 'true') {
      toggleMenu();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const navLinks = document.getElementById('navLinks');
      if (navLinks && navLinks.classList.contains('active')) {
        toggleMenu();
        document.getElementById('hamburger').focus();
      }
    }
  });
});

// 5. Smooth scroll for anchor links (via Lenis)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      lenis.scrollTo(target, { offset: 0 });
      document.getElementById('navLinks')?.classList.remove('active');
    }
  });
});
