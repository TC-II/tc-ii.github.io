---
layout: page
title: Herramientas
permalink: /repositorios/
---

{% assign R = site.data.recursos %}

<script>
  window.TC_RESOURCES = {
    featuredRepos: {{ R.featured_repos | jsonify }},
    apps: {{ R.apps | jsonify }}
  };
</script>

<style>
:root{
  --accent: #1690ff;
  --fg: #e9edf2;
  --muted: #9aa3ad;
  --stroke: rgba(255,255,255,.12);
  --stroke-2: rgba(255,255,255,.18);
  --card: rgba(255,255,255,.04);
  --radius-xl: 24px;
  --shadow-1: 0 8px 28px rgba(0,0,0,.30);
  --shadow-2: 0 16px 48px rgba(0,0,0,.35);
}

.rec-wrap{
  max-width: 100%;
  margin: 0 auto;
  color: var(--fg);
  font-family: ui-sans-serif,-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,Helvetica,Arial;
  padding-inline: clamp(8px, 3vw, 24px);
}

.section-title{ margin:.25rem 0 1rem; letter-spacing:.2px }
hr.soft{ border:0; border-top:1px solid var(--stroke); opacity:.6; margin:1.2rem 0 }

/* ===== Escenario ===== */
.repos-stage{
  --pad: 56px;
  --fade: 72px;
  position:relative;
  overflow-x:hidden;
  padding-inline: var(--pad);
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 var(--fade), #000 calc(100% - var(--fade)), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 var(--fade), #000 calc(100% - var(--fade)), transparent 100%);
}

/* MOBILE: sin difuminado ni padding lateral, tarjeta a ancho completo y sin scroll lateral */
@media (max-width:740px){
  .repos-stage{
    --pad: 0;
    -webkit-mask-image: none;
            mask-image: none;
  }
}

/* ===== Pista ===== */
.repos-strip{
  --gap: 24px;
  --card-w: 360px;
  display:grid; grid-auto-flow:column;
  grid-auto-columns: var(--card-w);
  gap: var(--gap);
  padding-block: 26px;
  overflow-x:auto; overflow-y:visible;
  scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;
  scrollbar-width:none;
  touch-action: pan-y; /* gesto vertical nativo */
  will-change: transform;
}
.repos-strip::-webkit-scrollbar{ height:0 }
.repos-strip.nosnap{ scroll-snap-type: none; }

/* MOBILE: sin scroll lateral; se mueve con transform */
@media (max-width:740px){
  .repos-strip{
    overflow-x: hidden !important;
    scroll-snap-type: none;
  }
}

/* ===== Flechas ===== */
.repos-nav{
  position:absolute; top:50%; transform:translateY(-50%);
  width:42px; height:42px; border-radius:999px;
  border:1px solid var(--stroke); background:rgba(255,255,255,.06);
  color:var(--fg); display:grid; place-items:center; cursor:pointer;
  z-index:5; transition:.15s ease background, .15s ease transform;
}
.repos-nav:hover{ background:rgba(255,255,255,.1) }
.repos-nav:active{ transform:translateY(-50%) scale(.98) }
.repos-nav.prev{ left:10px } .repos-nav.next{ right:10px }
.repos-nav svg{ display:block }
.repos-nav.next svg{ transform: rotate(180deg); }

/* ===== Tarjetas ===== */
.repo-card{
  position: relative; height: 520px;
  border-radius: var(--radius-xl); overflow: hidden;
  scroll-snap-align: center; perspective: 1000px;
  box-shadow: var(--shadow-1); border: 1px solid var(--stroke);
  background: #0f1115; --accent-card: var(--accent);
  transform: scale(.96);
  transition: transform .25s ease, box-shadow .25s ease;
  will-change: transform;
}
.repo-card:hover{ transform: scale(1.06); z-index: 4; box-shadow: var(--shadow-2); }

/* MOBILE: sin “achicar” */
@media (max-width:740px){
  .repo-card{ transform:none; }
  .repo-card:hover{ transform:none; box-shadow: var(--shadow-1); }
}

