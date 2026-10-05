(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const progress = document.querySelector('.scroll-progress');

  /* ---------- hero title: split letters ---------- */
  const heroTitle = document.querySelector('.hero h1 span');
  if (heroTitle && !reduceMotion) {
    const text = heroTitle.textContent.trim();
    heroTitle.setAttribute('aria-label', text);
    heroTitle.textContent = '';
    [...text].forEach((char, i) => {
      const wrap = document.createElement('span');
      wrap.className = 'ch-wrap';
      wrap.setAttribute('aria-hidden', 'true');
      const ch = document.createElement('span');
      ch.className = 'ch';
      ch.style.setProperty('--i', i);
      ch.textContent = char;
      wrap.appendChild(ch);
      heroTitle.appendChild(wrap);
    });
    heroTitle.style.display = 'block';
  }

  /* ---------- marquee built from the "community" feature titles ---------- */
  const words = [...document.querySelectorAll('.feature-card h3')].map((h) => h.textContent.trim());
  words.push('VRChat', 'Celestia');
  if (hero && words.length) {
    const marquee = document.createElement('div');
    marquee.className = 'marquee';
    marquee.setAttribute('aria-hidden', 'true');
    const item = () => `<span class="marquee__item">${words.map((w) => `${w}<i>✦</i>`).join('')}</span>`;
    marquee.innerHTML = `<div class="marquee__track">${item()}${item()}${item()}${item()}</div>`;
    hero.insertAdjacentElement('afterend', marquee);
  }

  /* ---------- feature numbers + reveal stagger ---------- */
  document.querySelectorAll('.feature-card').forEach((card, i) => {
    const num = document.createElement('span');
    num.className = 'feature-num';
    num.setAttribute('aria-hidden', 'true');
    num.textContent = String(i + 1).padStart(2, '0');
    card.prepend(num);
  });
  ['.feature-grid', '.recruit-grid'].forEach((sel) => {
    document.querySelectorAll(`${sel} > .reveal`).forEach((el, i) => el.style.setProperty('--d', `${i * 110}ms`));
  });
  document.querySelectorAll('.world-gallery .world-shot').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--d', `${(i % 3) * 120}ms`);
  });
  // staff cards are created by script.js: stagger per row
  document.querySelectorAll('.staff-level__grid').forEach((grid) => {
    [...grid.children].forEach((el, i) => el.style.setProperty('--d', `${i * 80}ms`));
  });
  const lateReveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); lateReveal.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.world-shot.reveal').forEach((el) => lateReveal.observe(el));

  /* ---------- header + progress + hero parallax ---------- */
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      if (header) {
        header.classList.toggle('is-scrolled', y > 30);
        const hide = y > lastY && y > 500 && !document.body.classList.contains('menu-open');
        header.classList.toggle('is-hidden', hide);
      }
      if (hero && y < window.innerHeight * 1.2) root.style.setProperty('--hy', `${y * 0.25}px`);
      lastY = y;
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (reduceMotion) return;

  /* ---------- pointer: cursor glow, card tilt/spotlight, magnetic buttons ---------- */
  if (finePointer) {
    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let raf = 0;
    document.addEventListener('pointermove', (e) => {
      document.body.classList.add('has-pointer');
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${px}px`);
        root.style.setProperty('--my', `${py}px`);
        raf = 0;
      });

      const card = e.target.closest('.feature-card, .staff-card, .recruit-card');
      if (card) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--px', `${x * 100}%`);
        card.style.setProperty('--py', `${y * 100}%`);
        card.classList.add('is-tilting');
        const max = card.classList.contains('recruit-card') ? 3 : 8;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-4px)`;
      }

      const btn = e.target.closest('.button, .nav-cta');
      if (btn) {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3 - 2}px)`;
      }
    }, { passive: true });

    document.addEventListener('pointerout', (e) => {
      const card = e.target.closest?.('.feature-card, .staff-card, .recruit-card');
      if (card && !card.contains(e.relatedTarget)) {
        card.classList.remove('is-tilting');
        card.style.transform = '';
      }
      const btn = e.target.closest?.('.button, .nav-cta');
      if (btn && !btn.contains(e.relatedTarget)) btn.style.transform = '';
    });
  }

  /* ---------- starfield ---------- */
  const canvas = document.getElementById('starfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1;
    let stars = [];
    const shooting = [];
    let nextShot = 2500;
    let mouseX = 0, mouseY = 0, smx = 0, smy = 0;
    let scrollY = window.scrollY;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(320, (w * h) / 6500));
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.4 + z * 1.5,
          tw: Math.random() * Math.PI * 2,
          sp: 0.5 + Math.random() * 1.8,
          hue: Math.random() < 0.25 ? 270 : Math.random() < 0.5 ? 215 : 240
        };
      });
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX / w - 0.5;
      mouseY = e.clientY / h - 0.5;
    }, { passive: true });

    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(50, now - last);
      last = now;
      smx += (mouseX - smx) * 0.05;
      smy += (mouseY - smy) * 0.05;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const depth = 0.15 + s.z * 0.85;
        let x = s.x - smx * 40 * depth;
        let y = (s.y - scrollY * 0.12 * depth - smy * 40 * depth) % h;
        if (y < 0) y += h;
        x = ((x % w) + w) % w;
        const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now / 1000 * s.sp + s.tw));
        ctx.globalAlpha = a * (0.4 + s.z * 0.6);
        ctx.fillStyle = `hsl(${s.hue} 90% ${80 + s.z * 15}%)`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, 6.2832);
        ctx.fill();
        if (s.r > 1.5) {
          ctx.globalAlpha *= 0.25;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 3, 0, 6.2832);
          ctx.fill();
        }
      }

      nextShot -= dt;
      if (nextShot <= 0) {
        nextShot = 3000 + Math.random() * 5000;
        const fromLeft = Math.random() < 0.5;
        shooting.push({
          x: Math.random() * w * 0.8,
          y: Math.random() * h * 0.4,
          vx: (fromLeft ? 1 : 0.7) * (9 + Math.random() * 5),
          vy: 4 + Math.random() * 3,
          life: 1
        });
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i];
        s.x += s.vx; s.y += s.vy; s.life -= 0.018;
        if (s.life <= 0) { shooting.splice(i, 1); continue; }
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9);
        g.addColorStop(0, `rgba(255,255,255,${s.life})`);
        g.addColorStop(1, 'rgba(143,137,255,0)');
        ctx.globalAlpha = 1;
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 9, s.y - s.vy * 9);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  /* ---------- world gallery lightbox ---------- */
  const shots = [...document.querySelectorAll('.world-gallery .world-shot')];
  if (shots.length) {
    const urls = shots.map((s) => {
      // backgroundImage of the pseudo-element is already resolved to an absolute URL
      const m = getComputedStyle(s, '::before').backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      return m ? m[1] : '';
    });
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = '<img alt=""><button class="lb-close" aria-label="Close">✕</button><button class="lb-prev" aria-label="Previous">‹</button><button class="lb-next" aria-label="Next">›</button><span class="lb-count"></span>';
    document.body.appendChild(lb);
    const img = lb.querySelector('img');
    const count = lb.querySelector('.lb-count');
    let idx = 0;
    const show = (i) => {
      idx = (i + shots.length) % shots.length;
      img.src = urls[idx];
      img.alt = shots[idx].getAttribute('aria-label') || '';
      count.textContent = `${idx + 1} / ${shots.length}`;
    };
    const open = (i) => { show(i); lb.classList.add('is-open'); document.body.classList.add('lightbox-open'); };
    const close = () => { lb.classList.remove('is-open'); document.body.classList.remove('lightbox-open'); };
    shots.forEach((s, i) => {
      s.tabIndex = 0;
      s.addEventListener('click', () => open(i));
      s.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    });
    lb.addEventListener('click', (e) => {
      if (e.target.closest('.lb-prev')) show(idx - 1);
      else if (e.target.closest('.lb-next')) show(idx + 1);
      else if (e.target !== img) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    let tx = 0;
    lb.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    });
  }
})();
