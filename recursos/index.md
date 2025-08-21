---
layout: page
title: Recursos
permalink: /recursos/
---

{% assign R = site.data.recursos %}

<script>
  // Datos que vienen del YAML (_data/recursos.yml)
  window.TC_RESOURCES = {
    featuredRepos: {{ R.featured_repos | jsonify }},
    apps: {{ R.apps | jsonify }}
  };
</script>

<style>
/* ====== Tokens y tema (alineado al resto del sitio) ====== */
:root{
  --accent: #1e8bff;               /* azul pill que se ve en tus capturas */
  --accent-2: #4cc3ff;
  --fg: #eef3f8;
  --muted: #aeb4be;
  --panel: rgba(22,24,28,.72);
  --panel-2: rgba(36,38,44,.72);
  --stroke: rgba(255,255,255,.12);
  --stroke-2: rgba(255,255,255,.16);

  --radius-xl: 20px;
  --radius-lg: 14px;
  --radius-md: 10px;

  --shadow-1: 0 10px 30px rgba(0,0,0,.26);
  --shadow-2: 0 14px 40px rgba(0,0,0,.32);
}
@supports (backdrop-filter: blur(6px)) {
  .glass{ backdrop-filter: saturate(160%) blur(18px); -webkit-backdrop-filter: saturate(160%) blur(18px); }
}

/* ====== Layout base ====== */
.rec-wrap{
  max-width: 1000px; margin: 0 auto;
  color: var(--fg);
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial;
}
.section-title{ margin:.25rem 0 1rem; letter-spacing:.2px }

/* ====== Contenedores ====== */
.block{
  border:1px solid var(--stroke); border-radius: var(--radius-xl);
  background: linear-gradient(180deg, var(--panel), var(--panel-2));
  box-shadow: var(--shadow-1); padding: 18px;
}
.stack{ display:flex; flex-direction:column; gap:14px }
hr.soft{ border:0; border-top:1px solid var(--stroke); opacity:.7; margin:1.25rem 0 }

/* ====== Tarjetas de Repo ====== */
.repo{
  position:relative;
  border:1px solid var(--stroke);
  border-radius: var(--radius-lg);
  overflow:hidden;
  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.03));
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
}
.repo::before{
  content:""; position:absolute; inset:0 0 0 auto; width:4px; background: linear-gradient(180deg, var(--accent), var(--accent-2));
}
.repo:hover{ transform: translateY(-2px); box-shadow: var(--shadow-2); border-color: var(--stroke-2) }

/* Header */
.repo-head{
  display:flex; align-items:center; justify-content:space-between; gap:12px;
  padding: 14px 16px;
}
.repo-title{
  margin:0; font-size:1.05rem; font-weight:700; letter-spacing:.2px;
}
.repo-title a{ color:inherit; text-decoration:none }
.repo-title a:hover{ text-decoration:underline; text-underline-offset: 3px }

/* Badges */
.badges{ display:flex; align-items:center; gap:8px; flex-wrap:wrap }
.badge{
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 10px; border:1px solid var(--stroke); border-radius:999px;
  background: rgba(255,255,255,.05); color: var(--fg); font-size:.85rem; font-weight:600;
}
.badge .dot{ width:.58rem; height:.58rem; border-radius:999px; display:inline-block }
.badge .ico{ width:14px; height:14px; display:inline-block; opacity:.9 }
.badge.muted{ color:var(--muted) }