.repo-inner{
  position:absolute; inset:0; transform-style:preserve-3d;
  transition: transform .6s cubic-bezier(.2,.8,.2,1);
}
.repo-card.open .repo-inner{ transform: rotateY(180deg); }

/* Caras */
.repo-front, .repo-back{
  position:absolute; inset:0;
  border-radius: inherit; overflow: hidden;
  background:#0f1115;
  backface-visibility:hidden;
  -webkit-backface-visibility:hidden;
  transform: translateZ(0);
}
.repo-front{ display:flex; flex-direction:column; justify-content:flex-end; padding:18px; }
.repo-back{ transform: rotateY(180deg); }

.repo-front .cover{ position:absolute; inset:0; z-index:0; }
.repo-front .cover img{
  width:100%; height:100%; object-fit:cover; display:block; opacity:.9;
  filter:saturate(.95) contrast(1.02);
}
.repo-front .cover::after{
  content:""; position:absolute; inset:0;
  background: linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.45) 60%, rgba(0,0,0,.65));
}

/* info frente */
.repo-front .title{ z-index:1; margin:0 0 .2rem 0; font-size:1.35rem; font-weight:900; line-height:1.15; text-shadow:0 2px 10px rgba(0,0,0,.45) }
.repo-front .desc { z-index:1; margin:0 0 6px 0; font-size:1rem; opacity:.95; text-shadow:0 2px 8px rgba(0,0,0,.35) }
.repo-front .foot { display:flex; gap:8px; align-items:center; z-index:1; }
.repo-front .pill{
  display:inline-flex; align-items:center; gap:6px;
  padding:.36rem .58rem; font-size:.85rem; font-weight:700;
  background: rgba(255,255,255,.08); border:1px solid var(--stroke); border-radius:999px;
}

/* GitHub mini */
.repo-front .gh-btn{
  position:absolute; top:12px; right:12px; z-index:3;
  width:36px; height:36px; border-radius:999px;
  border:1px solid rgba(255,255,255,.25);
  background:rgba(0,0,0,.35); color:#fff; display:grid; place-items:center; text-decoration:none;
  transition: background .15s ease, box-shadow .15s ease, border-color .15s ease;
}
.repo-front .gh-btn:hover{
  background: color-mix(in srgb, var(--accent-card) 24%, black);
  border-color: color-mix(in srgb, var(--accent-card) 70%, transparent);
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--accent-card) 55%, transparent) inset,
    0 0 18px color-mix(in srgb, var(--accent-card) 28%, transparent);
}

/* Marco/acento */
.repo-card::after{
  content:""; position:absolute; inset:0; pointer-events:none;
  border-radius: inherit;
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--accent-card) 70%, transparent);
}

/* Dorso */
.repo-back{
  background: linear-gradient(180deg, rgba(26,28,34,.98), rgba(18,20,26,.98));
  border: 1px solid var(--stroke); padding:14px; display:flex; flex-direction:column;
}
.repo-back .back-head{ display:flex; gap:10px; align-items:center; justify-content:space-between; margin-bottom:6px }
.repo-back .back-title{ font-weight:800; font-size:1rem; margin:0 }
.repo-back .btn-link{ text-decoration:none; color:var(--fg); border:1px solid var(--stroke); border-radius:999px; padding:.34rem .6rem; background: rgba(255,255,255,.04) }
.repo-back .readme{
  flex:1 1 auto; min-height:0; overflow:auto;
  border:1px dashed var(--stroke); border-radius:12px; padding:10px; background: rgba(255,255,255,.03);
  scrollbar-width:thin; scrollbar-color: rgba(255,255,255,.25) rgba(255,255,255,.06);
}
.repo-back .readme::-webkit-scrollbar{ width:10px }
.repo-back .readme::-webkit-scrollbar-thumb{ background:rgba(255,255,255,.25); border-radius:999px }
.repo-back .readme::-webkit-scrollbar-track{ background:rgba(255,255,255,.06); border-radius:999px }

