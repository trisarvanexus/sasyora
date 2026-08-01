/* ==========================================================
   Sasyora — Nature's Flavour Delivered
   script.js — progressive enhancement, no dependencies
   ========================================================== */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = window.matchMedia('(min-width: 64em)');

  /* ----------------------------------------------------------
     Mobile navigation drawer
     ---------------------------------------------------------- */

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const scrim = document.querySelector('.nav-scrim');

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);

    if (scrim) {
      if (open) {
        scrim.hidden = false;
        requestAnimationFrame(() => scrim.classList.add('is-visible'));
      } else {
        scrim.classList.remove('is-visible');
        setTimeout(() => { scrim.hidden = true; }, 300);
      }
    }
  }

  const navIsOpen = () => toggle && toggle.getAttribute('aria-expanded') === 'true';

  if (toggle) toggle.addEventListener('click', () => setNav(!navIsOpen()));
  if (scrim) scrim.addEventListener('click', () => setNav(false));

  if (nav) {
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a') && !desktop.matches) setNav(false);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navIsOpen()) {
      setNav(false);
      toggle.focus();
    }
  });

  // Leaving the drawer breakpoint should never leave the body scroll-locked.
  desktop.addEventListener('change', (e) => { if (e.matches) setNav(false); });

  /* ----------------------------------------------------------
     Sticky header state and back-to-top, on one rAF-throttled
     scroll listener
     ---------------------------------------------------------- */

  const toTop = document.querySelector('.to-top');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    if (header) header.classList.toggle('is-scrolled', y > 24);

    if (toTop) {
      const show = y > window.innerHeight * 0.6;
      if (show) toTop.hidden = false;
      toTop.classList.toggle('is-visible', show);
      if (!show) setTimeout(() => {
        if (!toTop.classList.contains('is-visible')) toTop.hidden = true;
      }, 300);
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  onScroll();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------- */

  const revealTargets = document.querySelectorAll(
    '.section-head, .card, .produce-solo, .soft-note, .split-copy, .split-figure, .journey li, .table-scroll, .faq-item, .hero-seal'
  );

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    revealTargets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
    });

    const revealer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealTargets.forEach((el) => revealer.observe(el));
  }

  /* ----------------------------------------------------------
     Active navigation link
     ---------------------------------------------------------- */

  const navLinks = Array.from(document.querySelectorAll('.primary-nav a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const visible = new Set();

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });

      const current = sections.find((section) => visible.has(section));
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', Boolean(current) && link.getAttribute('href') === '#' + current.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => spy.observe(section));
  }

  /* ----------------------------------------------------------
     FAQ accordion
     ---------------------------------------------------------- */

  const faqItems = Array.from(document.querySelectorAll('.faq-item'));

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    const answerId = 'faq-answer-' + (faqItems.indexOf(item) + 1);
    answer.id = answerId;
    question.setAttribute('aria-controls', answerId);

    function close(target) {
      const btn = target.querySelector('.faq-question');
      const panel = target.querySelector('.faq-answer');
      target.classList.remove('is-open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (panel) panel.style.maxHeight = '';
    }

    question.addEventListener('click', () => {
      const open = item.classList.contains('is-open');

      faqItems.forEach((other) => { if (other !== item) close(other); });

      if (open) {
        close(item);
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Keep an open answer correctly sized when the layout reflows.
  window.addEventListener('resize', () => {
    const open = document.querySelector('.faq-item.is-open .faq-answer');
    if (open) open.style.maxHeight = open.scrollHeight + 'px';
  });

  /* ----------------------------------------------------------
     Decorative falling leaves
     ---------------------------------------------------------- */

  if (!reduceMotion) {
    const count = window.innerWidth < 768 ? 3 : 7;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('span');
      leaf.className = 'leaf';
      leaf.setAttribute('aria-hidden', 'true');
      leaf.innerHTML = '<svg class="ico" viewBox="0 0 24 24"><use href="#i-leaf" /></svg>';

      const size = 14 + Math.random() * 18;
      leaf.style.left = Math.random() * 96 + 'vw';
      leaf.style.width = size + 'px';
      leaf.style.height = size + 'px';
      leaf.style.animationDuration = 16 + Math.random() * 14 + 's';
      leaf.style.animationDelay = '-' + Math.random() * 20 + 's';
      leaf.style.opacity = 0.16 + Math.random() * 0.18;

      frag.appendChild(leaf);
    }

    document.body.appendChild(frag);
  }
})();
