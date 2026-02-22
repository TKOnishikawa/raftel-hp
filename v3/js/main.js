/* ========================================
   omoshiku v3 — GSAP ScrollTrigger Animations
   ======================================== */

gsap.registerPlugin(ScrollTrigger);

// ========================================
// Config
// ========================================
const EASE = {
  smooth: "power2.out",
  snappy: "power3.out",
  bounce: "back.out(1.2)",
  none: "none"
};

const DUR = {
  fast: 0.4,
  normal: 0.7,
  slow: 1.0
};

const STAGGER = {
  tight: 0.08,
  normal: 0.12,
  wide: 0.2
};

// ========================================
// 1. Hero: Initial Load Animation
// ========================================
function initHeroEntrance() {
  const tl = gsap.timeline({ delay: 0.4 });

  // Line mask reveal
  tl.to(".hero-catch .line-inner", {
    y: 0,
    duration: DUR.slow,
    ease: EASE.snappy,
    stagger: 0.18
  })
  // Gradient swipe on accent text
  .to(".accent-text", {
    backgroundPosition: "0% 50%",
    duration: 0.9,
    ease: "power2.inOut",
    stagger: 0.1
  }, "-=0.5")
  // Typewriter label
  .fromTo(".typewriter-label",
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.6, ease: EASE.smooth },
    "-=0.6"
  )
  // Sub copy
  .fromTo(".hero-sub",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: EASE.smooth },
    "-=0.4"
  )
  // CTA buttons
  .fromTo(".hero-cta-group",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: EASE.bounce },
    "-=0.3"
  )
  // Scroll indicator
  .fromTo(".scroll-indicator",
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    "-=0.2"
  );
}

// ========================================
// 2. Hero: Scroll Parallax (Desktop)
// ========================================
function initHeroParallax() {
  // Background orbs — slowest
  gsap.to(".hero-bg", {
    y: "-25%",
    ease: EASE.none,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.6
    }
  });

  // Mesh — medium
  gsap.to(".hero-mesh", {
    y: "-40%",
    opacity: 0.02,
    ease: EASE.none,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.5
    }
  });

  // Hero content fade + blur
  gsap.to(".hero-content", {
    opacity: 0.15,
    y: -80,
    filter: "blur(4px)",
    ease: EASE.none,
    scrollTrigger: {
      trigger: ".hero",
      start: "15% top",
      end: "75% top",
      scrub: true
    }
  });

  // Scroll indicator disappear
  gsap.to(".scroll-indicator", {
    opacity: 0,
    y: 20,
    scrollTrigger: {
      trigger: ".hero",
      start: "3% top",
      end: "12% top",
      scrub: true
    }
  });
}

// ========================================
// 3. Hero: Mouse Parallax (Desktop)
// ========================================
function initHeroMouse() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  hero.addEventListener("mousemove", (e) => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;

    gsap.to(".hero-orb--1", { x: cx * 25, y: cy * 20, duration: 1.2, ease: EASE.smooth });
    gsap.to(".hero-orb--2", { x: cx * -20, y: cy * -15, duration: 1.5, ease: EASE.smooth });
    gsap.to(".hero-orb--3", { x: cx * -12, y: cy * -8, duration: 1.8, ease: EASE.smooth });
  });
}

// ========================================
// 4. Typewriter
// ========================================
function initTypewriter() {
  const el = document.getElementById("typewriterText");
  if (!el) return;

  const phrases = [
    "DX / AI GROWTH PARTNER",
    "DATA-DRIVEN TRANSFORMATION",
    "COACHING \u00d7 CONSULTING \u00d7 ENGINEERING"
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function step() {
    const current = phrases[phraseIndex];
    isDeleting ? charIndex-- : charIndex++;
    el.textContent = current.substring(0, charIndex);

    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === current.length) {
      delay = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 500;
    }

    setTimeout(step, delay);
  }

  step();
}