.markdown-body{ color: var(--fg); line-height:1.55; font-size:.95rem }
.markdown-body h1,.markdown-body h2{ padding-bottom:.3em; border-bottom:1px solid var(--stroke) }
.markdown-body h1{ font-size:1.35em } .markdown-body h2{ font-size:1.15em }
.markdown-body pre{ background:#0d1117; border:1px solid var(--stroke); border-radius:8px; padding:10px; overflow:auto }
.markdown-body code{ background:rgba(110,118,129,.12); border-radius:6px; padding:.15em .35em }
.markdown-body a{ color:#58a6ff; text-decoration:none } .markdown-body a:hover{ text-decoration:underline }

/* ===== Apps ===== */
.app{ border:1px solid var(--stroke); border-radius: 14px; background: rgba(255,255,255,.03); box-shadow: var(--shadow-1); overflow:hidden }
.app-head{ display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 16px }
.app-title{ margin:0; font-weight:800; font-size:1.12rem }
.app-actions{ display:flex; gap:8px; align-items:center }
.app-slot{ display:none } .app-slot.show{ display:block }
.app-embed{ padding: 0 16px 16px 16px; background: rgba(255,255,255,.02) }
.app-frame{ width:100%; height:680px; border:1px solid var(--stroke); border-radius: 10px }

.btn{ appearance:none; cursor:pointer; display:inline-flex; align-items:center; gap:8px;
  padding:.46rem .8rem; border-radius:999px; font-weight:700; color:var(--fg);
  background: rgba(255,255,255,.06); border:1px solid var(--stroke);
  transition: background .15s ease, border-color .15s ease, transform .08s ease; }
.btn:hover{ background: rgba(255,255,255,.1); border-color: var(--stroke-2) }
.btn:active{ transform: translateY(1px) }
.btn-ghost{ background: transparent; border:1px solid var(--stroke) }
.btn-ghost:hover{ background: rgba(255,255,255,.06); border-color: var(--stroke-2) }

.btn-round{ width:36px; height:36px; border-radius:999px; display:grid; place-items:center; color:var(--fg);
  background: rgba(255,255,255,.06); border:1px solid var(--stroke);
  transition: background .15s ease, border-color .15s ease, transform .08s ease; }
.btn-round:hover{ background: rgba(255,255,255,.1); border-color: var(--stroke-2) }
.btn-round:active{ transform: translateY(1px) }

/* Fallback si no hay cover */
.cover-fallback{
  position:absolute; inset:0; display:grid; place-items:center;
  font-weight:900; letter-spacing:.5px; font-size: 28px; color: rgba(255,255,255,.96);
  background: linear-gradient(135deg, rgba(126,144,255,.28), rgba(20,160,220,.25));
  text-shadow: 0 2px 10px rgba(0,0,0,.35);
}

/* Accesibilidad */
.repos-stage:focus{ outline: 2px solid var(--stroke-2); outline-offset: 4px; border-radius: 10px; }
</style>

<div class="rec-wrap">
  <h2 class="section-title">Repositorios</h2>

  <div class="repos-stage" id="reposStage" tabindex="0" aria-label="Carrusel de repositorios (flechas para navegar)">
    <button class="repos-nav prev" aria-label="Anterior">
      <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </button>

    <div id="reposStrip" class="repos-strip" aria-label="Repositorios TC2 (scroll horizontal)"></div>

    <button class="repos-nav next" aria-label="Siguiente">
      <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </button>
  </div>

  <hr class="soft">

  <h2 class="section-title">Aplicaciones</h2>
  <div id="appsList" class="stack"></div>
</div>

<script>
(async function(){
  const DATA = window.TC_RESOURCES || {};
  const FEATURED = (Array.isArray(DATA.featuredRepos)?DATA.featuredRepos:[]).map(it=> typeof it === 'string' ? {name: it} : (it||{}));
  const APPS = Array.isArray(DATA.apps) ? DATA.apps : [];
  const ORG = "TC-II";
  const IMG_ROOT = "{{ '/assets/img/repositorios' | relative_url }}";

  const byName = new Map(FEATURED.map(x=>[x.name, x]));
  const want = new Set(FEATURED.map(x=>x.name).filter(Boolean));
  const slug = s => String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");

  const cacheKeyRepos = "tdc2_repos_cache_v3";
  const readmeKey = (name)=>`tdc2_readme_html_${name}`;
  const titleKey  = (name)=>`tdc2_readme_title_${name}`;

  async function fetchReposOrg(){
    const cached = sessionStorage.getItem(cacheKeyRepos);
    if(cached) return JSON.parse(cached);
    const url = `https://api.github.com/orgs/${ORG}/repos?per_page=100&sort=updated`;
    const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' }});
    if(!r.ok){ throw new Error(r.status===403 ? "Límite de la API de GitHub alcanzado. Probá más tarde." : ("GitHub API " + r.status)); }
    const data = await r.json();
    sessionStorage.setItem(cacheKeyRepos, JSON.stringify(data));
    return data;
  }

  async function fetchReadmeHTML(repoName){
    const k = readmeKey(repoName);
    const c = sessionStorage.getItem(k);
    if(c) return c;
    const url = `https://api.github.com/repos/${ORG}/${repoName}/readme`;
    const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github.html+json' }});
    if(!r.ok) throw new Error("README API " + r.status);
    const html = await r.text();
    sessionStorage.setItem(k, html);
    return html;
  }

  async function fetchReadmeTitle(repoName){
    const tk = titleKey(repoName);
    const c = sessionStorage.getItem(tk);
    if(c!==null) return c;
    try{
      let html = sessionStorage.getItem(readmeKey(repoName));
      if(!html){
        const u = `https://api.github.com/repos/${ORG}/${repoName}/readme`;
        const r = await fetch(u, { headers: { 'Accept': 'application/vnd.github.html+json' }});
        if(!r.ok) throw new Error("README API " + r.status);
        html = await r.text(); sessionStorage.setItem(readmeKey(repoName), html);
      }
      const tmp = document.createElement('div'); tmp.innerHTML = html;
      const h1 = tmp.querySelector('h1');
      const t = (h1 && h1.textContent.trim()) ? h1.textContent.trim() : '';
      sessionStorage.setItem(tk, t);
      return t;
    }catch(_){
      sessionStorage.setItem(tk, ''); return '';
    }
  }

  function guessLocalImage(cfgName){
    const base = slug(cfgName);
    return [`${IMG_ROOT}/${base}.webp`, `${IMG_ROOT}/${base}.png`, `${IMG_ROOT}/${base}.jpg`];
  }

  /* ===== Montaje ===== */
  const stage = document.getElementById('reposStage');
  const strip = document.getElementById('reposStrip');

  const repos = (await fetchReposOrg()).filter(r=>want.has(r.name));

  const titleByRepo = Object.create(null);
  await Promise.all(repos.map(async r=>{
    const t = await fetchReadmeTitle(r.name);
    if(t) titleByRepo[r.name] = t;
  }));

  function octocatSVG(size=18){
    return `<svg viewBox="0 0 16 16" width="${size}" height="${size}" aria-hidden="true" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
      1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
      0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27
      1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
      0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8 16 3.58 12.42 0 8 0Z"></path></svg>`;
  }

  function createCard(repo){
    const cfg = Object.assign({ title: repo.name, desc: '', color: getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#1690ff', img: null }, byName.get(repo.name)||{});

    const card = document.createElement('article');
    card.className = 'repo-card';
    card.dataset.repo = repo.name;
    card.style.setProperty('--accent-card', cfg.color);

    const inner = document.createElement('div'); inner.className = 'repo-inner';

    // FRONT
    const front = document.createElement('div'); front.className = 'repo-front';
    const cover = document.createElement('div'); cover.className = 'cover';
    const img   = document.createElement('img'); img.loading='lazy';
    const fb    = document.createElement('div'); fb.className='cover-fallback'; fb.textContent=(repo.name||'R').slice(0,3).toUpperCase();
    cover.append(img, fb); front.append(cover);

    const title = document.createElement('h3'); title.className='title'; title.textContent = cfg.title || titleByRepo[repo.name] || repo.name;
    const desc  = document.createElement('p');  desc.className='desc';  desc.textContent  = cfg.desc || '';
    const foot  = document.createElement('div'); foot.className='foot';
    const lang  = document.createElement('span'); lang.className='pill'; lang.textContent  = repo.language || '—';
    const meta  = document.createElement('span'); meta.className='pill';
    const d = new Date(repo.pushed_at).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'2-digit'});
    meta.textContent = `${repo.stargazers_count}★ · ${d}`;
    foot.append(lang, meta);

    // GitHub mini
    const gh = document.createElement('a');
    gh.className='gh-btn'; gh.href=repo.html_url; gh.target='_blank'; gh.rel='noopener'; gh.innerHTML = octocatSVG(18);

    front.append(title, desc, foot, gh);

    // LOAD cover
    const sources = [];
    if (cfg.img) sources.push(cfg.img);
    sources.push(...guessLocalImage(cfg.name || repo.name));
    let i=0; const tryNext=()=>{ if(i<sources.length) img.src=sources[i++]; };
    img.addEventListener('load', ()=>fb.remove()); img.addEventListener('error', tryNext); tryNext();

    // BACK
    const back = document.createElement('div'); back.className='repo-back';
    const backHead = document.createElement('div'); backHead.className='back-head';
    const backTitle = document.createElement('h4'); backTitle.className='back-title'; backTitle.textContent = cfg.title || repo.name;
    const openBtn = document.createElement('a'); openBtn.className='btn-link'; openBtn.href=repo.html_url; openBtn.target='_blank'; openBtn.rel='noopener'; openBtn.textContent='Abrir en GitHub';
    backHead.append(backTitle, openBtn);

    const readme = document.createElement('div'); readme.className='readme';
    readme.innerHTML = `<div class="markdown-body"><p style="opacity:.8">Cargando README…</p></div>`;
    back.append(backHead, readme);

    inner.append(front, back); card.append(inner);
    return card;
  }

  repos.forEach(r => strip.appendChild(createCard(r)));

  /* ===== flip + README (ignora clicks si hay navegación/cierre en curso) ===== */
  const loadedReadme = new Set();
  let navLock = false;               // evita gestos mientras se cierra y se navega
  const FLIP_MS = 600;               // debe coincidir con CSS

  strip.addEventListener('click', async (ev)=>{
    if (navLock) return;
    if (ev.target.closest('.gh-btn')) return;
    const card = ev.target.closest('.repo-card'); if(!card) return;
    card.classList.toggle('open');
    const name = card.dataset.repo;
    if(card.classList.contains('open') && !loadedReadme.has(name)){
      try{
        const html = await fetchReadmeHTML(name);
        const target = card.querySelector('.readme');
        const box = document.createElement('div'); box.className='markdown-body'; box.innerHTML = html;
        target.innerHTML=''; target.appendChild(box);
        loadedReadme.add(name);
      }catch{
        card.querySelector('.readme').innerHTML = `<div class="markdown-body"><p>No se pudo cargar el README.</p></div>`;
      }
    }
  });

  /* ===== Layout ===== */
  function isMobile(){ return window.matchMedia('(max-width: 740px)').matches; }

  function computeLayout(){
    const gap  = parseFloat(getComputedStyle(strip).getPropertyValue('--gap')) || 24;
    const padL = parseFloat(getComputedStyle(stage).paddingLeft) || 0;
    const padR = parseFloat(getComputedStyle(stage).paddingRight) || 0;
    const inner = stage.clientWidth - padL - padR;

    const per   = isMobile() ? 1 : 3;
    const cardW = Math.max(isMobile()? 300 : 320, Math.floor(isMobile()? inner : (inner - gap*(per-1)) / per));

    strip.style.setProperty('--card-w', cardW + 'px');
    return { step: cardW + gap, gap, cardW, per };
  }

  let L = computeLayout();
  window.addEventListener('resize', ()=> { 
    L = computeLayout(); 
    setupMode(); 
  });

  /* ===== Desktop: loop infinito; Mobile: paginado por transform ===== */
  const btnPrev = document.querySelector('.repos-nav.prev');
  const btnNext = document.querySelector('.repos-nav.next');

  let loopState = null;      // desktop
  let idx = 0;               // mobile index

  function teardownDesktop(){
    if(!loopState) return;
    // quitar listeners de wheel/scroll agregados en desktop
    strip.replaceWith(strip.cloneNode(true)); // hard reset de listeners en strip
    // re-vinculamos referencia y reconstruimos contenido
    const newStrip = document.getElementById('reposStrip');
    newStrip.innerHTML = strip.innerHTML;
    strip = newStrip;
    // reenganchar click flip
    strip.addEventListener('click', flipHandler);
    loopState = null;
  }

  // guardo handler para poder re-enganchar tras teardown
  const flipHandler = strip.onclick;

  function setupDesktop(){
    // reconstruir handlers necesarios para desktop
    loopState = setupInfinite(strip);
  }

  function applyMobileTransform(){
    strip.style.transition = 'transform .35s ease';
    strip.style.transform = `translateX(${-idx * (L.cardW + L.gap)}px)`;
  }

  function setupMobile(){
    // sin scroll lateral; una tarjeta por “página”
    idx = Math.max(0, Math.min(idx, strip.children.length - 1));
    strip.style.transform = 'translateX(0)';
    strip.style.transition = 'none';
    requestAnimationFrame(applyMobileTransform);
  }

  function setupMode(){
    if(isMobile()){
      // quitar modo desktop si estaba
      if(loopState){ /* no re-creamos DOM, sólo dejamos de usar wheel */ }
      setupMobile();
    }else{
      setupDesktop();
    }
  }

  /* ===== Infinite desktop ===== */
  function setupInfinite(stripEl){
    const originals = Array.from(stripEl.children);
    const N = originals.length;
    if (!N) return { step: L.step, N: 0 };

    if (N < 4){
      const init = ()=>{
        stripEl.classList.add('nosnap');
        stripEl.scrollLeft = 0;
        requestAnimationFrame(()=> stripEl.classList.remove('nosnap'));
      };
      init();
      window.addEventListener('resize', init);

      let wheelAcc = 0;
      stripEl.addEventListener('wheel', (e)=>{
        if (navLock) { e.preventDefault(); return; }
        if(e.target.closest('.readme')) return;
        const vertical = Math.abs(e.deltaX) < Math.abs(e.deltaY);
        if(!vertical) return;
        e.preventDefault();
        wheelAcc += e.deltaY;
        const threshold = 40;
        if(Math.abs(wheelAcc) >= threshold){
          navigateBy(wheelAcc > 0 ? +1 : -1);
          wheelAcc = 0;
        }
      }, {passive:false});

      return { step: L.step, N: 0 };
    }

    // clones para loop
    const head = originals.map(n=>n.cloneNode(true));
    const tail = originals.map(n=>n.cloneNode(true));
    head.forEach(n=>stripEl.prepend(n));
    tail.forEach(n=>stripEl.append(n));

    const teleport = (to)=>{
      stripEl.classList.add('nosnap');
      stripEl.scrollLeft = to;
      requestAnimationFrame(()=> stripEl.classList.remove('nosnap'));
    };

    const setStart = ()=>{
      stripEl.classList.add('nosnap');
      stripEl.scrollLeft = L.step * N;
      requestAnimationFrame(()=> stripEl.classList.remove('nosnap'));
    };
    setStart();
    window.addEventListener('resize', setStart);

    stripEl.addEventListener('scroll', ()=>{
      const min = L.step * (N - 1);
      const max = L.step * (N + N + 1);
      if (stripEl.scrollLeft < min){
        teleport(stripEl.scrollLeft + L.step * N);
      } else if (stripEl.scrollLeft > max){
        teleport(stripEl.scrollLeft - L.step * N);
      }
    }, {passive:true});

    let wheelAcc = 0;
    stripEl.addEventListener('wheel', (e)=>{
      if (navLock) { e.preventDefault(); return; }
      if (e.target.closest('.readme')) return;
      const vertical = Math.abs(e.deltaX) < Math.abs(e.deltaY);
      if (!vertical) return;
      e.preventDefault();
      wheelAcc += e.deltaY;
      const threshold = 40;
      if (Math.abs(wheelAcc) >= threshold){
        navigateBy(wheelAcc > 0 ? +1 : -1);
        wheelAcc = 0;
      }
    }, {passive:false});

    return { step: L.step, N };
  }

  /* ===== Cerrar todas las tarjetas abiertas ===== */
  async function ensureFront(){
    const opened = strip.querySelectorAll('.repo-card.open');
    if (!opened.length) return;
    navLock = true;
    opened.forEach(card => card.classList.remove('open'));
    await new Promise(res=>{
      let done = false;
      const finish = ()=>{ if(done) return; done=true; res(); };
      opened[0].addEventListener('transitionend', finish, { once:true });
      setTimeout(finish, FLIP_MS + 50);
    });
  }

  /* ===== Navegar ===== */
  async function navigateBy(n){
    if (navLock) return;
    navLock = true;
    await ensureFront();

    if (isMobile()){
      // paginado por índice + transform
      const maxIdx = strip.children.length - 1;
      idx = Math.max(0, Math.min(idx + n, maxIdx));
      applyMobileTransform();
      setTimeout(()=>{ navLock = false; }, 380);
    }else{
      // desktop: scroll suave
      strip.scrollBy({ left: n * (L.step || 340), behavior:'smooth' });
      setTimeout(()=>{ navLock = false; }, 400);
    }
  }

  // Botones / teclado
  btnPrev.addEventListener('click', ()=> navigateBy(-1));
  btnNext.addEventListener('click', ()=> navigateBy(+1));
  stage.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft'){ e.preventDefault(); navigateBy(-1); }
    if(e.key === 'ArrowRight'){ e.preventDefault(); navigateBy(+1); }
  });

  // Inicializar modo
  function initFlipHandler(){ /* no-op, ya asignado arriba */ }
  setupMode();

  /* ===== Apps ===== */
  const appsList = document.getElementById('appsList');
  (APPS||[]).forEach(app=>{
    const card = document.createElement('article'); card.className='app';
    const head = document.createElement('div'); head.className='app-head';
    const title = document.createElement('h3'); title.className='app-title'; title.textContent = app.title || 'App';
    const actions = document.createElement('div'); actions.className='app-actions';

    const btn = document.createElement('button'); btn.className='btn-round'; btn.type='button';
    btn.setAttribute('aria-label','Ver aquí');
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>`;

    const link = document.createElement('a'); link.className='btn btn-ghost'; link.href=app.url; link.target='_blank'; link.rel='noopener'; link.textContent='Abrir en pestaña';

    actions.append(btn, link);
    head.append(title, actions);

    const slot = document.createElement('div'); slot.className='app-slot';
    const embed = document.createElement('div'); embed.className='app-embed';
    slot.append(embed);

    card.append(head, slot);

    let created=false, open=false;
    btn.addEventListener('click', ()=>{
      open=!open;
      btn.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
      if(open && !created && app.embed !== false){
        const h = app.height || 680;
        embed.innerHTML = `<iframe class="app-frame" style="height:${h}px" src="${app.url}?embed=true" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allow="clipboard-read; clipboard-write"></iframe>`;
        created=true;
      }
      slot.classList.toggle('show', open);
    });

    appsList.appendChild(card);
  });
})();
</script>
