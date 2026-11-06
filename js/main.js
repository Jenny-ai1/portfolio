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
    const rows = (list) => list.map((e) => `<div class="cv-row"><span class="time">${esc(e.time)}</span><div class="what"><b>${esc(e.title)}</b><span>${esc(e.desc)}</span></div></div>`).join('');
    $('#cv-exp').innerHTML = '<span class="cv-label">經歷</span>' + rows(P.experience);
    $('#cv-edu').innerHTML = '<span class="cv-label">學歷</span>' + rows(P.education);
    $('#cv-skills').innerHTML = P.skills.map((s) => `<span>${esc(s)}</span>`).join('');
  }

  /* ---------- Portfolio ---------- */
  if (page === 'portfolio') {
    const COL = { 金融: ['#e8b06a', '#b0723a'], 程式: ['#2ec4b6', '#1f8f85'], 數據: ['#c3b9de', '#8f84b0'], 設計: ['#ffd23f', '#d4a92a'] };
    const cats = ['全部', '金融', '程式', '數據', '設計'];
    let cur = '全部';
    const chips = $('#chips'), grid = $('#grid');
    function render() {
      chips.innerHTML = cats.map((c) => `<button class="chip${c === cur ? ' on' : ''}" aria-pressed="${c === cur}" data-c="${c}">${c}</button>`).join('');
      const list = cur === '全部' ? S.projects : S.projects.filter((p) => p.category === cur);
      grid.innerHTML = list.map((p) => {
        const [c, d] = COL[p.category] || COL['金融'];
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
        `<div class="cert"><div class="stub"><b>${esc(c.year)}</b><span>取得</span></div>` +
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
})();
