/* ─── SHARED JS: main.js ─────────────────────
   Panoramic Plumbing Demo — R.Romero
   ─────────────────────────────────────────── */

/* Scroll-based header */
(function() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, { passive: true });
})();

/* Hamburger / mobile nav */
(function() {
  const burger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!burger || !mobileNav) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
})();

/* Active nav link */
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* Intersection Observer – reveal animations */
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* Animated count-up numbers */
(function() {
  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.count-up').forEach(el => observer.observe(el));
})();

/* Contact form submission (demo) */
(function() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const msg = document.querySelector('#form-success');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      form.reset();
      if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display='none', 5000); }
    }, 1400);
  });
})();

/* Subtle parallax on hero */
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const orbs = hero.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
      orb.style.transform = `translateY(${y * (0.08 + i * 0.04)}px)`;
    });
  }, { passive: true });
})();
