/* =========================================================
   DR. OTHON LANDING — JAVASCRIPT
   ========================================================= */

// ── Smooth scroll for anchor links ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── FAQ Accordion ────────────────────────────────────────
function toggleFaq(button) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  const answer = button.nextElementSibling;

  // Close all open FAQs
  document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.nextElementSibling.classList.remove('open');
  });

  // Toggle clicked FAQ
  if (!isExpanded) {
    button.setAttribute('aria-expanded', 'true');
    answer.classList.add('open');
  }
}

// ── Header scroll effect ─────────────────────────────────
(function () {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  }, { passive: true });
})();

// ── Animate elements on scroll (Intersection Observer) ───
(function () {
  const opts = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, opts);

  // Observe elements that should animate in
  const animateTargets = document.querySelectorAll(
    '.stat-card, .testimonial-card, .faq-item, .benefit-item'
  );

  animateTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(el);
  });
})();

// ── Calendar iframe auto-resize ──────────────────────────
(function () {
  window.addEventListener('message', function (e) {
    if (typeof e.data === 'object' && e.data.height) {
      const iframe = document.getElementById('D5LoocAgL6M0CqwpDb0W_1774272347127');
      if (iframe) {
        iframe.style.height = e.data.height + 'px';
      }
    }
  });
})();

// ── Urgency banner dismiss ───────────────────────────────
(function () {
  const banner = document.getElementById('urgency-banner');
  if (!banner) return;

  // Update sticky top if header exists
  const header = document.querySelector('.header');
  if (header) {
    // Banner is 32px tall, so header sticks at 32px top
    // This is already set via CSS
  }
})();

// ── Counter animation for stats ──────────────────────────
(function () {
  function animateCount(el, target, suffix) {
    const start = 0;
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''), 10);
        const suffix = text.replace(/[0-9]/g, '');
        animateCount(el, num, suffix);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => {
    statObserver.observe(el);
  });
})();

console.log('✅ Dr. Othon Landing Page — v1.0 cargada');
