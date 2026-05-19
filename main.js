/* ================================================
   AGAPI LIMOUSINE — Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile nav toggle ───
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Sticky header shadow on scroll ───
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 20 ? '0 4px 32px rgba(0,0,0,0.5)' : '';
    }, { passive: true });
  }

  // ─── FAQ accordion ───
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq-answer').style.maxHeight = '0';
        open.querySelector('.faq-icon').textContent = '+';
      });

      // Open clicked (if wasn't open)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        item.querySelector('.faq-icon').textContent = '+';
      }
    });
  });

  // ─── Scroll-reveal ───
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  // ─── Quote form submission ───
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', e => {
      e.preventDefault();
      const successMsg = document.getElementById('formSuccess');
      const submitBtn  = quoteForm.querySelector('[type="submit"]');

      // Simple required-field validation
      let valid = true;
      quoteForm.querySelectorAll('[required]').forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#c04444';
          valid = false;
        }
      });
      if (!valid) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Build mailto link as fallback (FormSubmit or backend can replace this)
      const data = new FormData(quoteForm);
      const lines = [];
      data.forEach((v, k) => { if (v) lines.push(`${k}: ${v}`); });

      // Simulate send (replace with actual fetch/FormSubmit endpoint)
      setTimeout(() => {
        quoteForm.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }, 900);
    });
  }

  // ─── Active nav link ───
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Smooth hero entrance ───
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'none';
      }, 100);
    });
  }

  // ─── Stat counter animation ───
  const statNums = document.querySelectorAll('.stat-card .num');
  if (statNums.length) {
    const statObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.target || el.textContent.replace(/[^\d.]/g, ''));
        const suffix = el.dataset.suffix || el.textContent.replace(/[\d.]/g, '');
        const isFloat = String(target).includes('.');
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
          if (current >= target) clearInterval(timer);
        }, 20);
        statObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    statNums.forEach(n => {
      n.dataset.target = n.textContent.replace(/[^\d.]/g, '');
      n.dataset.suffix = n.textContent.replace(/[\d.]/g, '');
      statObserver.observe(n);
    });
  }

});