/* Acciones */
.repo-actions{
  padding: 0 16px 14px 16px; display:flex; gap:10px; flex-wrap:wrap;
}
.btn, .btn-ghost{
  appearance:none; cursor:pointer; border-radius:999px; font-weight:700; text-decoration:none;
  transition: transform .12s ease, background .12s ease, border-color .12s ease, box-shadow .12s ease;
}
.btn{
  background: linear-gradient(180deg, var(--accent), #0f6fe2);
  color:white; border:1px solid rgba(255,255,255,.18);
  padding:.56rem .96rem; box-shadow: 0 6px 18px rgba(30,139,255,.32);
}
.btn:hover{ transform: translateY(-1px); box-shadow: 0 10px 26px rgba(30,139,255,.36) }
.btn:active{ transform: translateY(0) }
.btn .chev{ margin-left:6px; transition: transform .18s }
.btn.open .chev{ transform: rotate(180deg) }

.btn-ghost{
  padding:.5rem .85rem; border:1px solid var(--stroke); background: rgba(255,255,255,.05); color: var(--fg)
}
.btn-ghost:hover{ background: rgba(255,255,255,.07); border-color: var(--stroke-2) }

/* README (collapsible con animación) */
.readme-wrap{ padding: 0 16px 14px 16px }
.readme{
  border:1px solid var(--stroke); border-radius: var(--radius-md);
  background: rgba(255,255,255,.04);
  overflow:hidden; max-height:0; opacity:0; transform: translateY(-4px);
  transition: max-height .28s ease, opacity .28s ease, transform .28s ease;
  will-change: max-height, opacity, transform;
}
.readme.show{ max-height: 1200px; opacity:1; transform: translateY(0) }
.readme .inner{ padding: 12px; }

/* ====== Apps (plegables) ====== */
.app{
  border:1px solid var(--stroke); border-radius: var(--radius-lg);
  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.03));
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.app:hover{ transform: translateY(-2px); box-shadow: var(--shadow-2); border-color: var(--stroke-2) }
.app-head{ display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px }
.app-title{ margin:0; font-weight:700; letter-spacing:.2px }
.app-actions{ display:flex; gap:10px; flex-wrap:wrap }
.app-embed{ padding:0 16px 16px 16px }
.app-frame{ width:100%; height:680px; border:0; border-radius: var(--radius-md); border:1px solid var(--stroke) }
.app-slot{ overflow:hidden; max-height:0; opacity:0; transform: translateY(-4px); transition:max-height .28s ease, opacity .28s ease, transform .28s ease }
.app-slot.show{ max-height:1200px; opacity:1; transform:translateY(0) }

/* ====== util ====== */
.loading{
  padding:12px; border:1px dashed var(--stroke); border-radius: var(--radius-md);
  color: var(--muted); background: rgba(255,255,255,.05); margin: 10px 16px;
}
.hidden{ display:none !important }
</style>

<div class="rec-wrap">

  <!-- REPOS -->
  <h2 class="section-title">Repositorios</h2>
  <div class="block glass">
    <div id="reposList" class="stack"></div>
  </div>

  <hr class="soft">

  <!-- APPS -->
  <h2 class="section-title">Aplicaciones</h2>
  <div class="block glass">
    <div id="appsList" class="stack"></div>
  </div>
</div>