// ========================================
// 5. DOM Particles + Constellation Canvas
// ========================================
function initParticlesAndConstellation() {
  const container = document.getElementById("domParticles");
  const canvas = document.getElementById("constellation");
  if (!container || !canvas) return;

  const ctx = canvas.getContext("2d");
  const hero = container.closest(".hero");
  const isMobile = window.innerWidth < 769;
  const count = isMobile ? 25 : 50;
  const connectionDistance = 120;
  const particles = [];

  function resize() {
    const rect = hero.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function createParticles() {
    const w = hero.offsetWidth;
    const h = hero.offsetHeight;

    for (let i = 0; i < count; i++) {
      const isAmber = Math.random() < 0.6;
      const color = isAmber
        ? { r: 232, g: 148, b: 74 }
        : { r: 255, g: 255, b: 255 };
      const size = 1.5 + Math.random() * 2.5;
      const duration = 5 + Math.random() * 7;
      const speed = h / (duration * 60);

      const el = document.createElement("div");
      el.className = "hero-particle";
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.background = `rgba(${color.r},${color.g},${color.b},0.6)`;
      el.style.boxShadow = `0 0 ${size * 2}px rgba(${color.r},${color.g},${color.b},0.3)`;
      container.appendChild(el);

      particles.push({
        el,
        x: Math.random() * w,
        y: Math.random() * h,
        speed,
        drift: (Math.random() - 0.5) * 0.3,
        color
      });
    }
  }

  function animate() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Update particle positions
    for (const p of particles) {
      p.y -= p.speed;
      p.x += p.drift;

      if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;

      p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
    }

    // Draw constellation lines
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const opacity = (1 - dist / connectionDistance) * 0.15;
          ctx.strokeStyle = `rgba(232,148,74,${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();
  window.addEventListener("resize", resize);
}

// ========================================
// 5. Navigation
// ========================================
function initNavigation() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  let lastDirection = 0;

  // Scroll-based show/hide
  ScrollTrigger.create({
    start: "top -100",
    end: "max",
    onUpdate: (self) => {
      const dir = self.direction;
      if (dir !== lastDirection) {
        if (self.scroll() < 200) {
          gsap.to(nav, { y: "0%", duration: 0.3 });
        } else {
          gsap.to(nav, {
            y: dir === 1 ? "-100%" : "0%",
            duration: 0.3,
            ease: dir === 1 ? "power2.in" : EASE.smooth
          });
        }
        lastDirection = dir;
      }
    }
  });

  // Background on scroll
  ScrollTrigger.create({
    start: "top -50",
    onEnter: () => nav.classList.add("scrolled"),
    onLeaveBack: () => nav.classList.remove("scrolled")
  });

  // Active section highlight
  const sections = ["#hero", "#problem", "#approach", "#services", "#about", "#results", "#contact"];
  sections.forEach(id => {
    const el = document.querySelector(id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: id,
      start: "top center",
      end: "bottom center",
      onEnter: () => highlightNav(id),
      onEnterBack: () => highlightNav(id)
    });
  });

  function highlightNav(sectionId) {
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === sectionId);
    });
  }

  // Hamburger
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
      hamburger.setAttribute("aria-expanded", mobileMenu.classList.contains("active"));
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

// ========================================
// 6. Projects Accordion
// ========================================
function initAccordion() {
  const items = document.querySelectorAll(".project-item");
  items.forEach(item => {
    const header = item.querySelector(".project-header");
    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      // Close all others
      items.forEach(other => {
        if (other !== item) other.classList.remove("active");
        if (other !== item) other.querySelector(".project-header").setAttribute("aria-expanded", "false");
      });
      // Toggle current
      item.classList.toggle("active", !isActive);
      header.setAttribute("aria-expanded", !isActive);
    });
  });
}

// ========================================
// 7. Section Reveal Animations
// ========================================
function initSectionAnimations() {
  // --- Section Headers ---
  gsap.utils.toArray(".section-header").forEach(header => {
    gsap.from(header.children, {
      y: 30,
      opacity: 0,
      duration: DUR.normal,
      stagger: STAGGER.tight,
      ease: EASE.snappy,
      scrollTrigger: {
        trigger: header,
        start: "top 82%"
      }
    });
  });

  // --- Problem Cards ---
  gsap.from(".problem-card", {
    y: 50,
    opacity: 0,
    duration: DUR.normal,
    stagger: STAGGER.normal,
    ease: EASE.snappy,
    scrollTrigger: {
      trigger: ".problem-grid",
      start: "top 80%"
    }
  });

  // --- Principle Box ---
  gsap.from(".principle-box", {
    scale: 0.96,
    opacity: 0,
    duration: DUR.slow,
    ease: EASE.smooth,
    scrollTrigger: {
      trigger: ".principle-box",
      start: "top 82%"
    }
  });

  // --- Pillar Cards ---
  gsap.from(".pillar-card", {
    y: 40,
    opacity: 0,
    duration: DUR.normal,
    stagger: STAGGER.normal,
    ease: EASE.snappy,
    scrollTrigger: {
      trigger: ".pillar-grid",
      start: "top 80%"
    }
  });

  // --- Comparison Table ---
  const compareSection = document.querySelector(".compare-section");
  if (compareSection) {
    gsap.from(".compare-section", {
      y: 40,
      opacity: 0,
      duration: DUR.slow,
      ease: EASE.smooth,
      scrollTrigger: {
        trigger: ".compare-section",
        start: "top 82%"
      }
    });
  }

  // --- Service Cards (④ fix: use autoAlpha to ensure visibility) ---
  const serviceCards = document.querySelectorAll(".service-card");
  if (serviceCards.length) {
    gsap.fromTo(".service-card",
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: STAGGER.wide,
        ease: EASE.snappy,
        scrollTrigger: {
          trigger: ".service-grid",
          start: "top 78%"
        }
      }
    );
  }

  // --- Number Cards + Count Up ---
  const numberCards = gsap.utils.toArray(".number-card");
  gsap.from(numberCards, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: STAGGER.tight,
    ease: EASE.smooth,
    scrollTrigger: {
      trigger: ".numbers-grid",
      start: "top 82%",
      onEnter: () => {
        document.querySelectorAll(".number-value[data-count]").forEach(el => {
          const end = parseFloat(el.dataset.count);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const decimals = parseInt(el.dataset.decimals || "0");
          countUp(el, end, { prefix, suffix, decimals });
        });
      },
      once: true
    }
  });

  // --- Project Items ---
  const projectList = document.querySelector(".project-list");
  if (projectList) {
    gsap.from(".project-item", {
      y: 30,
      opacity: 0,
      duration: DUR.normal,
      stagger: STAGGER.tight,
      ease: EASE.smooth,
      scrollTrigger: {
        trigger: ".project-list",
        start: "top 82%"
      }
    });
  }

  // --- About: Split Layout ---
  gsap.from(".about-photo", {
    x: -50,
    opacity: 0,
    duration: DUR.slow,
    ease: EASE.snappy,
    scrollTrigger: {
      trigger: ".about-split",
      start: "top 78%"
    }
  });

  gsap.from(".about-detail > *", {
    y: 30,
    opacity: 0,
    duration: DUR.normal,
    stagger: STAGGER.normal,
    ease: EASE.smooth,
    scrollTrigger: {
      trigger: ".about-detail",
      start: "top 78%"
    }
  });

  // --- CTA ---
  const ctaTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-cta",
      start: "top 72%"
    }
  });

  ctaTL
    .from(".cta-title", {
      scale: 0.92,
      opacity: 0,
      duration: 0.8,
      ease: EASE.bounce
    })
    .from(".cta-desc", {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, "-=0.3")
    .from(".cta-details span", {
      scale: 0.85,
      opacity: 0,
      stagger: STAGGER.tight,
      duration: 0.5
    }, "-=0.2")
    .from(".cta-button", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: EASE.bounce
    }, "-=0.2");
}

// ========================================
// 8. Hover Effects (Desktop)
// ========================================
function initHoverEffects() {
  const tiltCards = document.querySelectorAll(".service-card, .pillar-card");

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 5,
        rotateX: -y * 5,
        duration: 0.4,
        ease: EASE.smooth,
        transformPerspective: 800
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: EASE.smooth
      });
    });
  });
}

// ========================================
// Utilities
// ========================================
function countUp(el, end, opts = {}) {
  const { duration = 2, prefix = "", suffix = "", decimals = 0, ease = EASE.smooth } = opts;
  const obj = { v: 0 };
  gsap.to(obj, {
    v: end,
    duration,
    ease,
    onUpdate: () => {
      el.textContent = prefix + obj.v.toFixed(decimals) + suffix;
    }
  });
}

// ========================================
// INIT
// ========================================
const mm = gsap.matchMedia();

// All devices
initHeroEntrance();
initNavigation();
initAccordion();
initTypewriter();
initParticlesAndConstellation();

mm.add("(min-width: 769px)", () => {
  initHeroParallax();
  initHeroMouse();
  initSectionAnimations();
  initHoverEffects();
});

mm.add("(max-width: 768px)", () => {
  initSectionAnimations();
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.set(".line-inner", { y: 0 });
  gsap.set(".typewriter-label, .hero-sub, .hero-cta-group, .scroll-indicator", { opacity: 1 });
  gsap.set(".service-card", { autoAlpha: 1 });
});
