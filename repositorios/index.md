---
layout: page
title: Herramientas
permalink: /repositorios/
extra_css:
  - /assets/css/repositorios.css
---

{% assign R = site.data.recursos %}

<script>
  window.TC_RESOURCES = {
    featuredRepos: {{ R.featured_repos | jsonify }},
    apps: {{ R.apps | jsonify }}
  };
</script>



<div class="rec-wrap">
  <h2 class="section-title">Repositorios</h2>

  <div class="repos-grid" id="reposGrid" aria-label="Repositorios TC2"></div>

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

  const slug = s => String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  const normalize = s => String(s||"").toLowerCase().replace(/[_\s]+/g,'-').replace(/-+/g,'-').replace(/[^a-z0-9-]/g,'');

  const byName = new Map(FEATURED.map(x=>[normalize(x.name), x]));
  const want = new Set([...byName.keys()]);

  const cacheKeyRepos = "tdc2_repos_cache_v4";
  const readmeKey = (name)=>`tdc2_readme_html_${name}`;

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

  async function fetchRepoMetadata(ownerRepo){
    const url = `https://api.github.com/repos/${ownerRepo}`;
    const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' }});
    if(!r.ok) throw new Error("Repo API " + r.status);
    return await r.json();
  }

  function guessLocalImage(cfgName){
    const base = slug(cfgName);
    return [`${IMG_ROOT}/${base}.webp`, `${IMG_ROOT}/${base}.png`, `${IMG_ROOT}/${base}.jpg`];
  }

  /* ===== Montaje ===== */
  const grid = document.getElementById('reposGrid');

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
    const cfg = Object.assign(
      { title: repo.name, desc: '', color: getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#1690ff', img: null },
      byName.get(normalize(repo.name)) || {}
    );

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

    const title = document.createElement('h3'); title.className='title'; title.textContent = cfg.title || repo.name;
    const desc  = document.createElement('p');  desc.className='desc';  desc.textContent  = cfg.desc || '';
    const foot  = document.createElement('div'); foot.className='foot';
    const lang  = document.createElement('span'); lang.className='pill'; lang.textContent  = repo.language || '—';
    const meta  = document.createElement('span'); meta.className='pill';
    if (repo.pushed_at) {
      const d = new Date(repo.pushed_at).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'2-digit'});
      meta.textContent = `${repo.stargazers_count}★ · ${d}`;
    } else {
      meta.textContent = 'Ver en GitHub';
    }
    foot.append(lang, meta);

    const gh = document.createElement('a');
    gh.className='gh-btn'; gh.href=cfg.url || repo.html_url; gh.target='_blank'; gh.rel='noopener'; gh.innerHTML = octocatSVG(18);

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
    const openBtn = document.createElement('a'); openBtn.className='btn-link'; openBtn.href=cfg.url || repo.html_url; openBtn.target='_blank'; openBtn.rel='noopener'; openBtn.textContent=cfg.button_text || 'Abrir en GitHub';
    backHead.append(backTitle, openBtn);

    const readme = document.createElement('div'); readme.className='readme';
    readme.innerHTML = `<div class="markdown-body"><p style="opacity:.8">Cargando README…</p></div>`;
    back.append(backHead, readme);

    inner.append(front, back); card.append(inner);
    return card;
  }

  let repos = [];
  try {
    const allRepos = await fetchReposOrg();

    const missing = FEATURED.map(x => x.name)
      .filter(n => !allRepos.some(r => normalize(r.name) === normalize(n)));
    if(missing.length) console.warn("Repos no encontrados (revisar nombres en featured_repos):", missing);

    // Build a map of all repos from GitHub API
    const allReposMap = new Map(allRepos.map(r => [normalize(r.name), r]));
    
    // Collect external/custom repos
    const externalRepos = new Map();
    const customRepos = [];
    
    for (const cfg of FEATURED) {
      if (cfg.url && !allReposMap.has(normalize(cfg.name))) {
        const match = cfg.url.match(/github\.com\/([^/]+)\/([^/]+)\/?$/);
        if (match) {
          customRepos.push({ cfg, ownerRepo: `${match[1]}/${match[2]}` });
        } else {
          externalRepos.set(normalize(cfg.name), {
            name: cfg.name,
            html_url: cfg.url,
            language: null,
            stargazers_count: 0,
            pushed_at: null,
            _external: true
          });
        }
      }
    }
    
    // Fetch metadata for custom GitHub repos
    for (const item of customRepos) {
      try {
        const meta = await fetchRepoMetadata(item.ownerRepo);
        externalRepos.set(normalize(item.cfg.name), {
          name: item.cfg.name,
          html_url: item.cfg.url,
          language: meta.language,
          stargazers_count: meta.stargazers_count || 0,
          pushed_at: meta.pushed_at,
          _external: true
        });
      } catch {
        externalRepos.set(normalize(item.cfg.name), {
          name: item.cfg.name,
          html_url: item.cfg.url,
          language: null,
          stargazers_count: 0,
          pushed_at: null,
          _external: true
        });
      }
    }
    
    // Build final repos array in FEATURED order
    repos = [];
    for (const feat of FEATURED) {
      const normalized = normalize(feat.name);
      const repo = allReposMap.get(normalized) || externalRepos.get(normalized);
      if (repo) repos.push(repo);
    }
  } catch(err) {
    console.warn("No se pudo consultar la API de GitHub (posible límite de tasa). Se muestran los repositorios sin datos en vivo.", err);
    repos = FEATURED.map(cfg => ({
      name: cfg.name,
      html_url: cfg.url || `https://github.com/${ORG}/${cfg.name}`,
      language: null,
      stargazers_count: 0,
      pushed_at: null,
      _external: true
    }));
  }

  repos.forEach(r => grid.appendChild(createCard(r)));

  /* ===== flip + README (click para abrir/cerrar) ===== */
  const loadedReadme = new Set();

  grid.addEventListener('click', async (ev)=>{
    if (ev.target.closest('.gh-btn')) return;
    const card = ev.target.closest('.repo-card'); if(!card) return;
    card.classList.toggle('open');
    const name = card.dataset.repo;
    if(card.classList.contains('open') && !loadedReadme.has(name)){
      const cfg = byName.get(normalize(name));
      if (cfg && cfg.readme) {
        const target = card.querySelector('.readme');
        const box = document.createElement('div'); box.className='markdown-body'; box.innerHTML = cfg.readme;
        target.innerHTML=''; target.appendChild(box);
        loadedReadme.add(name);
      } else {
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
    }
  });

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