<script>
(async function(){
  const DATA = window.TC_RESOURCES || {};
  const FEATURED_RAW = Array.isArray(DATA.featuredRepos) ? DATA.featuredRepos : [];
  const APPS = Array.isArray(DATA.apps) ? DATA.apps : [];
  const ORG = "Teoria-de-Circuitos-II";

  // normalizador robusto
  const slug = s => String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  const FEATURED_KEYS = FEATURED_RAW.map(slug).filter(Boolean);

  // cache
  const cacheKeyRepos = "tdc2_repos_cache_v2";
  const readmeKey = (name)=>`tdc2_readme_html_${name}`;

  async function fetchReposOrg(){
    const cached = sessionStorage.getItem(cacheKeyRepos);
    if(cached) return JSON.parse(cached);
    const url = `https://api.github.com/orgs/${ORG}/repos?per_page=100&sort=updated`;
    const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' }});
    if(!r.ok){
      const msg = r.status === 403 ? "Límite de la API de GitHub alcanzado. Probá recargar más tarde." : ("GitHub API " + r.status);
      throw new Error(msg);
    }
    const data = await r.json();
    sessionStorage.setItem(cacheKeyRepos, JSON.stringify(data));
    return data;
  }

  async function fetchReadmeHTML(repoName){
    const key = readmeKey(repoName);
    const cached = sessionStorage.getItem(key);
    if(cached) return cached;
    const url = `https://api.github.com/repos/${ORG}/${repoName}/readme`;
    const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github.html+json' }});
    if(!r.ok) throw new Error("README API " + r.status);
    const html = await r.text();
    sessionStorage.setItem(key, html);
    return html;
  }

  function langColor(name){
    const map = {"Python":"#7da3c1","Jupyter Notebook":"#b5a4d8","JavaScript":"#c8a87a","TypeScript":"#8fb8c6","HTML":"#d6a3a3","CSS":"#a3c6a8","C":"#9aa9d6","C++":"#9aa9d6","Verilog":"#b7c79e","Shell":"#b4b4b4","MATLAB":"#c9b07a","TeX":"#b0b0d6"};
    return map[name] || "#bdbdbd";
  }

  // ===== REPOS =====
  const reposList = document.getElementById('reposList');

  try{
    const all = await fetchReposOrg();

    const picked = [];
    const used = new Set();
    FEATURED_KEYS.forEach(key=>{
      const found = all.find(r=>!used.has(r.name) && (slug(r.name)===key || slug(r.name).includes(key)));
      if(found){ picked.push(found); used.add(found.name); }
    });

    if(picked.length===0){
      const warn=document.createElement('div'); warn.className='loading';
      warn.textContent='No se encontraron repos en la lista de recursos. Revisá _data/recursos.yml -> featured_repos.';
      reposList.appendChild(warn);
    }

    picked.forEach(repo=>{
      const card = document.createElement('article'); card.className='repo';

      // header
      const head = document.createElement('div'); head.className='repo-head';

      const title = document.createElement('h3'); title.className='repo-title';
      title.innerHTML = `<a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>`;

      const badges = document.createElement('div'); badges.className='badges';
      const lang = repo.language || "—";
      const langDot = `<span class="dot" style="background:${langColor(lang)}"></span>`;
      const updated = new Date(repo.pushed_at).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"2-digit"});

      badges.innerHTML = `
        <span class="badge">${langDot}${lang}</span>
        <span class="badge"><svg class="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${repo.stargazers_count}</span>
        <span class="badge"><svg class="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M14 7h-4v10H6l6 4 6-4h-4zM8 5h8l-4-3z"/></svg>${repo.forks_count}</span>
        <span class="badge muted"><svg class="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8v5l4 2 .8-1.86-3.3-1.64V8z"/><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2z"/></svg>${updated}</span>
      `;

      head.appendChild(title);
      head.appendChild(badges);
      card.appendChild(head);

      // acciones + readme
      const actions = document.createElement('div'); actions.className='repo-actions';
      const btn = document.createElement('button'); btn.className='btn'; btn.type='button';
      btn.innerHTML = `Ver README <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>`;
      const link = document.createElement('a'); link.className='btn-ghost'; link.target='_blank'; link.rel='noopener'; link.href=repo.html_url; link.textContent='Abrir repo';
      actions.appendChild(btn); actions.appendChild(link);
      card.appendChild(actions);

      const wrap = document.createElement('div'); wrap.className='readme-wrap';
      const readme = document.createElement('div'); readme.className='readme';
      readme.innerHTML = `<div class="inner"><div class="loading">Cargando README…</div></div>`;
      wrap.appendChild(readme);
      card.appendChild(wrap);

      let loaded=false, open=false;
      btn.addEventListener('click', async ()=>{
        open = !open;
        btn.classList.toggle('open', open);
        if(open && !loaded){
          try{
            const html = await fetchReadmeHTML(repo.name);
            const tmp = document.createElement('div'); tmp.innerHTML = html;
            const h1 = tmp.querySelector('h1');
            if(h1 && h1.textContent.trim()){
              title.innerHTML = `<a href="${repo.html_url}" target="_blank" rel="noopener">${h1.textContent.trim()}</a>`;
            }
            readme.innerHTML = `<div class="inner"></div>`;
            readme.firstChild.appendChild(tmp);
            loaded=true;
          }catch(err){
            readme.innerHTML = `<div class="inner"><div class="loading">No se pudo cargar el README (puede que no exista o hay límite de API).</div></div>`;
          }
        }
        // animación
        if(open){ readme.classList.add('show'); }
        else{ readme.classList.remove('show'); }
      });

      reposList.appendChild(card);
    });

  }catch(e){
    const err = document.createElement('div');
    err.className = 'loading';
    err.textContent = e.message || 'No se pudieron cargar los repositorios.';
    reposList.appendChild(err);
  }

  // ===== APPS =====
  const appsList = document.getElementById('appsList');
  (APPS || []).forEach(app=>{
    const card = document.createElement('article'); card.className='app';

    const head = document.createElement('div'); head.className='app-head';
    const title = document.createElement('h3'); title.className='app-title'; title.textContent = app.title;
    const actions = document.createElement('div'); actions.className='app-actions';
    const btn = document.createElement('button'); btn.className='btn'; btn.type='button';
    btn.innerHTML = `Mostrar aplicación <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>`;
    const link = document.createElement('a'); link.className='btn-ghost'; link.href=app.url; link.target='_blank'; link.rel='noopener'; link.textContent='Abrir en pestaña';
    actions.appendChild(btn); actions.appendChild(link);
    head.appendChild(title); head.appendChild(actions);
    card.appendChild(head);

    const slot = document.createElement('div'); slot.className='app-slot';
    const embed = document.createElement('div'); embed.className='app-embed';
    slot.appendChild(embed);
    card.appendChild(slot);

    let created=false, open=false;
    btn.addEventListener('click', ()=>{
      open=!open;
      btn.classList.toggle('open', open);
      if(open && !created && app.embed !== false){
        const h = app.height || 680;
        embed.innerHTML = `<iframe class="app-frame" style="height:${h}px" src="${app.url}?embed=true" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allow="clipboard-read; clipboard-write"></iframe>`;
        created=true;
      }
      slot.classList.toggle('show', open);
      btn.firstElementChild && (btn.firstElementChild.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)');
    });

    appsList.appendChild(card);
  });
})();
</script>
