(function () {
  const S = window.SITE;
  const P = S.profile;
  const page = document.body.dataset.page;

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (sel) => document.querySelector(sel);

  const PAGES = [
    { id: 'home', href: 'index.html', label: '首頁' },
    { id: 'portfolio', href: 'portfolio.html', label: '作品集' },
    { id: 'hobbies', href: 'hobbies.html', label: '興趣愛好' },
    { id: 'certificates', href: 'certificates.html', label: '證照' }
  ];

  /* ---------- Shared: header / footer / next stop ---------- */
  const header = $('#site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML =
      `<a class="logo" href="index.html"><span class="logo-planet"></span>${esc(P.name)}</a>` +
      `<nav class="nav" aria-label="主選單">` +
      PAGES.map((p) => `<a href="${p.href}"${p.id === page ? ' class="current" aria-current="page"' : ''}>${p.label}</a>`).join('') +
      `</nav>`;
  }

  const footer = $('#site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `<span>© 2026 ${esc(P.name)}</span><a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`;
  }

  const NEXT = {
    portfolio: { href: 'hobbies.html', k: 'NEXT STOP · 下一站', t: '興趣愛好', a: '→' },
    hobbies: { href: 'certificates.html', k: 'NEXT STOP · 下一站', t: '證照', a: '→' },
    certificates: { href: 'index.html', k: 'BACK TO ORBIT · 返回', t: '回到首頁', a: '↺' }
  };
  const next = $('#next-stop');
  if (next && NEXT[page]) {
    const n = NEXT[page];
    next.className = 'next-wrap';
    next.innerHTML = `<a class="next-stop" href="${n.href}"><span class="k"><small>${n.k}</small><strong>${n.t}</strong></span><span class="arrow" aria-hidden="true">${n.a}</span></a>`;
  }

  /* ---------- Placeholder art ---------- */
  const placeholder = (c, d) =>
    `<div class="ph" style="--c:${c};--d:${d}">` +
    `<div class="ph-planet"></div><div class="ph-ring"></div>` +
    `<div class="s" style="left:18%;top:22%;width:7px;background:#ffd23f"></div>` +
    `<div class="s" style="left:80%;top:30%;width:5px;background:#fff6e6"></div>` +
    `<div class="s" style="left:72%;top:76%;width:6px;background:#c3b9de"></div>` +
    `<div class="s" style="left:26%;top:70%;width:4px;background:#fff6e6"></div></div>`;
  const media = (img, alt, c, d) => (img ? `<img class="cover-img" src="${esc(img)}" alt="${esc(alt)}" loading="lazy">` : placeholder(c, d));

  /* ---------- Lightbox ---------- */
  let lb;
  function openLightbox(src, alt) {
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = '<button aria-label="關閉">×</button><img alt="">';
      lb.addEventListener('click', (e) => { if (e.target === lb || e.target.tagName === 'BUTTON') lb.classList.remove('open'); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
      document.body.appendChild(lb);
    }
    const im = lb.querySelector('img');
    im.src = src; im.alt = alt || '';
    lb.classList.add('open');
  }

  /* ---------- CV download buttons ---------- */
  document.querySelectorAll('[data-cv]').forEach((a) => {
    if (P.cvPdf) { a.href = P.cvPdf; a.setAttribute('download', ''); }
    else { a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); a.title = '尚未上傳 CV'; }
  });

  /* ---------- Home ---------- */
  if (page === 'home') {
    $('#hero-name').textContent = P.name;
    $('#hero-sub').textContent = P.subtitle;
    $('#about-text').textContent = P.about;
    if (P.photo) $('#about-photo').innerHTML = `<img src="${esc(P.photo)}" alt="${esc(P.name)}">`;
    const desc = (d) => Array.isArray(d)
      ? `<ul>${d.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`
      : (d ? `<span>${esc(d)}</span>` : '');
    const rows = (list) => list.map((e) =>
      `<div class="cv-row${e.time ? '' : ' no-time'}">` +
      (e.time ? `<span class="time">${esc(e.time)}</span>` : '') +
      `<div class="what"><b>${esc(e.title)}</b>${desc(e.desc)}</div></div>`).join('');
    const blocks = [
      ['實習經驗', P.internships], ['社團經驗', P.clubs], ['學歷', P.education], ['AI 技能', P.aiSkills],
      ['經歷', P.experience]
    ].filter(([, list]) => list && list.length);
    $('#cv-blocks').innerHTML = blocks.map(([label, list]) =>
      `<div class="cv-block"><span class="cv-label">${label}</span>${rows(list)}</div>`).join('');
    $('#cv-skills').innerHTML = P.skills.map((s) => `<span>${esc(s)}</span>`).join('');
  }

  /* ---------- Portfolio ---------- */
  if (page === 'portfolio') {
    const PALETTE = [['#e8b06a', '#b0723a'], ['#2ec4b6', '#1f8f85'], ['#c3b9de', '#8f84b0'], ['#ffd23f', '#d4a92a'], ['#ff8a4c', '#e0532a']];
    const found = [...new Set(S.projects.map((p) => p.category))];
    const COL = {};
    found.forEach((c, i) => { COL[c] = PALETTE[i % PALETTE.length]; });
    const cats = ['全部', ...found];
    let cur = '全部';
    const chips = $('#chips'), grid = $('#grid');
    function render() {
      chips.innerHTML = cats.map((c) => `<button class="chip${c === cur ? ' on' : ''}" aria-pressed="${c === cur}" data-c="${c}">${c}</button>`).join('');
      const list = cur === '全部' ? S.projects : S.projects.filter((p) => p.category === cur);
      grid.innerHTML = list.map((p) => {
        const [c, d] = COL[p.category] || PALETTE[0];
        const link = p.url ? `<a class="view" href="${esc(p.url)}" target="_blank" rel="noopener">查看專案 →</a>` : `<a class="view" aria-disabled="true">查看專案 →</a>`;
        return `<article class="project" style="--c:${c}">` +
          `<div class="frame">${media(p.img, p.title, c, d)}</div>` +
          `<div class="body"><div class="meta"><span class="cat">${esc(p.category)}</span><span class="year">${esc(p.year)}</span></div>` +
          `<h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>` +
          `<div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>${link}</div></article>`;
      }).join('');
    }
    chips.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { cur = b.dataset.c; render(); } });
    render();
  }

  /* ---------- Hobbies ---------- */
  if (page === 'hobbies') {
    $('#grid').innerHTML = S.hobbies.map((h) =>
      `<div class="hobby" style="--c:${h.color};--d:${h.darkColor}">` +
      `<div class="frame">${media(h.img, h.title, h.color, h.darkColor)}</div>` +
      `<h2>${esc(h.title)}</h2><span class="fact">${esc(h.fact)}</span><p>${esc(h.description)}</p></div>`
    ).join('');
  }

  /* ---------- Certificates ---------- */
  if (page === 'certificates') {
    const all = S.certificates;
    const cats = ['總覽', '銀行', '證券', '保險', '其他'];
    let cur = '總覽';
    const chips = $('#chips'), list = $('#list');
    function render() {
      chips.innerHTML = cats.map((c) => {
        const n = c === '總覽' ? all.length : all.filter((x) => x.category === c).length;
        return `<button class="chip${c === cur ? ' on' : ''}" aria-pressed="${c === cur}" data-c="${c}">${c}<span class="count">${n}</span></button>`;
      }).join('');
      const shown = cur === '總覽' ? all : all.filter((x) => x.category === cur);
      list.innerHTML = shown.map((c, i) =>
        `<div class="cert"><div class="stub">${c.year ? `<b>${esc(c.year)}</b><span>取得</span>` : '<b class="check" aria-hidden="true">✓</b><span>已取得</span>'}</div>` +
        `<div class="info"><div class="text"><span class="ccat">${esc(c.category)}</span><h3>${esc(c.name)}</h3><span class="issuer">${esc(c.issuer)}</span></div>` +
        `<div class="actions"><span class="result">${esc(c.result)}</span>` +
        (c.img ? `<button class="see" data-i="${all.indexOf(c)}">查看證書 →</button>` : '') +
        `</div></div></div>`
      ).join('');
    }
    chips.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { cur = b.dataset.c; render(); } });
    list.addEventListener('click', (e) => { const b = e.target.closest('.see'); if (b) { const c = all[+b.dataset.i]; openLightbox(c.img, c.name); } });
    render();
  }

  /* ---------- Meteor mini-game (inner pages) ---------- */
  const heroMeteor = document.querySelector('.page-hero .hero-meteor');
  if (heroMeteor) initMeteorGame(heroMeteor);

  function initMeteorGame(el) {
    const HITS = 5;
    const COLORS = {
      portfolio: { c: '#e8b06a', d: '#b0723a', crater: '#b9803f' },
      hobbies: { c: '#c3b9de', d: '#8f84b0', crater: '#9a8fb8' },
      certificates: { c: '#ffd23f', d: '#d4a92a', crater: '#c4a640' }
    }[page];
    const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    el.classList.add('game');
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `小遊戲：點擊隕石 ${HITS} 次把它敲碎`);

    // crack lines, revealed one per hit
    el.insertAdjacentHTML('beforeend',
      '<svg class="cracks" viewBox="0 0 100 100" aria-hidden="true">' +
      '<path d="M50 48 L38 30 L41 18"/>' +
      '<path d="M50 48 L66 40 L80 44"/>' +
      '<path d="M50 48 L46 66 L56 80 L54 90"/>' +
      '<path d="M50 48 L30 56 L18 52 M38 30 L28 26"/>' +
      '</svg>');
    const cracks = el.querySelectorAll('.cracks path');

    let hits = 0, busy = false;

    function burst(x, y, n, spread, big) {
      if (reduced) n = Math.ceil(n / 3);
      for (let i = 0; i < n; i++) {
        const f = document.createElement('span');
        const isStar = Math.random() < (big ? 0.35 : 0.2);
        const size = isStar ? 8 + Math.random() * 10 : (big ? 8 : 5) + Math.random() * (big ? 16 : 9);
        f.className = 'frag ' + (isStar ? 'star' : 'rock');
        f.style.width = f.style.height = size + 'px';
        if (!isStar) f.style.background = [COLORS.c, COLORS.d, COLORS.crater][i % 3];
        document.body.appendChild(f);
        const ang = Math.random() * Math.PI * 2;
        const dist = spread * (0.5 + Math.random() * 0.7);
        const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
        const rot = (Math.random() - 0.5) * 720;
        const x0 = x - size / 2, y0 = y - size / 2;
        f.animate([
          { transform: `translate(${x0}px, ${y0}px) rotate(0deg)`, opacity: 1 },
          { transform: `translate(${x0 + dx * 0.7}px, ${y0 + dy * 0.7 - 30}px) rotate(${rot * 0.6}deg)`, opacity: 1, offset: 0.55 },
          { transform: `translate(${x0 + dx}px, ${y0 + dy + 60}px) rotate(${rot}deg)`, opacity: 0 }
        ], { duration: 700 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => f.remove();
      }
    }

    function popText(x, y, text) {
      const t = document.createElement('span');
      t.className = 'frag pop';
      t.textContent = text;
      document.body.appendChild(t);
      t.animate([
        { transform: `translate(${x - 14}px, ${y - 20}px)`, opacity: 1 },
        { transform: `translate(${x - 14}px, ${y - 70}px)`, opacity: 0 }
      ], { duration: 800, easing: 'ease-out' }).onfinish = () => t.remove();
    }

    let toast, toastTimer;
    function showEgg() {
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'egg-toast';
        toast.setAttribute('role', 'status');
        toast.style.setProperty('--egg-c', COLORS.c);
        toast.style.setProperty('--egg-d', COLORS.d);
        toast.innerHTML = '<span class="egg-icon"></span><b></b><button aria-label="關閉">×</button>';
        toast.querySelector('button').addEventListener('click', () => toast.classList.remove('show'));
        document.body.appendChild(toast);
      }
      toast.querySelector('b').textContent = S.eggMessage || '恭喜你找到了一個彩蛋！今天將會無比順利！';
      requestAnimationFrame(() => toast.classList.add('show'));
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 7000);
    }

    function restart(cls) {
      el.classList.remove(cls);
      void el.offsetWidth; // restart CSS animation
      el.classList.add(cls);
    }

    function hit(x, y) {
      if (busy) return;
      hits++;
      cracks.forEach((p, i) => p.classList.toggle('on', i < hits));
      if (hits < HITS) {
        restart('hit');
        burst(x, y, 6, 70, false);
        popText(x, y, `${hits}/${HITS}`);
        return;
      }
      // smashed!
      busy = true;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      el.classList.remove('hit', 'reform');
      el.classList.add('boom');
      burst(cx, cy, 28, Math.max(140, r.width * 0.9), true);
      showEgg();
      setTimeout(() => {
        hits = 0;
        cracks.forEach((p) => p.classList.remove('on'));
        el.classList.remove('boom');
        restart('reform');
        busy = false;
      }, 1400);
    }

    el.addEventListener('click', (e) => {
      const r = el.getBoundingClientRect();
      // keyboard "clicks" report 0,0 — use the centre instead
      const x = e.clientX || r.left + r.width / 2;
      const y = e.clientY || r.top + r.height / 2;
      hit(x, y);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
    });
  }
})();
