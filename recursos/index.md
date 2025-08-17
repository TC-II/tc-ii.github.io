---
layout: page
title: Recursos
permalink: /recursos/
---

{% assign R = site.data.recursos %}

<script>
  // Datos inyectados desde _data/recursos.yml
  window.TC_RESOURCES = {
    featuredRepos: {{ R.featured_repos | jsonify }},
    pdfs: {{ R.pdfs | jsonify }},
    apps: {{ R.apps | jsonify }},
    links: {{ R.links | default: [] | jsonify }}
  };
</script>

<style>
/* ===== Layout base ===== */
.rec-wrap{max-width:var(--maxw,1040px);margin:0 auto}
.section-title{margin:.25rem 0 1rem}

/* ===== Cards repos ===== */
.repos-block{
  padding:16px;border:1px solid var(--border,#2a2a2e);border-radius:16px;
  background:var(--card,rgba(24,24,28,.6));box-shadow:var(--shadow,0 8px 24px rgba(0,0,0,.35))
}
.repos-head{display:flex;justify-content:space-between;gap:.75rem;align-items:center;margin:0 0 .9rem}
.repos-head .note{color:var(--muted,#9aa0a6);font-size:.95rem}
.repos-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
@media (max-width:800px){.repos-grid{grid-template-columns:1fr}}

.repo{
  display:flex;flex-direction:column;gap:.55rem;padding:16px;
  border:1px solid var(--border,#2a2a2e);border-radius:14px;background:var(--bg,#0b0b0c)
}
.repo h3{margin:0;font-size:1.06rem;line-height:1.25}
.repo h3 a{color:inherit;text-decoration:none}
.repo h3 a:hover{text-decoration:underline;text-underline-offset:2px}
.repo h3 a:visited{color:inherit}
.repo .desc{color:var(--muted,#9aa0a6);font-size:.95rem;min-height:2.2em}
.repo .meta{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;font-size:.9rem;color:var(--muted,#9aa0a6)}
.meta .dot{width:.6rem;height:.6rem;border-radius:50%;display:inline-block;margin-right:.35rem}
.meta .lang{display:inline-flex;align-items:center;gap:.35rem}
.meta .sep{opacity:.35}
.repo .actions{margin-top:.25rem}

/* ===== Controles ===== */
.controls{display:flex;flex-wrap:wrap;gap:.6rem;margin:.9rem 0 0}
.search{flex:1 1 280px;padding:.6rem .85rem;border:1px solid var(--border,#2a2a2e);border-radius:10px;background:var(--bg,#0b0b0c);color:var(--fg,#f2f2f3)}
.pills{display:flex;gap:.5rem;flex-wrap:wrap}
.pill{padding:.42rem .7rem;border:1px solid var(--border,#2a2a2e);border-radius:999px;background:transparent;font-size:.9rem;cursor:pointer}
.pill.active{border-color:var(--accent,#0a84ff)}

.btn,.btn-small{display:inline-block;padding:.58rem .95rem;border:1px solid var(--border,#2a2a2e);border-radius:12px;text-decoration:none;color:var(--fg,#f2f2f3);background:transparent}
.btn-small{padding:.42rem .7rem;border-radius:10px}

.loading{padding:14px;border:1px dashed var(--border,#2a2a2e);border-radius:12px;color:var(--muted,#9aa0a6);margin-top:.75rem}
.hidden{display:none!important}
hr.soft{border:0;border-top:1px solid var(--border,#2a2a2e);opacity:.7;margin:1.25rem 0}

/* ===== Recursos extra ===== */
.resources-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
@media (max-width:800px){.resources-grid{grid-template-columns:1fr}}
.resource{padding:16px;border:1px solid var(--border,#2a2a2e);border-radius:16px;background:var(--card,rgba(24,24,28,.6))}
.resource h3{margin:.2rem 0 .4rem}
.note{font-size:.92rem;color:var(--muted,#9aa0a6)}
.actions{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.4rem}
.embed-wrap{border:1px solid var(--border,#2a2a2e);border-radius:16px;overflow:hidden;background:var(--bg,#0b0b0c);margin-top:.4rem}
.frame{width:100%;height:680px;border:0}
</style>

<div class="rec-wrap">

  <!-- REPOSITORIOS -->
  <h2 class="section-title">Repositorios</h2>
  <div class="repos-block">
    <div class="repos-head">
      <div class="note">Principales de la cátedra. Podés desplegar el resto desde el botón.</div>
      <button id="toggleAll" class="btn" type="button">Ver todos los repositorios</button>
    </div>

    <!-- Principales -->
    <div id="featuredGrid" class="repos-grid" aria-live="polite"></div>

    <!-- Desplegable: todos -->
    <div id="allWrap" class="hidden">
      <div class="controls">
        <input id="repoSearch" class="search" type="search" placeholder="Buscar por nombre, descripción o lenguaje…">
        <div id="langFilters" class="pills" aria-label="Filtros por lenguaje"></div>
      </div>
      <div id="reposState" class="loading">Cargando repositorios…</div>
      <div id="reposGrid" class="repos-grid hidden"></div>
      <div id="reposEmpty" class="loading hidden">No hay resultados.</div>
    </div>
  </div>

  <hr class="soft">

  <!-- RECURSOS EXTRA -->
  <h2 class="section-title">Recursos extra</h2>
  <div id="pdfGrid" class="resources-grid"></div>
  <div id="appsGrid" class="resources-grid" style="margin-top:14px"></div>
</div>

<script>
(async function(){
  // ===== Datos del YAML =====
  const DATA = window.TC_RESOURCES || {};
  const FEATURED_RAW = Array.isArray(DATA.featuredRepos) ? DATA.featuredRepos : [];

  // --- normalizador robusto (slug) ---
  const slug = s => String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  const FEATURED_KEYS = FEATURED_RAW.map(slug).filter(Boolean);

  // ===== Helpers =====
  const qs = s=>document.querySelector(s);
  function driveDownloadUrl(viewUrl){
    try{ const m = viewUrl.match(/\/file\/d\/([^/]+)\//); if(m && m[1]) return `https://drive.google.com/uc?export=download&id=${m[1]}`;}
    catch(e){}
    return viewUrl;
  }
  function langColor(name){
    const map = {"Python":"#7da3c1","Jupyter Notebook":"#b5a4d8","JavaScript":"#c8a87a","TypeScript":"#8fb8c6","HTML":"#d6a3a3","CSS":"#a3c6a8","C":"#9aa9d6","C++":"#9aa9d6","Verilog":"#b7c79e","Shell":"#b4b4b4","MATLAB":"#c9b07a","TeX":"#b0b0d6"};
    return map[name] || "#bdbdbd";
  }
  function repoCard(r){
    const lang = r.language || "—";
    const updated = new Date(r.pushed_at).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"2-digit"});
    const demo = r.homepage && r.homepage.trim() ? `<a class="btn-small" href="${r.homepage}" target="_blank" rel="noopener">Demo</a>` : "";
    return `
      <article class="repo">
        <h3><a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a></h3>
        <div class="desc">${r.description||""}</div>
        <div class="meta">
          <span class="lang"><span class="dot" style="background:${langColor(lang)}"></span>${lang}</span>
          <span class="sep">·</span> ⭐ ${r.stargazers_count}
          <span class="sep">·</span> ⑂ ${r.forks_count}
          <span class="sep">·</span> Actualizado ${updated}
        </div>
        ${demo?`<div class="actions">${demo}</div>`:""}
      </article>`;
  }

  // ===== GitHub =====
  const ORG = "Teoria-de-Circuitos-II";
  const featuredGrid = qs('#featuredGrid'), allWrap = qs('#allWrap'), toggleBtn = qs('#toggleAll');
  const stateEl = qs('#reposState'), grid = qs('#reposGrid'), empty = qs('#reposEmpty');
  const search = qs('#repoSearch'), filters = qs('#langFilters');
  const cacheKey = "tdc2_repos_cache_v1";

  async function fetchRepos(){
    const cached = sessionStorage.getItem(cacheKey);
    if(cached) return JSON.parse(cached);
    const url = `https://api.github.com/orgs/${ORG}/repos?per_page=100&sort=updated`;
    const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' }});
    if(!r.ok) throw new Error("GitHub API " + r.status);
    const data = await r.json();
    const cleaned = data.filter(x=>!x.archived).sort((a,b)=>new Date(b.pushed_at)-new Date(a.pushed_at));
    sessionStorage.setItem(cacheKey, JSON.stringify(cleaned));
    return cleaned;
  }

  let repos=[], featured=[], others=[];
  try{
    repos = await fetchRepos();

    // construir destacados EN EL ORDEN DEL YAML usando slug-matching
    const used = new Set();
    FEATURED_KEYS.forEach(key=>{
      const found = repos.find(r=>{
        const sr = slug(r.name);
        return !used.has(r.name) && (sr === key || sr.includes(key));
      });
      if(found){ featured.push(found); used.add(found.name); }
    });

    // si por lo que sea quedaron menos (typo en YAML), igual seguimos
    others = repos.filter(r=>!used.has(r.name));

    // pintar
    featuredGrid.innerHTML = featured.map(repoCard).join("");
    const langs = Array.from(new Set(others.map(r=>r.language).filter(Boolean))).sort();
    filters.innerHTML = `<button class="pill active" data-lang="">Todos</button>` + langs.map(L=>`<button class="pill" data-lang="${L}">${L}</button>`).join("");
    grid.innerHTML = others.map(repoCard).join("");
    grid.classList.remove('hidden');
    stateEl.classList.add('hidden');
    toggleBtn.textContent = `Ver todos los repositorios (${others.length})`;
  }catch(e){
    stateEl.classList.remove('hidden');
    stateEl.textContent = "No se pudieron cargar los repos. Abrir organización: ";
    const a = document.createElement('a'); a.className='btn-small'; a.href=`https://github.com/${ORG}`; a.target='_blank'; a.rel='noopener'; a.textContent='GitHub/Teoria-de-Circuitos-II';
    stateEl.appendChild(a);
  }

  // Toggle “todos”
  let open=false;
  toggleBtn.addEventListener('click', ()=>{
    open=!open;
    allWrap.classList.toggle('hidden', !open);
    toggleBtn.textContent = open ? "Ocultar repositorios" : `Ver todos los repositorios (${others.length})`;
  });

  // Búsqueda / filtros
  function applyFilters(){
    const q = (search.value||"").toLowerCase().trim();
    const active = filters.querySelector('.pill.active'); const langSel = active ? active.dataset.lang : "";
    const list = others.filter(r=>{
      const t = (r.name+" "+(r.description||"")+" "+(r.language||"")).toLowerCase();
      return (!langSel || r.language===langSel) && t.includes(q);
    });
    grid.innerHTML = list.map(repoCard).join("");
    grid.classList.toggle('hidden', list.length===0);
    empty.classList.toggle('hidden', list.length!==0);
  }
  search && search.addEventListener('input', applyFilters);
  filters && filters.addEventListener('click', e=>{
    if(e.target.classList.contains('pill')){
      filters.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
      e.target.classList.add('active');
      applyFilters();
    }
  });

  // ===== PDFs =====
  const pdfGrid = qs('#pdfGrid');
  (Array.isArray(DATA.pdfs)?DATA.pdfs:[]).forEach(p=>{
    const card = document.createElement('article'); card.className='resource';
    card.innerHTML = `
      <h3>${p.title}</h3>
      ${p.desc?`<p class="note">${p.desc}</p>`:""}
      <div class="actions">
        <a class="btn" href="${p.url}" target="_blank" rel="noopener">Abrir en otra pestaña</a>
        <a class="btn" href="${driveDownloadUrl(p.url)}">Descargar</a>
      </div>`;
    pdfGrid.appendChild(card);
  });

  // ===== Apps =====
  const appsGrid = qs('#appsGrid');
  (Array.isArray(DATA.apps)?DATA.apps:[]).forEach(a=>{
    const h = a.height || 680;
    const card = document.createElement('article'); card.className='resource'; card.style.gridColumn="1/-1";
    card.innerHTML = `
      <h3>${a.title}</h3>
      <div class="actions">
        <a class="btn-small" href="${a.url}" target="_blank" rel="noopener">Abrir en otra pestaña</a>
        ${a.embed?`<button class="btn-small">Recargar</button>`:""}
      </div>
      ${a.embed?`<div class="embed-wrap"><iframe class="frame" style="height:${h}px" src="${a.url}?embed=true" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allow="clipboard-read; clipboard-write"></iframe></div>`:""}`;
    if(a.embed){
      const btn = card.querySelector('button.btn-small');
      btn.addEventListener('click', ()=>{
        const fr = card.querySelector('iframe');
        try{ fr.contentWindow.location.reload(); }catch{ fr.src = fr.src; }
      });
    }
    appsGrid.appendChild(card);
  });
})();
</script>
