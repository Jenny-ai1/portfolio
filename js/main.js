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
      PAGES.map((p) => `<a href="${p.href}"${p.id === (page === 'work' ? 'portfolio' : page) ? ' class="current" aria-current="page"' : ''}>${p.label}</a>`).join('') +
      `</nav>`;
  }

  const footer = $('#site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `<span>© 2026 ${esc(P.name)}</span><a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`;
  }

  const NEXT = {
    portfolio: { href: 'hobbies.html', k: 'NEXT STOP · 下一站', t: '興趣愛好', a: '→' },
    work: { href: 'portfolio.html', k: 'BACK · 返回', t: '回到作品集', a: '↺' },
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
  // 放大看圖；傳入 list（同一份作品的所有圖）時可以左右切換
  let lb, lbList = [], lbAt = 0, lbAlt = '', lbOnMove = null;
  function lbShow(i) {
    lbAt = (i + lbList.length) % lbList.length;
    const im = lb.querySelector('img');
    im.src = lbList[lbAt];
    im.alt = lbList.length > 1 ? `${lbAlt}（第 ${lbAt + 1} 張）` : lbAlt;
    lb.querySelector('.lb-count').textContent = `${lbAt + 1} / ${lbList.length}`;
    if (lbList.length > 1) new Image().src = lbList[(lbAt + 1) % lbList.length];
    if (lbOnMove) lbOnMove(lbAt);
  }
  function closeLightbox() { lb.classList.remove('open'); }
  function openLightbox(src, alt, wide, list, at, onMove) {
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = '<button class="lb-close" aria-label="關閉">×</button>' +
        '<button class="lb-nav prev" aria-label="上一張">‹</button><img alt=""><button class="lb-nav next" aria-label="下一張">›</button>' +
        '<span class="lb-count"></span>';
      lb.addEventListener('click', (e) => {
        const nav = e.target.closest('.lb-nav');
        if (nav) { lbShow(lbAt + (nav.classList.contains('next') ? 1 : -1)); return; }
        if (e.target === lb || e.target.closest('.lb-close')) closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (lbList.length > 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
          e.preventDefault(); e.stopImmediatePropagation();
          lbShow(lbAt + (e.key === 'ArrowRight' ? 1 : -1));
        }
      }, true);
      let x0 = null;
      lb.addEventListener('touchstart', (e) => { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
      lb.addEventListener('touchend', (e) => {
        if (x0 === null || lbList.length < 2) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) lbShow(lbAt + (dx < 0 ? 1 : -1));
        x0 = null;
      });
      document.body.appendChild(lb);
    }
    lbList = list && list.length ? list : [src];
    lbAlt = alt || '';
    lbOnMove = onMove || null;
    lb.classList.toggle('wide', !!wide);
    lb.classList.toggle('multi', lbList.length > 1);
    lb.classList.add('open');
    lbShow(lbList[at] === src ? at : Math.max(0, lbList.indexOf(src)));
  }

  /* ---------- CV buttons: data-cv="preview" opens the PDF, data-cv="download" saves it ---------- */
  const CV_LANGS = [
    { file: P.cvPdf, preview: '預覽中文 CV →', download: '下載中文 CV ↓', name: `${P.name}_CV.pdf`, lang: 'zh-Hant' },
    { file: P.cvPdfEn, preview: 'Preview English CV →', download: 'Download English CV ↓', name: 'Janelee_CV.pdf', lang: 'en' }
  ];
  document.querySelectorAll('[data-cv]').forEach((a) => {
    const isPreview = a.dataset.cv === 'preview';
    const group = document.createElement('div');
    group.className = 'cv-pick';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', isPreview ? '預覽 CV' : '下載 CV');
    if (a.getAttribute('style')) group.setAttribute('style', a.getAttribute('style'));
    CV_LANGS.forEach((c) => {
      const b = document.createElement('a');
      b.className = a.className;
      b.textContent = isPreview ? c.preview : c.download;
      b.lang = c.lang;
      if (c.file) {
        b.href = c.file;
        if (isPreview) { b.target = '_blank'; b.rel = 'noopener'; }
        else b.setAttribute('download', c.name);
      }
      else { b.setAttribute('aria-disabled', 'true'); b.title = '尚未上傳 CV'; }
      group.appendChild(b);
    });
    a.replaceWith(group);
  });

  /* ---------- Home ---------- */
  if (page === 'home') {
    if (P.greeting) $('#hero-hello').textContent = P.greeting;
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
    const wanted = new URLSearchParams(location.hash.slice(1)).get('cat');
    let cur = cats.includes(wanted) ? wanted : '全部';
    const chips = $('#chips'), grid = $('#grid');

    const card = (p) => {
      const [c, d] = COL[p.category] || PALETTE[0];
      const n = (p.items || []).length;
      const job = p.job ? `<div class="job"><b>工作</b>${esc(p.job)}</div>` : '';
      return `<article class="project" style="--c:${c}">` +
        `<div class="frame">${media(p.img, p.title, c, d)}</div>` +
        `<div class="body"><div class="meta"><span class="cat">${esc(p.category)}</span><span class="year">${esc(p.year)}</span></div>` +
        `<h3>${esc(p.title)}</h3>${job}<p>${esc(p.description)}</p>` +
        `<div class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>` +
        `<a class="view" href="work.html?w=${S.projects.indexOf(p)}">查看${n > 1 ? ` ${n} 件` : ''}作品 →</a></div></article>`;
    };
    function render() {
      chips.innerHTML = cats.map((c) => `<button class="chip${c === cur ? ' on' : ''}" aria-pressed="${c === cur}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
      grid.innerHTML = (cur === '全部' ? S.projects : S.projects.filter((p) => p.category === cur)).map(card).join('');
    }
    chips.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      cur = b.dataset.c;
      history.replaceState(null, '', cur === '全部' ? location.pathname + location.search : '#' + new URLSearchParams({ cat: cur }));
      render();
    });
    render();
  }

  /* ---------- Work detail (the page behind a portfolio card) ---------- */
  if (page === 'work') {
    const w = new URLSearchParams(location.search).get('w');
    const p = /^\d+$/.test(w || '') ? S.projects[+w] : null;
    if (!p) { location.replace('portfolio.html'); return; }
    const PALETTE = ['#e8b06a', '#2ec4b6', '#c3b9de', '#ffd23f', '#ff8a4c'];
    const found = [...new Set(S.projects.map((x) => x.category))];
    const c = PALETTE[found.indexOf(p.category) % PALETTE.length];
    const items = p.items || [];
    const view = (o, label) => (o.url ? `<a class="view" href="${esc(o.url)}" target="_blank" rel="noopener">${label}</a>` : '');
    const jobLine = (o) => (o.job ? `<div class="job"><b>工作</b>${esc(o.job)}</div>` : '');

    document.title = `${p.title} · ${P.name}`;
    $('#work-back').href = 'portfolio.html#' + new URLSearchParams({ cat: p.category });
    const details = `${p.description ? `<p>${esc(p.description)}</p>` : ''}${jobLine(p)}` +
      `<div class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>${view(p, '相關連結 →')}`;
    if (items.some((o) => o.view === 'slides')) {
      // 簡報頁：標題縮成一行，把畫面留給簡報，說明移到下方
      $('.work-main').classList.add('has-slides');
      $('#work-head').innerHTML = `<div class="work-top" style="--c:${c}"><span class="cat">${esc(p.category)}</span><h1>${esc(p.title)}</h1></div>`;
      $('.work-top').prepend($('#work-back'));
      $('#work-notes').innerHTML = `<div class="work-head" style="--c:${c}">${details}</div>`;
    } else {
      $('#work-head').innerHTML = `<div class="work-head" style="--c:${c}"><span class="cat">${esc(p.category)}</span><h1>${esc(p.title)}</h1>${details}</div>`;
    }

    const pages = (o) => [o.img, ...(o.more || []).map((m) => m.img)].filter(Boolean);
    const pics = (o) => {
      const all = pages(o);
      if (!all.length) return '';
      const nav = all.length > 1
        ? `<button class="work-nav prev" data-d="-1" aria-label="上一張">‹</button><button class="work-nav next" data-d="1" aria-label="下一張">›</button><span class="work-count">1 / ${all.length}</span>`
        : '';
      const strip = o.view === 'slides' && all.length > 1
        ? `<div class="slide-thumbs">${all.map((src, i) => `<button class="slide-thumb${i ? '' : ' on'}" data-i="${i}" aria-label="第 ${i + 1} 頁"><img src="${esc(src)}" alt="" loading="lazy"></button>`).join('')}</div>`
        : '';
      return `<div class="work-pics" data-pics="${esc(JSON.stringify(all))}" data-i="0">` +
        `<button class="work-zoom" data-src="${esc(all[0])}" data-alt="${esc(o.title)}"${o.view === 'slides' ? ' data-wide="1"' : ''} aria-label="放大查看${esc(o.title)}"><img class="work-img" src="${esc(all[0])}" alt="${esc(o.title)}"></button>${nav}</div>${strip}`;
    };

    const process = (o) => {
      const steps = (o.process || []).filter((x) => x.img);
      if (!steps.length) return '';
      return `<div class="work-process"><b class="work-process-title">設計歷程</b><ol>` + steps.map((x, i) =>
        `<li><button class="work-zoom" data-src="${esc(x.img)}" data-alt="第 ${i + 1} 版" aria-label="放大查看第 ${i + 1} 版"><img class="work-img" src="${esc(x.img)}" alt="第 ${i + 1} 版"></button>` +
        `<span class="work-step">第 ${i + 1} 版</span>${x.note ? `<p>${esc(x.note)}</p>` : ''}</li>`).join('') + `</ol></div>`;
    };

    // 流程圖版面：輸入 → AI → 多份產出，加上規則
    const flow = (o) => {
      const f = o.view === 'flow' && o.flow;
      if (!f) return '';
      const inputs = (f.inputs || []).filter(Boolean).map((t, i) => `<li><span>${i + 1}</span>${esc(t)}</li>`).join('');
      const outputs = (f.outputs || []).map((x, i) =>
        `<li class="flow-out" style="--k:${['#e8b06a', '#2ec4b6', '#c3b9de', '#ff8a4c'][i % 4]}">` +
        `<div class="flow-out-head"><span class="flow-icon" aria-hidden="true">${esc(x.icon || '')}</span><div><b>${esc(x.title)}</b>${x.sub ? `<small>${esc(x.sub)}</small>` : ''}</div></div>` +
        `<ul>${(x.points || []).filter(Boolean).map((p) => `<li>${esc(p)}</li>`).join('')}</ul></li>`).join('');
      const rules = (f.rules || []).filter(Boolean).map((t) => `<li>${esc(t)}</li>`).join('');
      const impact = (f.impact || []).filter(Boolean).map((t) => `<li>${esc(t)}</li>`).join('');
      return `<div class="flow">` +
        (f.why ? `<div class="flow-why"><b class="flow-label">為什麼做</b><p>${esc(f.why)}</p></div>` : '') +
        `<div class="flow-stage flow-in"><b class="flow-label">輸入</b><ol>${inputs}</ol></div>` +
        `<div class="flow-arrow" aria-hidden="true"></div>` +
        `<div class="flow-stage flow-ai"><span class="flow-core">AI</span><small>${esc(f.aiNote || `一次產出 ${(f.outputs || []).length} 份`)}</small></div>` +
        `<div class="flow-arrow" aria-hidden="true"></div>` +
        `<ol class="flow-outs">${outputs}</ol>` +
        (rules ? `<div class="flow-rules"><b class="flow-label">設計重點</b><ul>${rules}</ul></div>` : '') +
        (impact ? `<div class="flow-impact"><b class="flow-label">成效</b><ul>${impact}</ul></div>` : '') +
        `</div>`;
    };

    // 心得：每則一張卡片（圖示、標題、內容、下一步）；也接受舊的純文字
    const reflect = (list) => {
      const cards = (list || []).map((x) => (typeof x === 'string' ? { text: x } : x)).filter((x) => x && (x.title || x.text));
      if (!cards.length) return '';
      return `<div class="role-reflect"><h4><span aria-hidden="true">💭</span>心得</h4><div class="reflect-grid">` +
        cards.map((x) => `<article class="reflect-card">` +
          `${x.title ? `<div class="reflect-head">${x.icon ? `<span class="reflect-icon" aria-hidden="true">${esc(x.icon)}</span>` : ''}<b>${esc(x.title)}</b></div>` : ''}` +
          `${x.text ? `<p>${esc(x.text)}</p>` : ''}` +
          `${x.next ? `<p class="reflect-next"><span>下一步</span>${esc(x.next)}</p>` : ''}</article>`).join('') +
        `</div></div>`;
    };

    // 「我負責的部分」：編號步驟＋一句重點
    const role = (o) => {
      const r = o.role;
      const steps = r ? (r.steps || []).filter((s) => s.title || s.text) : [];
      if (!steps.length) return '';
      return `<section class="role">${r.title ? `<h4 class="role-title">${esc(r.title)}</h4>` : ''}` +
        (r.insight ? `<p class="role-insight"><b>重點</b>${esc(r.insight)}</p>` : '') +
        `<ol class="role-steps">${steps.map((s, i) =>
          `<li${s.highlight ? ' class="is-key"' : ''}><span class="role-n">${String(i + 1).padStart(2, '0')}</span><div>${s.highlight ? '<span class="role-key">★ 營建業的重點</span>' : ''}<b>${esc(s.title)}</b>${s.text ? `<p>${esc(s.text)}</p>` : ''}${s.tip ? `<div class="role-tip"><span>評審建議</span><p>${esc(s.tip)}</p></div>` : ''}</div></li>`).join('')}</ol>` +
        reflect(r.reflection) +
        `</section>`;
    };

    const grid = $('#work-grid');
    grid.innerHTML = items.length
      ? items.map((o) => `<article class="work${o.view === 'slides' ? ' slides' : ''}${o.view === 'flow' ? ' is-flow' : ''}">` +
          pics(o) +
          `<div class="work-body">${o.title ? `<h3>${esc(o.title)}</h3>` : ''}${jobLine(o)}${o.description ? `<p>${esc(o.description)}</p>` : ''}${(o.view === 'slides' && /\.pdf$/i.test(o.url || '') ? `<a class="view" href="${esc(o.url)}" download="${esc(o.title)}.pdf">下載完整 PDF ↓</a>` : view(o, /\.pdf$/i.test(o.url || '') ? '查看完整報告 →' : '查看連結 →'))}${process(o)}</div>${role(o)}${flow(o)}</article>`).join('')
      : '<p class="work-empty">作品整理中，敬請期待。</p>';
    function goTo(box, to) {
      const all = JSON.parse(box.dataset.pics);
      const i = (to + all.length) % all.length;
      const zoom = box.querySelector('.work-zoom');
      box.dataset.i = i;
      zoom.dataset.src = all[i];
      zoom.querySelector('img').src = all[i];
      box.querySelector('.work-count').textContent = `${i + 1} / ${all.length}`;
      new Image().src = all[(i + 1) % all.length];
      const strip = box.nextElementSibling;
      if (strip && strip.classList.contains('slide-thumbs')) {
        strip.querySelectorAll('.slide-thumb').forEach((b, k) => b.classList.toggle('on', k === i));
        const on = strip.children[i];
        strip.scrollLeft = on.offsetLeft - strip.offsetLeft - (strip.clientWidth - on.offsetWidth) / 2;
      }
    }
    grid.addEventListener('click', (e) => {
      const n = e.target.closest('.work-nav');
      if (n) { const box = n.parentElement; goTo(box, +box.dataset.i + +n.dataset.d); return; }
      const t = e.target.closest('.slide-thumb');
      if (t) { goTo(t.parentElement.previousElementSibling, +t.dataset.i); return; }
      const z = e.target.closest('.work-zoom');
      if (!z) return;
      const box = z.closest('.work-pics');
      if (box) {
        // 主圖：放大後可以翻同一份作品的每一頁，關掉時卡片停在同一頁
        openLightbox(z.dataset.src, z.dataset.alt, z.dataset.wide, JSON.parse(box.dataset.pics), +box.dataset.i,
          (i) => { if (+box.dataset.i !== i) goTo(box, i); });
        return;
      }
      const steps = z.closest('.work-process');
      if (steps) {
        // 設計歷程：可以在各版本之間切換
        const list = [...steps.querySelectorAll('.work-zoom')].map((b) => b.dataset.src);
        openLightbox(z.dataset.src, '設計歷程', false, list, list.indexOf(z.dataset.src));
        return;
      }
      openLightbox(z.dataset.src, z.dataset.alt, z.dataset.wide);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const box = document.querySelector('.work.slides .work-pics');
      if (!box || document.querySelector('.lightbox.open')) return;
      goTo(box, +box.dataset.i + (e.key === 'ArrowRight' ? 1 : -1));
    });
  }

  /* ---------- Hobbies ---------- */
  if (page === 'hobbies') {
    $('#grid').innerHTML = S.hobbies.map((h) =>
      `<div class="hobby" style="--c:${h.color};--d:${h.darkColor}">` +
      `<div class="frame">${media(h.img, h.title, h.color, h.darkColor)}</div>` +
      `<h2>${esc(h.title)}</h2>${h.fact ? `<span class="fact">${esc(h.fact)}</span>` : ''}${h.description ? `<p>${esc(h.description)}</p>` : ''}</div>`
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
